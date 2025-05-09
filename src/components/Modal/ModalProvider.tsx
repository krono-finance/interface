"use client";
import React from "react";

import dynamic from "next/dynamic";

const SupplyModal = dynamic(() =>
  import("../Transactions/SupplyModal").then((module) => module.default),
);

const ModalProvider = () => {
  return (
    <>
      <SupplyModal />
    </>
  );
};

export default ModalProvider;
