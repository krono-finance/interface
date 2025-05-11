import React from "react";

import CircularProgressBar from "@/components/Progress/CircularProgressBar";

const BorrowInfoPanel = () => {
  return (
    <div className="bg-surface border-elevated flex gap-x-4 rounded-xl border px-8 py-6">
      <h3 className="min-w-[160px] text-sm font-semibold">Borrow Info</h3>
      <div className="space-y-8">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-6">
            <CircularProgressBar
              showPercentage
              percentage={45}
              size={90}
              stroke={5}
            />
            <div className="space-y-0.5">
              <p className="text-tertiary text-sm">Total Borrowed</p>
              <div className="text-lg font-semibold">
                86.65K <span className="text-tertiary">of</span> 150.45K
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="border-border space-y-2 rounded-xl border px-3 py-2">
            <span className="text-tertiary text-sm">Reserve Factor</span>
            <p className="font-semibold">
              20.00<span className="text-tertiary">%</span>
            </p>
          </div>

          <div className="border-border space-y-2 rounded-xl border px-3 py-2">
            <span className="text-tertiary text-sm">Borrow APY</span>
            <p className="font-semibold">
              4.50<span className="text-tertiary">%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowInfoPanel;
