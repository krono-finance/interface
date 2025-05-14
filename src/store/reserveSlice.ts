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

  updateTokenData: (token: IToken) => void;
  updateReservesData: (reserves: IReserve[]) => void;
  updateUserReservesData: (reserves: IUserReserve[]) => void;
  updateTokensPrice: (prices: ITokenPrice[]) => void;
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

  updateTokenData: (token) => set({ tokenData: token }),
  updateReservesData: (reserves) => set({ reservesData: reserves }),
  updateUserReservesData: (reserves) => set({ userReservesData: reserves }),
  updateTokensPrice: (prices) => set({ tokensPrice: prices }),
});
