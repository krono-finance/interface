"use client";

import { useQuery } from "@tanstack/react-query";

import { getAssetsPrices } from "@/lib/services/mockPriceOracleService";

const useAssetsPrices = () => {
  return useQuery({
    queryKey: ["assetsPrices"],
    queryFn: getAssetsPrices,
  });
};

export default useAssetsPrices;
