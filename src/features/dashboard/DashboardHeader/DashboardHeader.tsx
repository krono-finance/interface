import React from "react";

import Image from "next/image";

const DashboardHeader = () => {
  const headerData = [
    {
      title: "Net worth",
      value: (
        <p className="xs:text-xl space-x-0.5 text-lg">
          <span className="text-tertiary">$</span>
          <span>22.55K</span>
        </p>
      ),
    },
    {
      title: "Net APY",
      value: (
        <p className="xs:text-xl space-x-0.5 text-lg">
          <span>2.55</span>
          <span className="text-tertiary">%</span>
        </p>
      ),
    },
    {
      title: "Health factor",
      value: (
        <p className="xs:text-xl text-warning space-x-0.5 text-lg">1.55</p>
      ),
    },
  ];

  return (
    <header className="xs:mb-12 my-8 space-y-5 lg:mt-16 lg:flex lg:items-center lg:justify-between">
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
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Your Portfolio
            </h1>
            <p className="text-tertiary text-sm sm:text-[15px]">Lisk</p>
          </div>
        </div>
      </div>
      <div className="xs:flex xs:flex-wrap grid grid-cols-2 items-center gap-x-10 gap-y-5 font-semibold">
        {headerData.map((data) => (
          <div key={data.title} className="space-y-1">
            <div className="text-tertiary text-[15px] sm:text-base">
              {data.title}
            </div>
            {data.value}
          </div>
        ))}
      </div>
    </header>
  );
};

export default DashboardHeader;
