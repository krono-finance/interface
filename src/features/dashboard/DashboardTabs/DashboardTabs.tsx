"use client";
import React, { useState } from "react";

import { TabPanel } from "@headlessui/react";
import { useAccount } from "wagmi";

import TabMenu from "@/components/TabMenu/TabMenu";
import CustomConnectButton from "@/components/Web3Provider/CustomConnectButton";

import BorrowedPositions from "./BorrowedPositions";
import SuppliedPositions from "./SuppliedPositions";
import TransactionsHistory from "./TransactionsHistory";

const DashboardTabsMenu = [{ label: "Portfolio" }, { label: "Transactions" }];

const DashboardTabs = () => {
  const { isConnected } = useAccount();

  const [menu, setMenu] = useState(0);

  return (
    <div className="">
      <TabMenu
        tabs={DashboardTabsMenu.map((v) => v.label)}
        onChange={setMenu}
        currentIndex={menu}
        tabListClassName="sm:w-[500px] w-full"
        tabPanelsClassName="py-6"
        tabItemClassName="!py-3 md:!py-5"
      >
        {isConnected ? (
          <TabPanel as="div" className="grid gap-5 xl:grid-cols-2">
            <SuppliedPositions />
            <BorrowedPositions />
          </TabPanel>
        ) : (
          <TabPanel
            as="div"
            className="bg-surface border-elevated flex h-[500px] w-full items-center justify-center rounded-xl border"
          >
            <div className="flex flex-col items-center gap-1">
              <p className="text-2xl font-semibold">
                Please, connect your wallet
              </p>
              <p className="text-tertiary mb-2 font-medium">
                Connect your wallet to see your supplies, borrowings, and open
                positions.
              </p>
              <CustomConnectButton />
            </div>
          </TabPanel>
        )}

        <TabPanel>
          <TransactionsHistory />
        </TabPanel>
      </TabMenu>
    </div>
  );
};

export default DashboardTabs;
