"use client";
import React from "react";

import { useShallow } from "zustand/shallow";

import { getTokenByAddress } from "@/constant/poolTokenData";
import useWindowSize from "@/hooks/useWindowSize";
import { useRootStore } from "@/store/root";

import LendingAssetCard from "./LendingAssetCard";
import LendingAssetRow from "./LendingAssetRow";

const LendingAssets = () => {
  const [tokensPrice, reservesData] = useRootStore(
    useShallow((state) => [state.tokensPrice, state.reservesData]),
  );
  const { isLaptop } = useWindowSize();

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
    <>
      {isLaptop ? (
        <div className="mb-12 grid sm:grid-cols-1 sm:gap-4">
          {reservesData.map((reserve) => {
            const token = getTokenByAddress(reserve.underlyingAsset);
            if (!token) return <></>;

            return (
              <LendingAssetCard
                key={token.symbol}
                reserve={reserve}
                token={token}
                tokensPrice={tokensPrice}
              />
            );
          })}
        </div>
      ) : (
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
          <div className="divide-elevated divide-y">
            {reservesData.map((reserve) => {
              const token = getTokenByAddress(reserve.underlyingAsset);
              if (!token) return <></>;

              return (
                <LendingAssetRow
                  key={token.symbol}
                  headers={headers}
                  reserve={reserve}
                  token={token}
                  tokensPrice={tokensPrice}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default LendingAssets;
