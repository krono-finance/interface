import React from "react";

import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button/Button";
import { useReserveMetrics } from "@/hooks/useReserveMetrics";
import { formatTokenValue } from "@/lib/utils";
import { IReserve, IToken, ITokenPrice } from "@/types";

interface LendingAssetCardProps {
  reserve: IReserve;
  tokensPrice: ITokenPrice[];
  token: IToken;
}

const LendingAssetCard = ({
  reserve,
  token,
  tokensPrice,
}: LendingAssetCardProps) => {
  const tokenPrice = tokensPrice.find(
    (t) => t.symbol === reserve.symbol,
  )?.price;
  const {
    totalSupply,
    totalBorrow,
    supplyAPY,
    borrowAPY,
    supplyInUSD,
    borrowInUSD,
  } = useReserveMetrics(reserve, tokenPrice);

  return (
    <div className="border-elevated bg-surface space-y-5 border border-b-0 p-4 pb-6 first:rounded-t-xl last:rounded-b-xl last:border-b sm:rounded-xl">
      <div className="flex items-center gap-2">
        <Image src={token.image} alt={token.name} width={40} height={40} />
        <div className="flex flex-col">
          <span className="font-semibold">{token.name}</span>
          <span className="text-tertiary text-sm font-medium">
            {token.symbol}
          </span>
        </div>
      </div>

      <div className="bg-background border-elevated space-y-3 rounded-lg border p-4">
        <div className="flex justify-between gap-2">
          <span className="text-secondary text-sm">Total supply</span>
          <div className="flex flex-col text-end">
            <span className="font-semibold">
              {formatTokenValue(totalSupply)} {token.symbol}
            </span>
            <span className="text-tertiary text-sm">
              ${formatTokenValue(supplyInUSD)}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-secondary text-sm">Supply APY</span>
          <span className="font-semibold">
            {supplyAPY}
            <span className="text-secondary">%</span>
          </span>
        </div>
        <div className="bg-elevated h-[1px] w-full"></div>
        <div className="flex justify-between gap-2">
          <span className="text-secondary text-sm">Total borrow</span>
          <div className="flex flex-col text-end">
            <span className="font-semibold">
              {formatTokenValue(totalBorrow)} {token.symbol}
            </span>
            <span className="text-tertiary text-sm">
              ${formatTokenValue(borrowInUSD)}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-secondary text-sm">Borrow APY</span>
          <span className="font-semibold">
            {borrowAPY}
            <span className="text-secondary">%</span>
          </span>
        </div>
      </div>

      <Link href={`/reserve/${reserve.underlyingAsset}`}>
        <Button className="w-full">View Details</Button>
      </Link>
    </div>
  );
};

export default LendingAssetCard;
