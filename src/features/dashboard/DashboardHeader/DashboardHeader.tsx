"use client";
import React from "react";

import Image from "next/image";

import BigNumber from "bignumber.js";
import classNames from "classnames";
import { useAccount } from "wagmi";

import useUserData from "@/hooks/useUserData";
import { formatTokenValue } from "@/lib/utils";

const DashboardHeader = () => {
  const { address } = useAccount();

  const { data } = useUserData(address);

  const headerData = [
    {
      title: "Supply",
      value: (
        <p className="xs:text-xl space-x-0.5 text-lg">
          <span className="text-tertiary">$</span>
          <span>
            {formatTokenValue(data ? data.totalSupplyUSD : BigNumber("0"))}
          </span>
        </p>
      ),
    },
    {
      title: "Debt",
      value: (
        <p className="xs:text-xl space-x-0.5 text-lg">
          <span className="text-tertiary">$</span>
          <span>
            {formatTokenValue(data ? data.totalBorrowUSD : BigNumber("0"))}
          </span>
        </p>
      ),
    },
    // {
    //   title: "Net worth",
    //   value: (
    //     <p className="xs:text-xl space-x-0.5 text-lg">
    //       <span className="text-tertiary">$</span>
    //       <span>22.55K</span>
    //     </p>
    //   ),
    // },
    // {
    //   title: "Net APY",
    //   value: (
    //     <p className="xs:text-xl space-x-0.5 text-lg">
    //       <span>2.55</span>
    //       <span className="text-tertiary">%</span>
    //     </p>
    //   ),
    // },
    {
      title: "Health factor",
      value: (
        <p
          className={classNames(
            "xs:text-xl space-x-0.5 text-lg",
            !data
              ? ""
              : data.userAccountData.totalDebtETH === BigInt(0)
                ? "text-success"
                : BigNumber(data.userAccountData.healthFactor.toString())
                      .div(10 ** 18)
                      .isGreaterThan(1.5)
                  ? "text-success"
                  : BigNumber(data.userAccountData.healthFactor.toString())
                        .div(10 ** 18)
                        .isGreaterThan(1.0)
                    ? "text-warning"
                    : "text-error",
          )}
        >
          {data && data.userAccountData.totalDebtETH === BigInt(0)
            ? "∞"
            : data &&
              BigNumber(data.userAccountData.healthFactor.toString())
                .div(10 ** 18)
                .toFormat(2)}
          {!data && "∞"}
        </p>
      ),
    },
  ];

  return (
    <header className="xs:mt-12 xs:mb-8 mt-8 mb-6 space-y-5 lg:flex lg:items-center lg:justify-between">
      <div className="">
        <div className="flex items-center gap-2">
          <Image
            src={"/logos/lisk-profile-w.svg"}
            alt="Lisk"
            width={64}
            height={64}
            className="size-12 xl:size-13"
          />
          <div className="pt-1">
            <h1 className="text-2xl font-semibold sm:text-3xl">Dashboard</h1>
            <p className="text-tertiary text-sm sm:text-[15px]">Lisk Sepolia</p>
          </div>
        </div>
      </div>
      <div className="xs:flex xs:flex-wrap grid grid-cols-2 items-center gap-x-10 gap-y-5 font-semibold">
        {headerData.map((data) => (
          <div key={data.title} className="space-y-1">
            <div className="text-tertiary text-[15px] sm:text-base">
              {data.title}
            </div>
            {data.value}
          </div>
        ))}
      </div>
    </header>
  );
};

export default DashboardHeader;
