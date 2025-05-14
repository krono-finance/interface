import React from "react";

import LendingAssets from "@/features/markets/LendingMarkets/LendingAssets";
import MarketsHeader from "@/features/markets/MarketsHeader/MarketsHeader";

const MarketsPage = () => {
  return (
    <>
      <MarketsHeader />
      <LendingAssets />
    </>
  );
};

export default MarketsPage;
