import React from "react";

import LendingMarkets from "@/features/markets/LendingMarkets/LendingMarkets";
import MarketsHeader from "@/features/markets/MarketsHeader/MarketsHeader";

const MarketsPage = () => {
  return (
    <>
      <MarketsHeader />
      <LendingMarkets />
    </>
  );
};

export default MarketsPage;
