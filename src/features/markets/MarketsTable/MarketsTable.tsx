"use client";
import React from "react";

import Image from "next/image";

import CircularProgressBar from "@/components/Progress/CircularProgressBar";
import CustomTable from "@/components/Table/TableCustom";
import { ColumnType } from "@/components/Table/types";
import { IToken, poolList } from "@/constant/poolTokenData";

const MarketsTable = () => {
  const marketColumns: ColumnType<any>[] = [
    {
      key: "asset",
      label: "Asset",
      width: 240,
      headerClassName: "text-left",
      className: "justify-start",
      customRender(value, rowData) {
        const token = rowData as IToken;

        return (
          <div className="flex items-center gap-2">
            <Image src={token.image} alt={token.name} width={32} height={32} />
            <div>
              <p className="font-semibold">{token.name}</p>
              <p className="text-tertiary text-sm">{token.symbol}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: "ltv",
      label: "LTV",
      width: 160,
      customRender() {
        return (
          <div className="flex items-center justify-center font-semibold">
            <p>
              80<span className="text-tertiary font-medium">%</span>
            </p>
          </div>
        );
      },
    },
    {
      key: "totalSupply",
      label: "Total supply",
      width: 255,
      customRender() {
        return (
          <div className="flex flex-col items-center justify-center gap-0.5">
            <p className="font-semibold">155.45K</p>
            <p className="text-tertiary text-xs font-medium">$125.65K</p>
          </div>
        );
      },
    },
    {
      key: "supplyAPY",
      label: "Supply APY",
      width: 165,
      customRender() {
        return (
          <div className="flex items-center justify-center font-semibold">
            <p>
              6.25<span className="text-tertiary font-medium">%</span>
            </p>
          </div>
        );
      },
    },
    {
      key: "totalBorrow",
      label: "Total borrow",
      width: 255,
      customRender() {
        return (
          <div className="flex flex-col items-center justify-center gap-0.5">
            <p className="font-semibold">155.45K</p>
            <p className="text-tertiary text-xs font-medium">$125.65K</p>
          </div>
        );
      },
    },
    {
      key: "borrowAPY",
      label: "Borrow APY",
      width: 165,
      customRender() {
        return (
          <div className="flex items-center justify-center font-semibold">
            <p>
              8.50<span className="text-tertiary font-medium">%</span>
            </p>
          </div>
        );
      },
    },

    {
      key: "utilization",
      label: "Utilization",
      width: 198,
      headerClassName: "text-right",
      className: "justify-end",
      customRender() {
        return (
          <div className="flex items-center justify-end gap-2">
            <CircularProgressBar percentage={45.5} />
            <p className="font-semibold">
              45.50<span className="text-tertiary font-medium">%</span>
            </p>
          </div>
        );
      },
    },
  ];

  return (
    <div className="mb-12 sm:mb-20">
      <CustomTable
        columns={marketColumns}
        data={poolList ?? []}
        wrapperClassName="max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-60px)]"
        rowKey="name"
        headerHeight={52}
        theadClassName="bg-surface text-[13px]"
        tbodyClassName=""
        trHeaderClassName="border-b border-elevated"
        rowHeight={80}
        link="/markets"
      />
    </div>
  );
};

export default MarketsTable;
