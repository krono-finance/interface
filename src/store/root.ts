import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

import { createModalSlice, ModalSlice } from "./modalSlice";
import { createReserveSlice, ReserveSlice } from "./reserveSlice";

export type RootStore = ModalSlice & ReserveSlice;

export const useRootStore = create<RootStore>()(
  subscribeWithSelector(
    devtools((...args) => ({
      ...createModalSlice(...args),
      ...createReserveSlice(...args),
    })),
  ),
);
