"use client";
import { useState } from "react";

import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";
import classNames from "classnames";

import { TabMenuProps } from "./types";

const TabMenu = ({
  tabs,
  children,
  className,
  defaultTabIndex = 0,
  tabListClassName,
  tabItemClassName,
  tabPanelsClassName,
  currentIndex,
  onChange,
}: TabMenuProps) => {
  const [index, setIndex] = useState(defaultTabIndex);

  const usedIndex = currentIndex === undefined ? index : currentIndex;

  return (
    <TabGroup
      selectedIndex={usedIndex}
      defaultIndex={defaultTabIndex}
      onChange={(i) => {
        if (currentIndex === undefined) {
          setIndex(i);
        }
        onChange?.(i);
      }}
    >
      <div className={classNames("border-elevated border-b-2", className)}>
        <TabList className={classNames("relative", tabListClassName)}>
          {tabs.map((tab) => {
            return (
              <Tab
                key={tab}
                className={classNames(
                  "hover:text-primary py-5 font-medium outline-none",
                  tabItemClassName,
                  tab === tabs[usedIndex] ? "text-primary" : "text-tertiary",
                )}
                style={{
                  width: `${100 / tabs?.length}%`,
                }}
              >
                <div>{tab}</div>
              </Tab>
            );
          })}
          <div
            className={classNames(
              "bg-accent absolute -bottom-0.5 h-0.5 transition-all duration-300 ease-in-out",
            )}
            style={{
              width: `${100 / tabs?.length}%`,
              left: `${usedIndex * (100 / tabs?.length)}%`,
            }}
          />
        </TabList>
      </div>
      <TabPanels className={tabPanelsClassName}>{children}</TabPanels>
    </TabGroup>
  );
};

export default TabMenu;
