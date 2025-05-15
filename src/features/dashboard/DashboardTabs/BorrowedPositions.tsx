"use client";
import React from "react";

import Image from "next/image";

import BigNumber from "bignumber.js";
import { useAccount } from "wagmi";
import { useShallow } from "zustand/shallow";

import Button from "@/components/Button/Button";
import { poolList } from "@/constant/poolTokenData";
import useUserData from "@/hooks/useUserData";
import { formatTokenValue } from "@/lib/utils";
import { useRootStore } from "@/store/root";

const BorrowedPositions = () => {
  const [openRepay, tokensPrice, reservesData] = useRootStore(
    useShallow((state) => [
      state.openRepay,
      state.tokensPrice,
      state.reservesData,
    ]),
  );
  const updateTokenData = useRootStore((state) => state.updateTokenData);
  const { address } = useAccount();

  const { data, isSuccess } = useUserData(address);

  return (
    <div className="border-elevated h-fit overflow-hidden rounded-xl border">
      <section className="bg-surface space-y-5 p-4">
        <div>
          <p className="ml-0.5 text-lg font-semibold">Your borrows</p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <div className="border-border flex gap-1 rounded-2xl border px-2.5 py-1">
            <p className="text-tertiary">Balance</p>
            <p className="font-medium">
              <span className="text-tertiary">$</span>
              {formatTokenValue(isSuccess ? data.totalBorrowUSD : BigNumber(0))}
            </p>
          </div>

          <div className="border-border flex gap-1 rounded-2xl border px-2.5 py-1">
            <p className="text-tertiary">APY</p>
            <p className="font-medium">
              {data?.totalBorrowAPY.toFixed(2)}
              <span className="text-tertiary">%</span>
            </p>
          </div>

          <div className="border-border flex gap-1 rounded-2xl border px-2.5 py-1">
            <p className="text-tertiary">Borrow power used</p>
            <p className="font-medium">
              {isSuccess ? data.borrowPowerUsed.toFixed(2) : "0.00"}
              <span className="text-tertiary">%</span>
            </p>
          </div>
        </div>
      </section>

      {data && data.borrowed.length > 0 ? (
        <section>
          <header className="bg-surface text-tertiary border-elevated flex h-full w-full border-b px-4 py-2 text-sm font-medium">
            <div className="w-full max-w-32.5 min-w-17.5">Asset</div>
            <div className="w-full min-w-17.5 text-center">Debt</div>
            <div className="w-full min-w-17.5 text-center">APY</div>
            <div className="w-full max-w-40 min-w-40 text-center"></div>
          </header>
          <div className="divide-elevated divide-y text-sm font-medium">
            {data.borrowed.map((borrow) => {
              const token = poolList.find(
                (t) =>
                  t.address.toLowerCase() ===
                  borrow.underlyingAsset.toLowerCase(),
              );
              const reserve = reservesData.find(
                (r) => r.symbol === token?.symbol,
              );

              if (!token || !reserve) return null;
              const tokenBalance = BigNumber(borrow.scaledVariableDebt).div(
                10 ** token.decimals,
              );

              const tokenPrice = tokensPrice.find(
                (t) => t.symbol === token.symbol,
              )?.price;
              const balanceUSD = tokenBalance.multipliedBy(tokenPrice ?? "0");

              const borowAPY = BigNumber(reserve.variableBorrowRate)
                .div(10 ** 27)
                .times(100)
                .toFixed(2);

              return (
                <div key={token.name} className="flex p-4">
                  <div className="flex w-full max-w-32.5 min-w-17.5 items-center gap-2.5">
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
                      <p>{formatTokenValue(tokenBalance)}</p>
                      <p className="text-tertiary text-xs">
                        ${formatTokenValue(balanceUSD)}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full min-w-17.5 items-center justify-center text-center">
                    <p>
                      {borowAPY}
                      <span className="text-tertiary">%</span>
                    </p>
                  </div>
                  <div className="flex w-full max-w-40 min-w-40 items-center justify-end gap-2">
                    {/* <Button
                      variant="secondary"
                      className="!py-2"
                      onClick={() => {
                        openBorrow();
                        updateTokenData(token);
                      }}
                    >
                      Borrow
                    </Button> */}
                    <Button
                      variant="secondary"
                      className="w-full !py-2"
                      onClick={() => {
                        openRepay();
                        updateTokenData(token);
                      }}
                    >
                      Repay
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="border-elevated flex items-center justify-center border-t py-10">
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold">No borrowed assets</p>
            <p className="text-tertiary mb-2 text-sm font-medium">
              You have no borrowed assets.
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default BorrowedPositions;
