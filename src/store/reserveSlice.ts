/* eslint-disable no-unused-vars */
import { StateCreator } from "zustand";

import { POOL_TOKENS } from "@/constant/poolTokenData";
import { IReserve, IToken, ITokenPrice, IUserReserve } from "@/types";

import { RootStore } from "./root";

export type ReserveSlice = {
  tokenData: IToken;
  reservesData: IReserve[] | [];
  userReservesData: IUserReserve[] | [];
  tokensPrice: ITokenPrice[] | [];
  currentReserve: IReserve;

  updateTokenData: (token: IToken) => void;
  updateReservesData: (reserves: IReserve[]) => void;
  updateUserReservesData: (reserves: IUserReserve[]) => void;
  updateTokensPrice: (prices: ITokenPrice[]) => void;
  updateCurrentReserve: (reserve: IReserve) => void;
};

export const createReserveSlice: StateCreator<
  RootStore,
  [["zustand/subscribeWithSelector", never], ["zustand/devtools", never]],
  [],
  ReserveSlice
> = (set) => ({
  tokenData: POOL_TOKENS.idrx,
  reservesData: [],
  userReservesData: [],
  tokensPrice: [],
  currentReserve: {
    underlyingAsset: "",
    name: "",
    symbol: "",
    decimals: BigInt(0),
    baseLTVasCollateral: BigInt(0),
    reserveLiquidationThreshold: BigInt(0),
    reserveLiquidationBonus: BigInt(0),
    reserveFactor: BigInt(0),
    usageAsCollateralEnabled: false,
    borrowingEnabled: false,
    stableBorrowRateEnabled: false,
    isActive: false,
    isFrozen: false,
    liquidityIndex: BigInt(0),
    variableBorrowIndex: BigInt(0),
    liquidityRate: BigInt(0),
    variableBorrowRate: BigInt(0),
    stableBorrowRate: BigInt(0),
    lastUpdateTimestamp: BigInt(0),
    kTokenAddress: "",
    stableDebtTokenAddress: "",
    variableDebtTokenAddress: "",
    interestRateStrategyAddress: "",
    availableLiquidity: BigInt(0),
    totalPrincipalStableDebt: BigInt(0),
    averageStableRate: BigInt(0),
    stableDebtLastUpdateTimestamp: BigInt(0),
    totalScaledVariableDebt: BigInt(0),
    priceInEth: BigInt(0),
    variableRateSlope1: BigInt(0),
    variableRateSlope2: BigInt(0),
    stableRateSlope1: BigInt(0),
    stableRateSlope2: BigInt(0),
  },

  updateTokenData: (token) => set({ tokenData: token }),
  updateReservesData: (reserves) => set({ reservesData: reserves }),
  updateUserReservesData: (reserves) => set({ userReservesData: reserves }),
  updateTokensPrice: (prices) => set({ tokensPrice: prices }),
  updateCurrentReserve: (reserve) => set({ currentReserve: reserve }),
});
