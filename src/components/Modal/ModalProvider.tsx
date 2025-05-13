"use client";
import React from "react";

import dynamic from "next/dynamic";

const SupplyModal = dynamic(() =>
  import("../Transactions/SupplyModal").then((module) => module.default),
);
const WithdrawModal = dynamic(() =>
  import("../Transactions/WithdrawModal").then((module) => module.default),
);
const RepayModal = dynamic(() =>
  import("../Transactions/RepayModal").then((module) => module.default),
);

const ModalProvider = () => {
  return (
    <>
      <SupplyModal />
      <WithdrawModal />
      <RepayModal />
    </>
  );
};

export default ModalProvider;
