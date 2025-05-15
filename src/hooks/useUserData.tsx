"use client";
import { useQuery } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import { Address } from "viem";
import { useShallow } from "zustand/shallow";

import { getUserAccountData } from "@/lib/services/lendingPoolService";
import { getUserReservesData } from "@/lib/services/uiPoolDataProviderService";
import { useRootStore } from "@/store/root";
import { IUserAccountData, IUserReserveData } from "@/types";

type ParsedUserData = {
  userAccountData: IUserAccountData;
  borrowPowerUsed: BigNumber | 0;
  totalSupplyUSD: BigNumber;
  totalBorrowUSD: BigNumber;
  supplied: IUserReserveData[];
  borrowed: IUserReserveData[];
};

const calculateBorrowPowerUsed = (
  totalDebtETH: bigint,
  availableBorrowsETH: bigint,
): BigNumber | 0 => {
  const total = new BigNumber(totalDebtETH.toString()).plus(
    availableBorrowsETH.toString(),
  );
  if (total.isZero()) return 0;

  return new BigNumber(totalDebtETH.toString())
    .dividedBy(total)
    .multipliedBy(100);
};

export const useUserData = (user: Address | `0x${string}`) => {
  const [reserves, tokensPrice] = useRootStore(
    useShallow((state) => [state.reservesData, state.tokensPrice]),
  );

  return useQuery<ParsedUserData>({
    queryKey: ["user-data", user],
    queryFn: async () => {
      const [accountData, reservesData] = await Promise.all([
        getUserAccountData(user),
        getUserReservesData(user),
      ]);

      const supplied = reservesData.filter(
        (r) => r.scaledATokenBalance > BigInt(0),
      );
      const borrowed = reservesData.filter(
        (r) =>
          r.scaledVariableDebt > BigInt(0) || r.principalStableDebt > BigInt(0),
      );

      let totalSupplyUSD = new BigNumber(0);
      let totalBorrowUSD = new BigNumber(0);

      for (const reserve of reserves) {
        const tokenPriceStr =
          tokensPrice.find((t) => t.symbol === reserve.symbol)?.price || "0";
        const priceUSD = new BigNumber(tokenPriceStr);
        const decimals = Number(reserve.decimals);

        const availableLiquidity = new BigNumber(
          reserve.availableLiquidity.toString(),
        ).dividedBy(10 ** decimals);

        const totalScaledVariableDebt = new BigNumber(
          reserve.totalScaledVariableDebt.toString(),
        ).dividedBy(10 ** decimals);

        const supplyUSD = availableLiquidity
          .plus(totalScaledVariableDebt)
          .multipliedBy(priceUSD);

        const borrowUSD = totalScaledVariableDebt.multipliedBy(priceUSD);

        totalSupplyUSD = totalSupplyUSD.plus(supplyUSD);
        totalBorrowUSD = totalBorrowUSD.plus(borrowUSD);
      }

      return {
        userAccountData: accountData,
        borrowPowerUsed: calculateBorrowPowerUsed(
          accountData.totalDebtETH,
          accountData.availableBorrowsETH,
        ),
        totalSupplyUSD,
        totalBorrowUSD,
        supplied,
        borrowed,
      };
    },
    enabled: !!user,
  });
};

export default useUserData;
