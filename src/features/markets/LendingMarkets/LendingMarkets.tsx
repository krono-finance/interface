"use client";
import React from "react";

import useReservesData from "@/hooks/useReservesData";
import useWindowSize from "@/hooks/useWindowSize";
import { useRootStore } from "@/store/root";

import LendingAssetCard from "./LendingAssetCard";
import LendingAssetList from "./LendingAssetList";

const LendingMarkets = () => {
  const { isLaptop } = useWindowSize();
  const { isLoading } = useReservesData();
  const reservesData = useRootStore((state) => state.reservesData);

  return (
    <>
      {isLaptop ? (
        <LendingAssetCard />
      ) : (
        <LendingAssetList reserves={reservesData} isLoading={isLoading} />
      )}
    </>
  );
};

export default LendingMarkets;
