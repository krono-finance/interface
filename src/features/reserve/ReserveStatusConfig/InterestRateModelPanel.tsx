import React from "react";

import useReserveMetrics from "@/hooks/useReserveMetrics";

import InterestRateChart from "./InterestRateChart";

const InterestRateModel = () => {
  const reserve = useReserveMetrics();

  if (!reserve) return null;

  return (
    <div className="bg-surface border-elevated flex flex-col gap-6 rounded-xl border p-4 md:flex-row md:gap-4 md:px-8 md:py-6">
      <h3 className="min-w-[160px] text-sm font-semibold">
        Interest Rate Model
      </h3>
      <div className="w-full">
        <div className="space-y-1">
          <p className="text-tertiary">Utilization Rate</p>
          <p className="font-semibold">
            {reserve.utilization}
            <span className="text-tertiary">%</span>
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="text-tertiary flex items-center gap-2 text-sm">
            <div className="bg-error size-3 rounded-full" />
            <p className="pb-0.5">Borrow APR</p>
          </div>
          <div className="text-tertiary flex items-center gap-2 text-sm">
            <div className="bg-success size-3 rounded-full" />
            <p className="pb-0.5">Supply APR</p>
          </div>
          <div className="text-tertiary flex items-center gap-2 text-sm">
            <div className="bg-accent size-3 rounded-full" />
            <p className="pb-0.5">Utilization</p>
          </div>
        </div>

        <InterestRateChart />
      </div>
    </div>
  );
};

export default InterestRateModel;
