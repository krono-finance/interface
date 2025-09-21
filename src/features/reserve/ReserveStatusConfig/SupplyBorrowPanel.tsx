"use client";
import React, { useMemo, useState } from "react";
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
import CustomConnectButton from "@/components/Web3Provider/CustomConnectButton";
import { LENDING_POOL_CONTRACT_ADDRESS } from "@/constant/contractAddresses";
import useNumberInput from "@/hooks/useNumberInput";
import useReserveMetrics from "@/hooks/useReserveMetrics";
import useUserData from "@/hooks/useUserData";
import {
  borrowService,
  supplyEthService,
  supplyService,
} from "@/lib/services/lendingPoolService";
import { formatTokenValue } from "@/lib/utils";
import { useRootStore } from "@/store/root";

const SupplyBorrowPanel = () => {
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const metrics = useReserveMetrics();

  const { data: userData } = useUserData(address);

  const token = useRootStore((state) => state.tokenData);
  const tokensPrice = useRootStore((state) => state.tokensPrice);

  const tokenPrice = useMemo(() => {
    const price = tokensPrice.find(
      (item) => item.symbol.toLowerCase() === token.symbol.toLowerCase(),
    );
    return price?.price || 0;
  }, [tokensPrice, token.symbol]);

  const { data: ethBalance } = useBalance({
    address,
  });

  const { data: tokenBalance } = useBalance({
    address,
    token: token.address as `0x${string}`,
  });

  const selectedBalance = token.symbol === "ETH" ? ethBalance : tokenBalance;

  const balance = useMemo(
    () =>
      BigNumber(selectedBalance?.value || "0")
        .div(10 ** token.decimals)
        .toString(),
    [selectedBalance?.value, token.decimals],
  );

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
    useNumberInput(0, Number(balance));

  const totalTokenUSDValue = BigNumber(tokenPrice).times(value);

  const futureHealthFactor = useMemo(() => {
    if (!userData || !tokenPrice || !value) return null;

    const totalCollateral = new BigNumber(
      userData.userAccountData.totalCollateralETH.toString(),
    ).div(1e18);
    const totalDebt = new BigNumber(
      userData.userAccountData.totalDebtETH.toString(),
    ).div(1e18);
    const liquidationThreshold = new BigNumber(
      userData.userAccountData.currentLiquidationThreshold.toString(),
    ).div(1e4);

    const ethPriceUSD =
      tokensPrice.find((item) => item.symbol.toLowerCase() === "eth")?.price ||
      0;

    const valueInETH = ethPriceUSD
      ? new BigNumber(value).times(tokenPrice).div(ethPriceUSD)
      : new BigNumber(0);

    const newCollateral =
      selectedAction === "Supply"
        ? totalCollateral.plus(valueInETH)
        : totalCollateral;
    const newDebt =
      selectedAction === "Borrow" ? totalDebt.plus(valueInETH) : totalDebt;

    if (newDebt.isZero()) return BigNumber(Infinity);

    return newCollateral.times(liquidationThreshold).div(newDebt);
  }, [userData, value, selectedAction, tokenPrice]);

  const healthFactorClass = useMemo(() => {
    if (!futureHealthFactor) return "text-tertiary";
    if (!futureHealthFactor.isFinite()) return "text-success";
    if (futureHealthFactor.gt(1.5)) return "text-success";
    if (futureHealthFactor.gt(1.0)) return "text-warning";
    return "text-error";
  }, [futureHealthFactor]);

  const currentHealthFactor = useMemo(() => {
    if (!userData || !userData.userAccountData.healthFactor) return null;

    const hf = BigNumber(userData.userAccountData.healthFactor.toString()).div(
      1e18,
    );
    return hf.isFinite() ? hf : BigNumber(Infinity);
  }, [userData]);

  const validationMessage = useMemo(() => {
    if (!address) return null;

    const inputAmount = BigNumber(value || "0");
    const walletBal = BigNumber(balance || "0");

    if (inputAmount.isZero() || inputAmount.isNegative()) {
      return "Enter a valid amount";
    }

    if (inputAmount.gt(walletBal) && selectedAction === "Supply") {
      return "Insufficient balance";
    }

    if (selectedAction === "Borrow" && futureHealthFactor?.lt(1.01)) {
      return "Health factor too low";
    }

    return null;
  }, [address, value, balance, selectedAction, futureHealthFactor]);

  if (!metrics) return null;

  const { supplyAPY, borrowAPY } = metrics;

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

  const handleSupplyETH = async () => {
    if (!walletClient || !address) return;

    try {
      setIsTransacting(true);
      const inputAmount = BigInt(
        BigNumber(value)
          .times(10 ** token.decimals)
          .toFixed(0),
      );

      // Supply
      const supplyToast = toast.loading(`Supplying ${token.symbol}`);

      try {
        const tx = await supplyEthService(
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

  // const handleBorrowETH = async () => {
  //   if (!walletClient || !address) return;

  //   try {
  //     setIsTransacting(true);
  //     const inputAmount = BigInt(
  //       BigNumber(value)
  //         .times(10 ** token.decimals)
  //         .toFixed(0),
  //     );

  //     // Borrow
  //     const borrowToast = toast.loading(`Borrowing ${token.symbol}`);

  //     try {
  //       const tx = await borrowEthService(inputAmount, walletClient, address);

  //       await waitForTransactionReceipt(walletClient, {
  //         hash: tx as `0x${string}`,
  //       });

  //       toast.success("Borrow successful!");
  //       handleInputChange("0");
  //       console.log(tx);
  //     } catch (error) {
  //       toast.error("Borrow failed!");
  //       throw error;
  //     } finally {
  //       setIsTransacting(false);
  //       toast.dismiss(borrowToast);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsTransacting(false);
  //   }
  // };

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
            <span>${formatTokenValue(totalTokenUSDValue)}</span>
            <span>
              {/* {selectedAction === "Supply" ? (
                <>Wallet balance: {formatTokenValue(BigNumber(balance))}</>
              ) : (
                <>Available: 0</>
              )} */}
              Wallet balance: {formatTokenValue(BigNumber(balance))}
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
            <span>{selectedAction === "Supply" ? supplyAPY : borrowAPY}%</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-tertiary">Health factor</span>
            <span className={healthFactorClass}>
              {currentHealthFactor && futureHealthFactor
                ? `${currentHealthFactor.isFinite() ? currentHealthFactor.toFixed(2) : "∞"} → ${
                    futureHealthFactor.isFinite()
                      ? futureHealthFactor.toFixed(2)
                      : "∞"
                  }`
                : "-"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-tertiary">Estimated gas fee</span>
            <span>0.00001 ETH</span>
          </div>
        </div>
      </div>

      {!address ? (
        <CustomConnectButton className="w-full !py-3 !text-base" />
      ) : (
        <>
          <Button
            className="w-full !py-3 !text-base"
            disabled={!!validationMessage || isTransacting}
            onClick={() => {
              if (selectedAction === "Borrow") {
                return handleBorrow();
              } else if (selectedAction === "Supply") {
                return token.symbol === "ETH"
                  ? handleSupplyETH()
                  : handleSupply();
              }
            }}
          >
            {!validationMessage
              ? `${selectedAction} ${token.symbol}`
              : validationMessage}
          </Button>
        </>
      )}
    </div>
  );
};

export default SupplyBorrowPanel;
