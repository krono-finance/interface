import { useMemo } from "react";

import { BigNumber } from "bignumber.js";

import { useRootStore } from "@/store/root";
import { IReserve, IToken } from "@/types";

interface ReserveMetrics {
  availableLiquidity: BigNumber;
  totalSupply: BigNumber;
  totalBorrow: BigNumber;
  utilization: string;
  ltv: string;
  supplyAPY: string;
  borrowAPY: string;
  supplyInUSD: BigNumber;
  borrowInUSD: BigNumber;
  tokenData: IToken;
  tokenPrice: string;
}

const useMarketData = (
  reserve: IReserve,
  tokenPrice: string | undefined,
  ethPrice: string = "4576",
): ReserveMetrics => {
  const tokenData = useRootStore((state) => state.tokenData);

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
      availableLiquidity: liquidity,
      totalSupply,
      totalBorrow: debt,
      utilization,
      ltv,
      supplyAPY,
      borrowAPY,
      supplyInUSD,
      borrowInUSD,
      tokenData,
      tokenPrice: tokenPrice ?? "0",
    };
  }, [reserve, ethPrice, tokenPrice, tokenData]);
};

export default useMarketData;
