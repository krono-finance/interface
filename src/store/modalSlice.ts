import { StateCreator } from "zustand";

import { RootStore } from "./root";

export type ModalSlice = {
  supplyModal: boolean;
  openSupply: () => void;
  closeSupply: () => void;

  withdrawModal: boolean;
  openWithdraw: () => void;
  closeWithdraw: () => void;

  borrowModal: boolean;
  openBorrow: () => void;
  closeBorrow: () => void;

  repayModal: boolean;
  openRepay: () => void;
  closeRepay: () => void;
};

export const createModalSlice: StateCreator<
  RootStore,
  [["zustand/subscribeWithSelector", never], ["zustand/devtools", never]],
  [],
  ModalSlice
> = (set) => ({
  supplyModal: false,
  openSupply: () => set({ supplyModal: true }),
  closeSupply: () => set({ supplyModal: false }),

  withdrawModal: false,
  openWithdraw: () => set({ withdrawModal: true }),
  closeWithdraw: () => set({ withdrawModal: false }),

  borrowModal: false,
  openBorrow: () => set({ borrowModal: true }),
  closeBorrow: () => set({ borrowModal: false }),

  repayModal: false,
  openRepay: () => set({ repayModal: true }),
  closeRepay: () => set({ repayModal: false }),
});
