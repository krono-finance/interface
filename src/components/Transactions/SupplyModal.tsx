import React from "react";

import Image from "next/image";

import { useShallow } from "zustand/shallow";

import useNumberInput from "@/hooks/useNumberInput";
import { useRootStore } from "@/store/root";
import { quickAddPercentages } from "@/types";

import Button from "../Button/Button";
import NumberInput from "../Input/NumberInput";
import Modal from "../Modal/Modal";

const SupplyModal = () => {
  const [supplyModal, closeSupply] = useRootStore(
    useShallow((state) => [state.supplyModal, state.closeSupply]),
  );

  const { displayValue, value, handleInputBlur, handleInputChange } =
    useNumberInput();

  return (
    <Modal
      title="Supply BTC"
      isOpen={supplyModal}
      onClose={() => {
        closeSupply();
        handleInputChange("");
      }}
    >
      <div className="space-y-3 py-4">
        <NumberInput
          label="Enter amount"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          value={displayValue}
          suffix={
            <div className="flex items-center gap-1.5">
              <Image
                src={"/tokens/usdc.svg"}
                alt={"USDC"}
                width={32}
                height={32}
              />
              <span className="text-lg font-semibold text-white">USDC</span>
            </div>
          }
          placeholder="0.00"
        />

        <div className="flex items-center justify-between gap-3 text-sm">
          <p className="text-tertiary">Balance: 10.00 USDC</p>
          <div className="flex items-center gap-1.5">
            {quickAddPercentages.map((percentage) => (
              <Button
                key={percentage}
                variant="secondary"
                className="!px-2.5 !py-0.5"
              >
                {percentage}%
              </Button>
            ))}
          </div>
        </div>

        <Button
          disabled={value <= 0}
          className="mt-4 mb-2 w-full !py-2.5 !text-base"
        >
          Enter an amount
        </Button>
      </div>
    </Modal>
  );
};

export default SupplyModal;
