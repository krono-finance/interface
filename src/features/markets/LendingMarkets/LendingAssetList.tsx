import React from "react";

import Image from "next/image";
import Link from "next/link";

import BigNumber from "bignumber.js";

import CircularProgressBar from "@/components/Progress/CircularProgressBar";
import { getTokenByAddress } from "@/constant/poolTokenData";
import { IReserve } from "@/types";

export interface LendingAssetProps {
  reserves: IReserve[];
  isLoading: boolean;
}

const LendingAssetList = ({ reserves, isLoading }: LendingAssetProps) => {
  const headers = [
    { label: "Asset", minWidth: 250 },
    { label: "LTV", minWidth: 100 },
    { label: "Total supply", minWidth: 150 },
    { label: "Supply APY", minWidth: 100 },
    { label: "Total borrow", minWidth: 150 },
    { label: "Borrow APY", minWidth: 100 },
    { label: "Utilization", minWidth: 100 },
  ];

  return (
    <div className="border-elevated mb-12 overflow-hidden rounded-xl border sm:mb-20">
      <header className="bg-surface border-b-elevated text-tertiary flex w-full rounded-t-xl border-b py-4 text-sm font-medium">
        {headers.map((head, index) => (
          <div
            style={{ minWidth: head.minWidth }}
            key={index}
            className="flex w-full items-center justify-center px-6 first:justify-start last:justify-end"
          >
            {head.label}
          </div>
        ))}
      </header>
      {isLoading ? (
        <>Loading</>
      ) : (
        <div className="divide-elevated divide-y">
          {reserves.map((reserve) => {
            const token = getTokenByAddress(reserve.underlyingAsset);
            if (!token) return <></>;

            const debt = BigNumber(reserve.totalScaledVariableDebt ?? "0");
            const liquidity = BigNumber(reserve.availableLiquidity ?? "0");
            const total = debt.plus(liquidity);
            const utilization = total.isZero()
              ? "0.00"
              : debt.div(total).times(100).toFixed(2);

            const totalSupply = BigNumber(reserve.availableLiquidity)
              .plus(reserve.totalScaledVariableDebt)
              .div(10 ** token.decimals)
              .toFormat();

            const totalBorrow = BigNumber(reserve.totalScaledVariableDebt)
              .div(10 ** token.decimals)
              .toFormat(0);

            const ltv = BigNumber(reserve.baseLTVasCollateral)
              .div(100)
              .toFixed(2);

            const supplyAPY = BigNumber(reserve.liquidityRate)
              .div(10 ** 27)
              .multipliedBy(100)
              .toFixed(2);

            const borrowAPY = BigNumber(reserve.variableBorrowRate)
              .div(10 ** 27)
              .multipliedBy(100)
              .toFixed(2);

            return (
              <Link
                key={reserve.symbol}
                href={`/reserve/${reserve.underlyingAsset}`}
                className="hover:bg-surface-hover flex w-full cursor-pointer items-center"
              >
                {/* Asset */}
                <div
                  className="flex h-20 w-full items-center gap-3 px-6"
                  style={{ minWidth: headers[0].minWidth }}
                >
                  <Image
                    src={token.image}
                    alt={token.name}
                    width={36}
                    height={36}
                  />
                  <div>
                    <p className="font-semibold">{token.name}</p>
                    <p className="text-tertiary text-sm">{token.symbol}</p>
                  </div>
                </div>

                {/* LTV */}
                <div
                  className="flex h-20 w-full items-center justify-center px-6 font-semibold"
                  style={{ minWidth: headers[1].minWidth }}
                >
                  <p>
                    {ltv}
                    <span className="text-tertiary font-medium">%</span>
                  </p>
                </div>

                {/* Total supply */}
                <div
                  className="flex h-20 w-full flex-col items-center justify-center gap-0.5 px-6"
                  style={{ minWidth: headers[2].minWidth }}
                >
                  <p className="font-semibold">{totalSupply}</p>
                  <p className="text-tertiary text-xs font-medium">$-</p>
                </div>

                {/* Supply APY */}
                <div
                  className="flex h-20 w-full items-center justify-center px-6 font-semibold"
                  style={{ minWidth: headers[3].minWidth }}
                >
                  <p>
                    {supplyAPY}
                    <span className="text-tertiary font-medium">%</span>
                  </p>
                </div>

                {/* Total borrow */}
                <div
                  className="flex h-20 w-full flex-col items-center justify-center gap-0.5 px-6"
                  style={{ minWidth: headers[4].minWidth }}
                >
                  <p className="font-semibold">{totalBorrow}</p>
                  <p className="text-tertiary text-xs font-medium">$-</p>
                </div>

                {/* Borrow APY */}
                <div
                  className="flex h-20 w-full items-center justify-center px-6 font-semibold"
                  style={{ minWidth: headers[5].minWidth }}
                >
                  <p>
                    {borrowAPY}
                    <span className="text-tertiary font-medium">%</span>
                  </p>
                </div>

                {/* Utilization */}
                <div
                  className="flex h-20 w-full items-center justify-end gap-2 px-6"
                  style={{ minWidth: headers[6].minWidth }}
                >
                  <div className="pt-0.5">
                    <CircularProgressBar
                      size={24}
                      percentage={Number(utilization)}
                    />
                  </div>
                  <p className="font-semibold">
                    {utilization}
                    <span className="text-tertiary font-medium">%</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LendingAssetList;
