import React from "react";

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
    <header className="xs:mb-12 my-8 items-center justify-between space-y-4 md:flex lg:my-16">
      <div className="">
        <h1 className="text-[32px] font-bold">Markets</h1>
        <p className="text-tertiary">
          Lend and borrow assets with competitive yields.
        </p>
      </div>
      <div className="xs:flex xs:flex-wrap grid grid-cols-2 items-center gap-2 font-semibold">
        {marketsData.map((data) => (
          <div
            key={data.title}
            className="border-elevated space-y-1 rounded-lg border px-3 py-2 md:text-end"
          >
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
