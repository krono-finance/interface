"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

import Image from "next/image";

import BigNumber from "bignumber.js";
import { Address, erc20Abi } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWalletClient,
  useWriteContract,
} from "wagmi";

import Button from "@/components/Button/Button";
import NumberInput from "@/components/Input/NumberInput";
import SwitchCustom from "@/components/Switch/SwitchCustom";
import { LENDING_POOL_CONTRACT_ADDRESS } from "@/constant/contractAddresses";
import useNumberInput from "@/hooks/useNumberInput";
import {
  borrowService,
  supplyService,
} from "@/lib/services/lendingPoolService";
import { useRootStore } from "@/store/root";

const SupplyBorrowPanel = () => {
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const token = useRootStore((state) => state.tokenData);

  const { data: ethBalance } = useBalance({
    address,
  });

  const { data: tokenBalance } = useBalance({
    address,
    token: token.address as `0x${string}`,
  });

  const selectedBalance = token.symbol === "ETH" ? ethBalance : tokenBalance;
  const balance = BigNumber(selectedBalance?.value || "0")
    .div(10 ** token.decimals)
    .toFormat()
    .toString();

  const [selectedAction, setSelectedAction] = useState<"Supply" | "Borrow">(
    "Supply",
  );
  const [ethWeth, setEthWeth] = useState(false);
  const [isTransacting, setIsTransacting] = useState(false);

  const { data: allowance } = useReadContract({
    abi: erc20Abi,
    address: token.address as Address,
    functionName: "allowance",
    args: [address!, LENDING_POOL_CONTRACT_ADDRESS],
  });

  const { displayValue, value, handleInputBlur, handleInputChange } =
    useNumberInput();

  const handleSupply = async () => {
    if (!walletClient || !address) return;

    try {
      setIsTransacting(true);

      const currentAllowance = allowance ?? BigInt(0);
      const inputAmount = BigInt(
        BigNumber(value)
          .times(10 ** token.decimals)
          .toFixed(0),
      );
      const asset = token.address as Address;

      // APPROVE THE CONTRACT TO SPEND TOKEN
      if (currentAllowance < inputAmount) {
        const approvingToast = toast.loading("Approving token...");

        try {
          const approveTx = await writeContractAsync({
            abi: erc20Abi,
            address: asset,
            functionName: "approve",
            args: [LENDING_POOL_CONTRACT_ADDRESS, inputAmount],
          });

          await waitForTransactionReceipt(walletClient, {
            hash: approveTx,
          });

          toast.success("Approval successful!");
        } catch (error) {
          toast.error("Approval failed or canceled.");
          throw error;
        } finally {
          toast.dismiss(approvingToast);
        }
      }

      // SUPPLY
      const supplyToast = toast.loading(`Supplying ${token.symbol}`);

      try {
        const tx = await supplyService(
          asset,
          inputAmount,
          address,
          walletClient,
          address,
        );

        await waitForTransactionReceipt(walletClient, {
          hash: tx as `0x${string}`,
        });

        toast.success("Supply successful!");
        handleInputChange("0");
        console.log(tx);
      } catch (error) {
        toast.error("Supply failed!");
        throw error;
      } finally {
        setIsTransacting(false);
        toast.dismiss(supplyToast);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsTransacting(false);
    }
  };

  const handleBorrow = async () => {
    if (!walletClient || !address) return;

    try {
      setIsTransacting(true);
      const inputAmount = BigInt(
        BigNumber(value)
          .times(10 ** token.decimals)
          .toFixed(0),
      );
      const asset = token.address as Address;

      // Borrow
      const borrowToast = toast.loading(`Borrowing ${token.symbol}`);

      try {
        const tx = await borrowService(
          asset,
          inputAmount,
          address,
          walletClient,
          address,
        );

        await waitForTransactionReceipt(walletClient, {
          hash: tx as `0x${string}`,
        });

        toast.success("Borrow successful!");
        handleInputChange("0");
        console.log(tx);
      } catch (error) {
        toast.error("Borrow failed!");
        throw error;
      } finally {
        setIsTransacting(false);
        toast.dismiss(borrowToast);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsTransacting(false);
    }
  };

  return (
    <div className="bg-surface border-elevated h-fit space-y-4 rounded-lg border p-4 pt-4 sm:min-w-[470px] sm:space-y-5 sm:p-6">
      <div className="bg-background flex w-full gap-1.5 rounded-full p-1.5">
        <Button
          variant={selectedAction === "Supply" ? "secondary" : "ghost"}
          className="hover:!bg-elevated w-full !py-1.5"
          onClick={() => setSelectedAction("Supply")}
        >
          Supply
        </Button>
        <Button
          variant={selectedAction === "Borrow" ? "secondary" : "ghost"}
          className="hover:!bg-elevated w-full !py-1.5"
          onClick={() => setSelectedAction("Borrow")}
        >
          Borrow
        </Button>
      </div>

      <div className="space-y-3">
        <p className="text-tertiary text-sm font-medium">
          {selectedAction} Amount
        </p>

        <div className="border-elevated bg-background rounded-xl border pt-0.5">
          <NumberInput
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            value={displayValue}
            suffix={
              <div className="flex items-center gap-1.5">
                <Image
                  src={token.image}
                  alt={token.name}
                  width={32}
                  height={32}
                />
                <span className="text-primary text-lg font-semibold">
                  {token.symbol}
                </span>
              </div>
            }
            placeholder="0.00"
            className="!border-0 !pb-0 sm:!pb-0.5"
            inputClassName="font-medium xl:text-xl sm:max-w-[240px]"
          />
          <div className="text-tertiary flex justify-between gap-3 p-3 text-sm font-medium sm:p-4">
            <span>$0</span>
            <span>
              {selectedAction === "Supply" ? (
                <>Wallet balance: {balance}</>
              ) : (
                <>Available: 0</>
              )}
            </span>
          </div>
        </div>

        {token.symbol === "WETH" && (
          <div className="flex items-center gap-3">
            <SwitchCustom
              checked={ethWeth}
              onChange={() => setEthWeth(!ethWeth)}
            />
            <span className="text-sm">
              Supply in {ethWeth ? "ETH" : "WETH"}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <p className="text-tertiary text-sm font-medium">
          Transaction Overview
        </p>
        <div className="border-elevated space-y-3 rounded-xl border p-4">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-tertiary">{selectedAction} APY</span>
            <span>4.50%</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-tertiary">Health factor</span>
            <span className="text-warning">2.5</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-tertiary">Estimated gas fee</span>
            <span>0.00001 ETH</span>
          </div>
        </div>
      </div>

      <Button
        className="w-full !py-3 !text-base"
        disabled={value <= 0 || isTransacting}
        onClick={selectedAction === "Supply" ? handleSupply : handleBorrow}
      >
        {value > 0 ? (
          <>
            {selectedAction} {token.symbol}
          </>
        ) : (
          "Enter an amount"
        )}
      </Button>
    </div>
  );
};

export default SupplyBorrowPanel;
