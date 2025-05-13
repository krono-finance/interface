// components/Modal/TransactionModal.tsx

import React from "react";

import Image from "next/image";

import { IToken, quickAddPercentages } from "@/types";

import Button from "../Button/Button";
import NumberInput from "../Input/NumberInput";
import Modal from "../Modal/Modal";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: IToken;
  available: string;
  txType: "Supply" | "Borrow" | "Withdraw" | "Repay";
  value: number;
  displayValue: string;
  isTransacting: boolean;
  // eslint-disable-next-line no-unused-vars
  handleInputChange: (val: string) => void;
  handleInputBlur: () => void;
  handleTransaction: () => Promise<void>;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  token,
  available,
  txType,
  value,
  displayValue,
  isTransacting,
  handleInputChange,
  handleInputBlur,
  handleTransaction,
}) => {
  return (
    <Modal
      title={`${txType} ${token.symbol}`}
      isOpen={isOpen}
      onClose={() => {
        if (!isTransacting) {
          onClose();
          handleInputChange("");
        }
      }}
    >
      <div className="space-y-3 py-4">
        <NumberInput
          label="Enter amount"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          value={displayValue}
          inputClassName="md:min-w-[400px]"
          suffix={
            <div className="flex items-center gap-1.5">
              <Image
                src={token.image}
                alt={token.name}
                width={32}
                height={32}
              />
              <span className="text-lg font-semibold text-white">
                {token.symbol}
              </span>
            </div>
          }
          placeholder="0.00"
        />

        <div className="flex items-center justify-between gap-3 text-sm">
          <p className="text-tertiary">
            {txType === "Repay"
              ? "Remaining"
              : txType === "Supply"
                ? "Balance"
                : "Available"}
            : {available} {token.symbol}
          </p>
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
          disabled={value <= 0 || isTransacting}
          className="mt-4 mb-2 w-full !py-2.5 !text-base"
          onClick={handleTransaction}
        >
          {value > 0 ? txType : "Enter an amount"}
        </Button>
      </div>
    </Modal>
  );
};

export default TransactionModal;
