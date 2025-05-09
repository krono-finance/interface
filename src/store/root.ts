import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

import { createModalSlice, ModalSlice } from "./modalSlice";

export type RootStore = ModalSlice;

export const useRootStore = create<RootStore>()(
  subscribeWithSelector(
    devtools((...args) => ({
      ...createModalSlice(...args),
    })),
  ),
);
