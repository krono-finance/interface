"use client";
import React, { useState } from "react";

import Image from "next/image";

import Button from "@/components/Button/Button";
import NumberInput from "@/components/Input/NumberInput";
import SwitchCustom from "@/components/Switch/SwitchCustom";
import useNumberInput from "@/hooks/useNumberInput";

const SupplyBorrowPanel = () => {
  const [selectedAction, setSelectedAction] = useState("Supply");
  const [ethWeth, setEthWeth] = useState(false);

  const { displayValue, value, handleInputBlur, handleInputChange } =
    useNumberInput();

  return (
    <div className="bg-surface border-elevated h-fit min-w-[440px] space-y-5 rounded-lg border p-6 pt-4">
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

        <div className="border-elevated bg-background min-h-20 rounded-xl border pt-0.5">
          <NumberInput
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
                <span className="text-primary text-lg font-semibold">USDC</span>
              </div>
            }
            placeholder="0.00"
            className="!border-0 !pb-0.5"
            inputClassName="font-medium xl:text-xl max-w-[240px]"
          />
          <div className="text-tertiary flex justify-between gap-3 p-4 text-sm font-medium">
            <span>$0</span>
            <span>Wallet balance: 500.00</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SwitchCustom
            checked={ethWeth}
            onChange={() => setEthWeth(!ethWeth)}
          />
          <span className="text-sm">Supply in {ethWeth ? "ETH" : "WETH"}</span>
        </div>
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

      <Button className="w-full !py-3" disabled={value <= 0}>
        {value > 0 ? <>{selectedAction} USDC</> : "Enter an amount"}
      </Button>
    </div>
  );
};

export default SupplyBorrowPanel;
