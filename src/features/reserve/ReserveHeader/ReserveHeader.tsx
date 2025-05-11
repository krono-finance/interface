import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button/Button";
import { IToken } from "@/types";

interface ReserveHeaderProps {
  token: IToken;
}

const ReserveHeader = ({ token }: ReserveHeaderProps) => {
  return (
    <div className="xs:my-12 my-8 space-y-6">
      <div className="flex items-center gap-3.5">
        <Link href={"/markets"}>
          <Button variant="secondary" className="gap-2.5">
            <FaArrowLeftLong className="mt-0.5" />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-1.5">
          <Image
            src={"/logos/lisk-profile-w.svg"}
            alt="Lisk"
            width={64}
            height={64}
            className="size-5"
          />
          <span className="mt-0.5 font-semibold">Lisk Market</span>
        </div>
      </div>

      <div className="space-y-4 lg:flex lg:items-center lg:space-y-0">
        <div className="flex gap-3 pr-7">
          <Image
            src={token.image}
            alt={token.name}
            width={64}
            height={64}
            className="xs:size-12 size-10"
          />
          <div>
            <p className="text-tertiary xs:text-sm text-xs">{token.symbol}</p>
            <p className="xs:text-2xl text-xl font-bold">{token.name}</p>
          </div>
        </div>

        <div className="bg-elevated hidden h-11 w-0.25 lg:block" />

        <div className="grid grid-cols-2 gap-3 md:flex md:gap-6 lg:pl-7">
          <div id="total-supply">
            <div className="text-tertiary xs:text-base text-sm">
              Total supply
            </div>
            <p className="xs:text-xl space-x-0.5 text-lg font-semibold">
              <span className="text-tertiary">$</span>
              <span>150.45K</span>
            </p>
          </div>
          <div id="available-liquidity">
            <div className="text-tertiary xs:text-base text-sm">
              Available liquidity
            </div>
            <p className="xs:text-xl space-x-0.5 text-lg font-semibold">
              <span className="text-tertiary">$</span>
              <span>50.45K</span>
            </p>
          </div>
          <div id="utilization-rate">
            <div className="text-tertiary xs:text-base text-sm">
              Utilization rate
            </div>
            <p className="xs:text-xl space-x-0.5 text-lg font-semibold">
              <span>63.55</span>
              <span className="text-tertiary">%</span>
            </p>
          </div>
          <div id="oracle-price">
            <div className="text-tertiary xs:text-base text-sm">
              Oracle price
            </div>
            <p className="xs:text-xl space-x-0.5 text-lg font-semibold">
              <span className="text-tertiary">$</span>
              <span>1.00</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveHeader;
