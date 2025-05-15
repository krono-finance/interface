"use client";
import React from "react";

import useWindowSize from "@/hooks/useWindowSize";

import BorrowInfoPanel from "./BorrowInfoPanel";
import InterestRateModel from "./InterestRateModelPanel";
import ReserveTabs from "./ReserveTabs";
import SupplyBorrowPanel from "./SupplyBorrowPanel";
import SupplyInfoPanel from "./SupplyInfoPanel";

const ReserveStatusConfig = () => {
  const { isTablet } = useWindowSize();

  return (
    <>
      {isTablet ? (
        <ReserveTabs />
      ) : (
        <section className="flex w-full flex-col gap-3 md:gap-5 xl:flex-row">
          <div className="order-2 flex w-full flex-col gap-3 md:gap-5 xl:order-1">
            <SupplyInfoPanel />
            <BorrowInfoPanel />
            <InterestRateModel />
          </div>
          <div className="order-1 xl:order-2">
            <SupplyBorrowPanel />
          </div>
        </section>
      )}
    </>
  );
};

export default ReserveStatusConfig;
