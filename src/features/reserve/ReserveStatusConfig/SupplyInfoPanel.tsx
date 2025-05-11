import React from "react";

import { CheckIcon } from "lucide-react";

import CircularProgressBar from "@/components/Progress/CircularProgressBar";

const SupplyInfoPanel = () => {
  return (
    <div className="bg-surface border-elevated flex flex-col gap-6 rounded-xl border p-4 md:flex-row md:gap-4 md:px-8 md:py-6">
      <h3 className="min-w-[160px] text-sm font-semibold">Supply Info</h3>
      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
          <div className="flex items-center gap-6">
            <CircularProgressBar
              showPercentage
              percentage={60}
              size={90}
              stroke={5}
            />
            <div className="space-y-0.5">
              <p className="text-tertiary text-sm">Total Supplied</p>
              <div className="text-lg font-semibold">
                86.65K <span className="text-tertiary">of</span> 150.45K
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-sm font-medium md:flex-col">
            <p>Collateral Usage</p>
            <div className="border-border text-success flex w-fit items-center gap-0.5 rounded-2xl border px-2.5 py-1">
              <CheckIcon className="size-5" /> <span>Can be collateral</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-3 md:flex">
          <div className="border-border flex h-full flex-col gap-2 rounded-xl border px-3 py-2">
            <span className="text-tertiary text-sm">Max LTV</span>
            <p className="font-semibold">
              65.00<span className="text-tertiary">%</span>
            </p>
          </div>
          <div className="border-border flex h-full flex-col gap-2 rounded-xl border px-3 py-2">
            <span className="text-tertiary text-sm">Liquidation Threshold</span>
            <p className="font-semibold">
              72.00<span className="text-tertiary">%</span>
            </p>
          </div>
          <div className="border-border flex h-full flex-col gap-2 rounded-xl border px-3 py-2">
            <span className="text-tertiary text-sm">Liquidation Penalty</span>
            <p className="font-semibold">
              10.00<span className="text-tertiary">%</span>
            </p>
          </div>
          <div className="border-border flex h-full flex-col gap-2 rounded-xl border px-3 py-2">
            <span className="text-tertiary text-sm">Supply APY</span>
            <p className="font-semibold">
              4.50<span className="text-tertiary">%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyInfoPanel;
