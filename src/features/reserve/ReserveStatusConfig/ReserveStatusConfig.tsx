import React from "react";

import SupplyInfoPanel from "./SupplyInfoPanel";

const ReserveStatusConfig = () => {
  return (
    <section className="flex w-full gap-6">
      <div className="flex w-full flex-col gap-6">
        <SupplyInfoPanel />
        <SupplyInfoPanel />
      </div>
      <div className="bg-surface border-elevated h-[400px] w-[470px] rounded-lg border px-8 py-6"></div>
    </section>
  );
};

export default ReserveStatusConfig;
