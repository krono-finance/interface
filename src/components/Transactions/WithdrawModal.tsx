"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

import BigNumber from "bignumber.js";
import { Address } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { useAccount, useBalance, useWalletClient } from "wagmi";
import { useShallow } from "zustand/shallow";

import useNumberInput from "@/hooks/useNumberInput";
import { withdrawService } from "@/lib/services/lendingPoolService";
import { useRootStore } from "@/store/root";

import TransactionModal from "./TransactionModal";

const WithdrawModal = () => {
  const [withdrawModal, closeWithdraw, tokenData] = useRootStore(
    useShallow((state) => [
      state.withdrawModal,
      state.closeWithdraw,
      state.tokenData,
    ]),
  );
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();

  const { displayValue, value, handleInputBlur, handleInputChange } =
    useNumberInput();

  const [isTransacting, setIsTransacting] = useState(false);

  const { data: kToken } = useBalance({
    address,
    token: tokenData.kTokenAddress as `0x${string}`,
  });
  const availableWithdraw = BigNumber(kToken?.value || "0")
    .div(10 ** tokenData.decimals)
    .toFormat()
    .toString();

  const handleWithdraw = async () => {
    if (!walletClient || !address) return;

    try {
      setIsTransacting(true);
      const inputAmount = BigInt(
        BigNumber(value)
          .times(10 ** tokenData.decimals)
          .toFixed(0),
      );
      const asset = tokenData.address as Address;

      const txToast = toast.loading(`Withdrawing ${tokenData.symbol}`);

      try {
        const tx = await withdrawService(
          asset,
          inputAmount,
          address,
          walletClient,
          address,
        );

        await waitForTransactionReceipt(walletClient, {
          hash: tx as `0x${string}`,
        });

        toast.success("Withdraw successful!");
        handleInputChange("0");
        console.log(tx);
      } catch (error) {
        toast.error("Withdraw failed!");
        throw error;
      } finally {
        setIsTransacting(false);
        toast.dismiss(txToast);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsTransacting(false);
      closeWithdraw();
    }
  };

  return (
    <TransactionModal
      isOpen={withdrawModal}
      onClose={closeWithdraw}
      token={tokenData}
      available={availableWithdraw}
      txType="Withdraw"
      value={value}
      displayValue={displayValue}
      isTransacting={isTransacting}
      handleInputChange={handleInputChange}
      handleInputBlur={handleInputBlur}
      handleTransaction={handleWithdraw}
    />
  );
};

export default WithdrawModal;
