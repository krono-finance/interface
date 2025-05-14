"use client";
import { useEffect } from "react";

import BigNumber from "bignumber.js";

import { poolList } from "@/constant/poolTokenData";
import useAssetsPrices from "@/hooks/useAssetsPrices";
import useReservesData from "@/hooks/useReservesData";
import { useRootStore } from "@/store/root";
import { ITokenPrice } from "@/types";

const AppInitializer = () => {
  const { data: reserveData, isSuccess: reserveSuccess } = useReservesData();
  const { data: pricesInEth } = useAssetsPrices();

  const updateReservesData = useRootStore((state) => state.updateReservesData);
  const updateTokensPrice = useRootStore((state) => state.updateTokensPrice);

  useEffect(() => {
    if (reserveSuccess && reserveData) {
      const [reserves] = reserveData;
      updateReservesData(reserves);
    }
  }, [reserveData, reserveSuccess, updateReservesData]);

  useEffect(() => {
    if (!pricesInEth || pricesInEth.length !== poolList.length) return;

    const WEI_IN_ETH = new BigNumber("1e18");
    const ethPriceBN = new BigNumber(2600);

    const formatted: ITokenPrice[] = pricesInEth.map((priceBigInt, index) => {
      const token = poolList[index];
      const priceBN = new BigNumber(priceBigInt.toString());
      const priceInEth = priceBN.div(WEI_IN_ETH);
      const priceInUSD = priceInEth.multipliedBy(ethPriceBN);

      const decimals = token.symbol === "IDRX" ? 6 : 2;

      return {
        symbol: token.symbol,
        price: priceInUSD.toFixed(decimals),
      };
    });

    updateTokensPrice(formatted);
  }, [pricesInEth, updateTokensPrice]);

  return null;
};

export default AppInitializer;
