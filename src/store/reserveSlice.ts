import { StateCreator } from "zustand";

import { POOL_TOKENS } from "@/constant/poolTokenData";
import { IReserve, IToken, IUserReserve } from "@/types";

import { RootStore } from "./root";

export type ReserveSlice = {
  tokenData: IToken;
  reservesData: IReserve[] | [];
  userReservesData: IUserReserve[] | [];

  // eslint-disable-next-line no-unused-vars
  updateTokenData: (token: IToken) => void;
  // eslint-disable-next-line no-unused-vars
  updateReservesData: (reserves: IReserve[]) => void;
  // eslint-disable-next-line no-unused-vars
  updateUserReservesData: (reserves: IUserReserve[]) => void;
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

  updateTokenData: (token) => set({ tokenData: token }),
  updateReservesData: (reserves) => set({ reservesData: reserves }),
  updateUserReservesData: (reserves) => set({ userReservesData: reserves }),
});
