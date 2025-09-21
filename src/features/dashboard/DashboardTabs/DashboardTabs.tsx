"use client";
import React from "react";

import { useAccount } from "wagmi";

import CustomConnectButton from "@/components/Web3Provider/CustomConnectButton";

import BorrowedPositions from "./BorrowedPositions";
import SuppliedPositions from "./SuppliedPositions";

// const DashboardTabsMenu = [{ label: "Portfolio" }, { label: "Transactions" }];

const DashboardTabs = () => {
  const { isConnected } = useAccount();

  // const [menu, setMenu] = useState(0);

  return (
    <div className="">
      {isConnected ? (
        <div className="grid gap-5 xl:grid-cols-2">
          <SuppliedPositions />
          <BorrowedPositions />
        </div>
      ) : (
        <div className="bg-surface border-elevated flex h-[270px] w-full items-center justify-center rounded-xl border sm:h-[500px]">
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-lg font-semibold sm:text-2xl">
              Please, connect your wallet
            </p>
            <p className="text-tertiary mb-2 text-sm font-medium sm:text-base">
              Connect your wallet to see your supplies, borrowings, and open
              positions.
            </p>
            <CustomConnectButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTabs;
