import React from "react";

import BorrowInfoPanel from "./BorrowInfoPanel";
import SupplyBorrowPanel from "./SupplyBorrowPanel";
import SupplyInfoPanel from "./SupplyInfoPanel";

const ReserveStatusConfig = () => {
  return (
    <section className="flex w-full gap-5">
      <div className="flex w-full flex-col gap-5">
        <SupplyInfoPanel />
        <BorrowInfoPanel />
        {/* <InterestRateModel /> */}
      </div>
      <SupplyBorrowPanel />
    </section>
  );
};

export default ReserveStatusConfig;
