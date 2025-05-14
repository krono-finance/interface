import React from "react";

import Image from "next/image";
import Link from "next/link";

import CircularProgressBar from "@/components/Progress/CircularProgressBar";
import useMarketData from "@/hooks/useMarketData";
import { formatTokenValue } from "@/lib/utils";
import { IReserve, IToken, ITokenPrice } from "@/types";

interface LendingAssetRowProps {
  reserve: IReserve;
  tokensPrice: ITokenPrice[];
  token: IToken;
  headers: {
    label: string;
    minWidth: number;
  }[];
}

const LendingAssetRow = ({
  reserve,
  tokensPrice,
  headers,
  token,
}: LendingAssetRowProps) => {
  const tokenPrice = tokensPrice.find(
    (t) => t.symbol === reserve.symbol,
  )?.price;
  const {
    totalSupply,
    totalBorrow,
    utilization,
    ltv,
    supplyAPY,
    borrowAPY,
    supplyInUSD,
    borrowInUSD,
  } = useMarketData(reserve, tokenPrice);

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
        <Image src={token.image} alt={token.name} width={36} height={36} />
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
        <p className="font-semibold">{formatTokenValue(totalSupply)}</p>
        <p className="text-tertiary text-xs font-medium">
          ${formatTokenValue(supplyInUSD)}
        </p>
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
        <p className="font-semibold">{formatTokenValue(totalBorrow)}</p>
        <p className="text-tertiary text-xs font-medium">
          ${formatTokenValue(borrowInUSD)}
        </p>
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
          <CircularProgressBar size={24} percentage={Number(utilization)} />
        </div>
        <p className="font-semibold">
          {utilization}
          <span className="text-tertiary font-medium">%</span>
        </p>
      </div>
    </Link>
  );
};

export default LendingAssetRow;
