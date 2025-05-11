import React from "react";

import Image from "next/image";

const MarketsHeader = () => {
  const marketsData = [
    {
      title: "Total supply",
      value: "122.35M",
    },
    {
      title: "Total borrow",
      value: "57.10M",
    },
    {
      title: "Total available",
      value: "65.25M",
    },
  ];

  return (
    <header className="xs:my-12 my-8 space-y-5 lg:flex lg:items-center lg:justify-between">
      <div className="">
        <div className="flex items-center gap-2">
          <Image
            src={"/logos/lisk-profile-w.svg"}
            alt="Lisk"
            width={64}
            height={64}
            className="size-12 xl:size-13"
          />
          <div className="pt-1">
            <h1 className="text-2xl font-semibold sm:text-3xl">Lisk Market</h1>
            <p className="text-tertiary text-sm sm:text-[15px]">
              Lend and borrow assets with competitive yields.
            </p>
          </div>
        </div>
      </div>
      <div className="xs:flex xs:flex-wrap grid grid-cols-2 items-center gap-x-10 gap-y-5 font-semibold">
        {marketsData.map((data) => (
          <div key={data.title} className="space-y-1">
            <div className="text-tertiary text-[15px] sm:text-base">
              {data.title}
            </div>
            <p className="xs:text-xl space-x-0.5 text-lg">
              <span className="text-tertiary">$</span>
              <span>{data.value}</span>
            </p>
          </div>
        ))}
      </div>
    </header>
  );
};

export default MarketsHeader;
