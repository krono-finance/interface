import React from "react";

import { useShallow } from "zustand/shallow";

import useNumberInput from "@/hooks/useNumberInput";
import { useRootStore } from "@/store/root";

import TransactionModal from "./TransactionModal";

const SupplyModal = () => {
  const [supplyModal, closeSupply, tokenData] = useRootStore(
    useShallow((state) => [
      state.supplyModal,
      state.closeSupply,
      state.tokenData,
    ]),
  );

  const { displayValue, value, handleInputBlur, handleInputChange } =
    useNumberInput();

  return (
    <TransactionModal
      isOpen={supplyModal}
      onClose={closeSupply}
      token={tokenData}
      available="10.00"
      txType="Supply"
      value={value}
      displayValue={displayValue}
      isTransacting={false}
      handleInputChange={handleInputChange}
      handleInputBlur={handleInputBlur}
      handleTransaction={async () => {}}
    />
  );
};

export default SupplyModal;
