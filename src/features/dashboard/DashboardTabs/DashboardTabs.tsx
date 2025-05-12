"use client";
import React, { useState } from "react";

import { TabPanel } from "@headlessui/react";
import { Address } from "viem";
import { useAccount } from "wagmi";

import TabMenu from "@/components/TabMenu/TabMenu";
import { POOL_TOKENS } from "@/constant/poolTokenData";
import { useWalletBalance } from "@/hooks/useWalletBalanceProvider";

import BorrowedPositions from "./BorrowedPositions";
import SuppliedPositions from "./SuppliedPositions";
import TransactionsHistory from "./TransactionsHistory";

const DashboardTabsMenu = [{ label: "Portfolio" }, { label: "Transactions" }];

const DashboardTabs = () => {
  const [menu, setMenu] = useState(0);

  const { address } = useAccount();
  const { data } = useWalletBalance(
    address as Address,
    POOL_TOKENS.usdc.address as Address,
  );

  console.log(data);

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
        <TabPanel as="div" className="grid gap-5 xl:grid-cols-2">
          <SuppliedPositions />
          <BorrowedPositions />
        </TabPanel>
        <TabPanel>
          <TransactionsHistory />
        </TabPanel>
      </TabMenu>
    </div>
  );
};

export default DashboardTabs;
