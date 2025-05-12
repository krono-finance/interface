import React from "react";

import { notFound } from "next/navigation";

import { getTokenByAddress } from "@/constant/poolTokenData";
import ReserveDataWrapper from "@/features/reserve/ReserveDataWrapper/ReserveDataWrapper";
import ReserveHeader from "@/features/reserve/ReserveHeader/ReserveHeader";
import ReserveStatusConfig from "@/features/reserve/ReserveStatusConfig/ReserveStatusConfig";

const ReserveOverviewPage = async ({
  params,
}: {
  params: Promise<{ tokenaddr: string }>;
}) => {
  const { tokenaddr } = await params;

  const token = getTokenByAddress(tokenaddr);

  if (!token) {
    notFound();
  }

  return (
    <ReserveDataWrapper token={token}>
      <ReserveHeader />
      <ReserveStatusConfig />
    </ReserveDataWrapper>
  );
};

export default ReserveOverviewPage;
