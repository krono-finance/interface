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
  const updateCurrentReserve = useRootStore(
    (state) => state.updateCurrentReserve,
  );
  const reservesData = useRootStore((state) => state.reservesData);

  useEffect(() => {
    updateTokenData(token);
  }, [token, updateTokenData]);

  useEffect(() => {
    const reserve = reservesData.find(
      (reserve) =>
        reserve.underlyingAsset.toLowerCase() === token.address.toLowerCase(),
    );
    if (reserve) {
      updateCurrentReserve(reserve);
    }
  }, [reservesData, token.address, updateCurrentReserve]);

  return <div className="pb-12">{children}</div>;
};

export default ReserveDataWrapper;
