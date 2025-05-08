"use client";
import React, { useState } from "react";

import { TabPanel } from "@headlessui/react";

import TabMenu from "@/components/TabMenu/TabMenu";

const DashboardTabMenu = [
  { label: "Supply" },
  { label: "Borrow" },
  { label: "Transactions" },
];

const DashboardMenu = () => {
  const [menu, setMenu] = useState(0);

  return (
    <div className="">
      <TabMenu
        tabs={DashboardTabMenu.map((v) => v.label)}
        onChange={setMenu}
        currentIndex={menu}
        tabListClassName="sm:w-[500px] w-full"
        tabPanelsClassName="py-6"
      >
        <TabPanel>Supply</TabPanel>
        <TabPanel>Borrow</TabPanel>
        <TabPanel>Transactions</TabPanel>
      </TabMenu>
    </div>
  );
};

export default DashboardMenu;
