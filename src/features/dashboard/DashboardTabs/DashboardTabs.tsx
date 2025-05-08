"use client";
import React, { useState } from "react";

import { TabPanel } from "@headlessui/react";

import TabMenu from "@/components/TabMenu/TabMenu";

import BorrowedPositions from "./BorrowedPositions";
import SuppliedPositions from "./SuppliedPositions";
import TransactionsHistory from "./TransactionsHistory";

const DashboardTabsMenu = [{ label: "Portfolio" }, { label: "Transactions" }];

const DashboardTabs = () => {
  const [menu, setMenu] = useState(0);

  return (
    <div className="">
      <TabMenu
        tabs={DashboardTabsMenu.map((v) => v.label)}
        onChange={setMenu}
        currentIndex={menu}
        tabListClassName="sm:w-[500px] w-full"
        tabPanelsClassName="py-6"
      >
        <TabPanel as="div" className="grid grid-cols-2 gap-5">
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
