"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
import { useShallow } from "zustand/shallow";

import { LENDING_POOL_CONTRACT_ADDRESS } from "@/constant/contractAddresses";
import useNumberInput from "@/hooks/useNumberInput";
import { repayService } from "@/lib/services/lendingPoolService";
import { useRootStore } from "@/store/root";

import TransactionModal from "./TransactionModal";

const RepayModal = () => {
  const [repayModal, closeRepay, tokenData] = useRootStore(
    useShallow((state) => [
      state.repayModal,
      state.closeRepay,
      state.tokenData,
    ]),
  );
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const { displayValue, value, handleInputBlur, handleInputChange } =
    useNumberInput();

  const { data: allowance } = useReadContract({
    abi: erc20Abi,
    address: tokenData.address as Address,
    functionName: "allowance",
    args: [address!, LENDING_POOL_CONTRACT_ADDRESS],
  });

  const [isTransacting, setIsTransacting] = useState(false);

  const { data: debtToken } = useBalance({
    address,
    token: tokenData.variableDebtTokenAddress as `0x${string}`,
  });
  const remainingRepay = BigNumber(debtToken?.value || "0")
    .div(10 ** tokenData.decimals)
    .toFormat()
    .toString();

  const handleRepay = async () => {
    if (!walletClient || !address) return;

    try {
      setIsTransacting(true);
      const currentAllowance = allowance ?? BigInt(0);
      const inputAmount = BigInt(
        BigNumber(value)
          .times(10 ** tokenData.decimals)
          .toFixed(0),
      );
      const asset = tokenData.address as Address;

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

      // REPAY
      const repayToast = toast.loading(`Repaying ${tokenData.symbol}`);

      try {
        const tx = await repayService(
          asset,
          inputAmount,
          address,
          walletClient,
          address,
        );

        await waitForTransactionReceipt(walletClient, {
          hash: tx as `0x${string}`,
        });

        toast.success("Repay successful!");
        handleInputChange("0");
        console.log(tx);
      } catch (error) {
        toast.error("Repay failed!");
        throw error;
      } finally {
        setIsTransacting(false);
        toast.dismiss(repayToast);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsTransacting(false);
      closeRepay();
    }
  };

  return (
    <TransactionModal
      isOpen={repayModal}
      onClose={closeRepay}
      token={tokenData}
      available={remainingRepay}
      txType="Repay"
      value={value}
      displayValue={displayValue}
      isTransacting={isTransacting}
      handleInputChange={handleInputChange}
      handleInputBlur={handleInputBlur}
      handleTransaction={handleRepay}
    />
  );
};

export default RepayModal;
