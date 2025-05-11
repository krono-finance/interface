import React from "react";

import { notFound } from "next/navigation";

import { getTokenByAddress } from "@/constant/poolTokenData";
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
    <div className="pb-12">
      <ReserveHeader token={token} />
      <ReserveStatusConfig />
    </div>
  );
};

export default ReserveOverviewPage;
