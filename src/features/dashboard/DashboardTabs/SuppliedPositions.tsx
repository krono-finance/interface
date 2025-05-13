"use client";
import React, { useState } from "react";

import Image from "next/image";

import { useShallow } from "zustand/shallow";

import Button from "@/components/Button/Button";
import SwitchCustom from "@/components/Switch/SwitchCustom";
import { poolList } from "@/constant/poolTokenData";
import { useRootStore } from "@/store/root";

const SuppliedPositions = () => {
  const [openSupply, openWithdraw] = useRootStore(
    useShallow((state) => [state.openSupply, state.openWithdraw]),
  );
  const updateTokenData = useRootStore((state) => state.updateTokenData);

  const [checked, setChecked] = useState(false);

  return (
    <div className="border-elevated h-fit overflow-hidden rounded-xl border">
      <section className="bg-surface space-y-5 p-4">
        <div>
          <p className="ml-0.5 text-lg font-semibold">Your supplies</p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <div className="border-border flex gap-1 rounded-2xl border px-2.5 py-1">
            <p className="text-tertiary">Balance</p>
            <p className="font-medium">
              <span className="text-tertiary">$</span>32.25K
            </p>
          </div>

          <div className="border-border flex gap-1 rounded-2xl border px-2.5 py-1">
            <p className="text-tertiary">APY</p>
            <p className="font-medium">
              4.55<span className="text-tertiary">%</span>
            </p>
          </div>

          <div className="border-border flex gap-1 rounded-2xl border px-2.5 py-1">
            <p className="text-tertiary">Collateral</p>
            <p className="font-medium">
              <span className="text-tertiary">$</span>12.20K
            </p>
          </div>
        </div>
      </section>

      <section>
        <header className="bg-surface text-tertiary border-elevated flex h-full w-full border-b px-4 py-2 text-sm font-medium">
          <div className="w-full max-w-30 min-w-17.5">Asset</div>
          <div className="w-full min-w-17.5 text-center">Balance</div>
          <div className="w-full min-w-17.5 text-center">APY</div>
          <div className="w-full min-w-17.5 text-center">Collateral</div>
          <div className="w-full max-w-40 min-w-40 text-center"></div>
        </header>
        <div className="divide-elevated divide-y text-sm font-medium">
          {poolList.map((token) => (
            <div key={token.name} className="flex p-4">
              <div className="flex w-full max-w-30 min-w-17.5 items-center gap-2.5">
                <Image
                  src={token.image}
                  alt={token.name}
                  width={64}
                  height={64}
                  className="size-8"
                />
                <span className="font-semibold">{token.symbol}</span>
              </div>
              <div className="flex w-full min-w-17.5 items-center justify-center text-center">
                <div>
                  <p>32.25K</p>
                  <p className="text-tertiary text-xs">$32.25K</p>
                </div>
              </div>
              <div className="flex w-full min-w-17.5 items-center justify-center text-center">
                <p>
                  2.55<span className="text-tertiary">%</span>
                </p>
              </div>
              <div className="flex w-full min-w-17.5 items-center justify-center text-center">
                <SwitchCustom
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              </div>
              <div className="flex w-full max-w-40 min-w-40 items-center justify-end gap-2">
                <Button
                  variant="secondary"
                  className="!px-3 !py-2"
                  onClick={() => {
                    openSupply();
                    updateTokenData(token);
                  }}
                >
                  Supply
                </Button>
                <Button
                  variant="tertiary"
                  className="!px-3 !py-2"
                  onClick={() => {
                    openWithdraw();
                    updateTokenData(token);
                  }}
                >
                  Withdraw
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SuppliedPositions;
