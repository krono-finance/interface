import React, { useState } from "react";

import { TabPanel } from "@headlessui/react";

import TabMenu from "@/components/TabMenu/TabMenu";

import BorrowInfoPanel from "./BorrowInfoPanel";
import SupplyBorrowPanel from "./SupplyBorrowPanel";
import SupplyInfoPanel from "./SupplyInfoPanel";

const ReserveTabsMenu = [{ label: "Supply/Borrow" }, { label: "Overview" }];

const ReserveTabs = () => {
  const [menu, setMenu] = useState(0);

  return (
    <div className="-mt-4">
      <TabMenu
        tabs={ReserveTabsMenu.map((v) => v.label)}
        onChange={setMenu}
        currentIndex={menu}
        tabListClassName="sm:w-[500px] w-full"
        tabPanelsClassName="py-6"
        tabItemClassName="!py-3"
      >
        <TabPanel>
          <SupplyBorrowPanel />
        </TabPanel>
        <TabPanel as="div" className={"space-y-3"}>
          <SupplyInfoPanel />
          <BorrowInfoPanel />
        </TabPanel>
      </TabMenu>
    </div>
  );
};

export default ReserveTabs;
