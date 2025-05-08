import { ReactNode } from "react";

export interface TabMenuProps {
  /** to define header */
  tabs: string[];
  /** define tab content as list of Tab.Panels component
   * @example
   * ```js
   * <TabMenu>
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
   * </TabMenu>
   * ```
   */
  children: ReactNode;
  /** to listen change of the tabs */
  // eslint-disable-next-line no-unused-vars
  onChange?(index: number): void;
  defaultTabIndex?: number;
  /** only use this if want to make Controlled Tab */
  currentIndex?: number;
  className?: string;
  tabListClassName?: string;
  tabItemClassName?: string;
  tabPanelsClassName?: string;
  activeTabItemClassName?: string;
}
