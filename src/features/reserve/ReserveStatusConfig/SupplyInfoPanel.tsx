import React from "react";

import { CheckIcon } from "lucide-react";

import CircularProgressBar from "@/components/Progress/CircularProgressBar";

const SupplyInfoPanel = () => {
  return (
    <div className="bg-surface border-elevated flex gap-16 rounded-xl border px-8 py-6">
      <h3 className="text-lg font-semibold">Supply Info</h3>
      <div className="space-y-8">
        <div className="flex items-center gap-10">
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

          <div className="space-y-1.5 text-sm font-medium">
            <p>Collateral Usage</p>
            <div className="border-border text-success flex items-center gap-0.5 rounded-2xl border px-2.5 py-1">
              <CheckIcon className="size-5" /> <span>Can be collateral</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="border-border space-y-2 rounded-xl border px-3 py-2">
            <span className="text-tertiary text-sm">Max LTV</span>
            <p className="font-semibold">
              65.00<span className="text-tertiary">%</span>
            </p>
          </div>
          <div className="border-border space-y-2 rounded-xl border px-3 py-2">
            <span className="text-tertiary text-sm">Liquidation Threshold</span>
            <p className="font-semibold">
              72.00<span className="text-tertiary">%</span>
            </p>
          </div>
          <div className="border-border space-y-2 rounded-xl border px-3 py-2">
            <span className="text-tertiary text-sm">Liquidation Penalty</span>
            <p className="font-semibold">
              10.00<span className="text-tertiary">%</span>
            </p>
          </div>
          <div className="border-border space-y-2 rounded-xl border px-3 py-2">
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
