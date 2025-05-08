import React from "react";

import DashboardHeader from "@/features/dashboard/DashboardHeader/DashboardHeader";
import DashboardTabs from "@/features/dashboard/DashboardTabs/DashboardTabs";

const DashboardPage = () => {
  return (
    <>
      <DashboardHeader />
      <DashboardTabs />
    </>
  );
};

export default DashboardPage;
