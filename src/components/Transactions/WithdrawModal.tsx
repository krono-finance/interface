import React from "react";

import { useShallow } from "zustand/shallow";

import useNumberInput from "@/hooks/useNumberInput";
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

  const { displayValue, value, handleInputBlur, handleInputChange } =
    useNumberInput();

  return (
    <TransactionModal
      isOpen={withdrawModal}
      onClose={closeWithdraw}
      token={tokenData}
      available="10.00"
      txType="Withdraw"
      value={value}
      displayValue={displayValue}
      handleInputChange={handleInputChange}
      handleInputBlur={handleInputBlur}
      handleTransaction={() => {}}
    />
  );
};

export default WithdrawModal;
