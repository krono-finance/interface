"use client";
import React, { ReactNode, useEffect } from "react";

import { useRootStore } from "@/store/root";
import { IToken } from "@/types";

interface ReserveDataWrapper {
  token: IToken;
  children: ReactNode;
}

const ReserveDataWrapper = ({ children, token }: ReserveDataWrapper) => {
  const updateTokenData = useRootStore((state) => state.updateTokenData);

  useEffect(() => {
    updateTokenData(token);
  }, [token, updateTokenData]);

  return <div className="pb-12">{children}</div>;
};

export default ReserveDataWrapper;
