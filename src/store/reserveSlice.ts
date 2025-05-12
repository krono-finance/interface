import { StateCreator } from "zustand";

import { POOL_TOKENS } from "@/constant/poolTokenData";
import { IToken } from "@/types";

import { RootStore } from "./root";

export type ReserveSlice = {
  tokenData: IToken;
  // eslint-disable-next-line no-unused-vars
  updateTokenData: (token: IToken) => void;
};

export const createReserveSlice: StateCreator<
  RootStore,
  [["zustand/subscribeWithSelector", never], ["zustand/devtools", never]],
  [],
  ReserveSlice
> = (set) => ({
  tokenData: POOL_TOKENS.idrx,
  updateTokenData: (token) => set({ tokenData: token }),
});
