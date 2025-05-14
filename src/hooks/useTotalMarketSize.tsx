import BigNumber from "bignumber.js";
import { useShallow } from "zustand/shallow";

import { useRootStore } from "@/store/root";

const useTotalMarketSize = () => {
  const [reservesData, tokensPrice] = useRootStore(
    useShallow((state) => [state.reservesData, state.tokensPrice]),
  );

  let totalSupplyUSD = BigNumber(0);
  let totalBorrowUSD = BigNumber(0);
  let totalAvailableUSD = BigNumber(0);

  reservesData.forEach((reserve) => {
    const tokenPrice =
      tokensPrice.find((t) => t.symbol === reserve.symbol)?.price || "0";
    const priceUSD = BigNumber(tokenPrice);

    // Convert raw values to decimals (e.g., WETH has 18 decimals)
    const decimals = Number(reserve.decimals);
    const availableLiquidity = BigNumber(
      reserve.availableLiquidity.toString(),
    ).div(10 ** decimals);
    const totalScaledVariableDebt = BigNumber(
      reserve.totalScaledVariableDebt.toString(),
    ).div(10 ** decimals);

    // Calculate USD values
    const supplyUSD = availableLiquidity
      .plus(totalScaledVariableDebt)
      .times(priceUSD);
    const borrowUSD = totalScaledVariableDebt.times(priceUSD);
    const availableUSD = availableLiquidity.times(priceUSD);

    // Add to totals
    totalSupplyUSD = totalSupplyUSD.plus(supplyUSD);
    totalBorrowUSD = totalBorrowUSD.plus(borrowUSD);
    totalAvailableUSD = totalAvailableUSD.plus(availableUSD);
  });

  return {
    totalSupplyUSD,
    totalBorrowUSD,
    totalAvailableUSD,
  };
};

export default useTotalMarketSize;
