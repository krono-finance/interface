import { useMemo } from "react";

import { BigNumber } from "bignumber.js";

import { IReserve } from "@/types";

interface ReserveMetrics {
  totalSupply: BigNumber;
  totalBorrow: BigNumber;
  utilization: string;
  ltv: string;
  supplyAPY: string;
  borrowAPY: string;
  supplyInUSD: BigNumber;
  borrowInUSD: BigNumber;
}

export const useReserveMetrics = (
  reserve: IReserve,
  tokenPrice: string | undefined,
  ethPrice: string = "2600", // Default ETH price (can be dynamic)
): ReserveMetrics => {
  return useMemo(() => {
    const decimals = Number(reserve.decimals);
    const priceUSD = BigNumber(
      reserve.symbol === "WETH" ? ethPrice : tokenPrice || "0",
    );

    // Raw amounts (adjusted for decimals)
    const debt = BigNumber(reserve.totalScaledVariableDebt ?? "0").div(
      10 ** decimals,
    );
    const liquidity = BigNumber(reserve.availableLiquidity ?? "0").div(
      10 ** decimals,
    );
    const totalSupply = debt.plus(liquidity);

    // Utilization rate (borrow / supply)
    const utilization = totalSupply.isZero()
      ? "0.00"
      : debt.div(totalSupply).times(100).toFixed(2);

    // Loan-to-Value (LTV)
    const ltv = BigNumber(reserve.baseLTVasCollateral).div(100).toFixed(2);

    // APYs (adjusted for 1e27 precision)
    const supplyAPY = BigNumber(reserve.liquidityRate)
      .div(10 ** 27)
      .times(100)
      .toFixed(2);

    const borrowAPY = BigNumber(reserve.variableBorrowRate)
      .div(10 ** 27)
      .times(100)
      .toFixed(2);

    // USD values
    const supplyInUSD = totalSupply.times(priceUSD);
    const borrowInUSD = debt.times(priceUSD);

    return {
      totalSupply,
      totalBorrow: debt,
      utilization,
      ltv,
      supplyAPY,
      borrowAPY,
      supplyInUSD,
      borrowInUSD,
    };
  }, [reserve, tokenPrice, ethPrice]);
};
