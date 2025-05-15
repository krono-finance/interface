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
  totalSupplyAPY: BigNumber;
  totalBorrowAPY: BigNumber;
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

export const useUserData = (user: Address | undefined) => {
  const [reserves, tokensPrice] = useRootStore(
    useShallow((state) => [state.reservesData, state.tokensPrice]),
  );

  return useQuery<ParsedUserData>({
    queryKey: ["user-data", user],
    queryFn: async () => {
      if (!user) {
        throw new Error("User address is not defined");
      }

      const [accountData, reservesData] = await Promise.all([
        getUserAccountData(user),
        getUserReservesData(user),
      ]);

      if (!reserves.length || !tokensPrice.length) {
        throw new Error("Reserves or token prices not loaded yet");
      }

      const supplied = reservesData.filter(
        (r) => r.scaledATokenBalance > BigInt(0),
      );
      const borrowed = reservesData.filter(
        (r) =>
          r.scaledVariableDebt > BigInt(0) || r.principalStableDebt > BigInt(0),
      );

      let totalSupplyUSD = new BigNumber(0);
      let totalBorrowUSD = new BigNumber(0);
      let weightedSupplyAPY = new BigNumber(0);
      let weightedBorrowAPY = new BigNumber(0);

      for (const userReserve of supplied) {
        const reserveMeta = reserves.find(
          (r) =>
            r.underlyingAsset.toLowerCase() ===
            userReserve.underlyingAsset.toLowerCase(),
        );
        if (!reserveMeta) continue;

        const price = new BigNumber(
          tokensPrice.find((t) => t.symbol === reserveMeta.symbol)?.price ||
            "0",
        );
        const decimals = Number(reserveMeta.decimals);

        const userSupply = new BigNumber(
          userReserve.scaledATokenBalance.toString(),
        ).dividedBy(10 ** decimals);
        const supplyUSD = userSupply.times(price);
        totalSupplyUSD = totalSupplyUSD.plus(supplyUSD);

        const supplyAPY = new BigNumber(reserveMeta.liquidityRate)
          .div(1e27)
          .times(100);
        weightedSupplyAPY = weightedSupplyAPY.plus(supplyAPY.times(supplyUSD));
      }

      for (const userReserve of borrowed) {
        const reserveMeta = reserves.find(
          (r) =>
            r.underlyingAsset.toLowerCase() ===
            userReserve.underlyingAsset.toLowerCase(),
        );
        if (!reserveMeta) continue;

        const price = new BigNumber(
          tokensPrice.find((t) => t.symbol === reserveMeta.symbol)?.price ||
            "0",
        );
        const decimals = Number(reserveMeta.decimals);

        const variableDebt = new BigNumber(
          userReserve.scaledVariableDebt.toString(),
        ).dividedBy(10 ** decimals);
        const stableDebt = new BigNumber(
          userReserve.principalStableDebt.toString(),
        ).dividedBy(10 ** decimals);

        const totalDebt = variableDebt.plus(stableDebt);
        const debtUSD = totalDebt.times(price);
        totalBorrowUSD = totalBorrowUSD.plus(debtUSD);

        const borrowAPY = new BigNumber(reserveMeta.variableBorrowRate)
          .div(1e27)
          .times(100);
        weightedBorrowAPY = weightedBorrowAPY.plus(borrowAPY.times(debtUSD));
      }

      const totalSupplyAPY = totalSupplyUSD.isZero()
        ? new BigNumber(0)
        : weightedSupplyAPY.dividedBy(totalSupplyUSD);
      const totalBorrowAPY = totalBorrowUSD.isZero()
        ? new BigNumber(0)
        : weightedBorrowAPY.dividedBy(totalBorrowUSD);

      return {
        userAccountData: accountData,
        borrowPowerUsed: calculateBorrowPowerUsed(
          accountData.totalDebtETH,
          accountData.availableBorrowsETH,
        ),
        totalSupplyUSD,
        totalBorrowUSD,
        totalSupplyAPY,
        totalBorrowAPY,
        supplied,
        borrowed,
      };
    },
    enabled: !!user,
  });
};

export default useUserData;
