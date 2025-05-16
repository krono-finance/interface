"use client";
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { INTEREST_RATE_STRATEGY } from "@/constant/poolTokenData";
import useReserveMetrics from "@/hooks/useReserveMetrics";
import { IInterestRateStrategy } from "@/types";

type DataPoint = {
  utilization: string;
  borrowRate: number;
  supplyRate: number;
};

const generateInterestRateModelData = ({
  optimalUtilization,
  baseRate,
  slope1,
  slope2,
  reserveFactor,
}: IInterestRateStrategy): DataPoint[] => {
  const data: DataPoint[] = [];

  // Generate data points at 1% intervals
  for (let i = 0; i <= 100; i++) {
    const utilization = i / 100;

    // Calculate borrow rate based on the dual-slope model
    let borrowRate: number;
    if (utilization <= optimalUtilization) {
      // First slope region (normal utilization)
      borrowRate = baseRate + slope1 * (utilization / optimalUtilization);
    } else {
      // Second slope region (high utilization)
      borrowRate =
        baseRate +
        slope1 +
        slope2 *
          ((utilization - optimalUtilization) / (1 - optimalUtilization));
    }

    // Calculate supply rate with reserve factor
    const supplyRate = utilization * borrowRate * (1 - reserveFactor);

    // Format and add data point
    data.push({
      utilization: (utilization * 100).toFixed(2),
      borrowRate: parseFloat((borrowRate * 100).toFixed(2)),
      supplyRate: parseFloat((supplyRate * 100).toFixed(2)),
    });
  }

  return data;
};

export default function InterestRateChart() {
  const reserve = useReserveMetrics();

  if (!reserve) return null;

  const interesetRateStrategy =
    INTEREST_RATE_STRATEGY[
      reserve.tokenData.symbol.toLowerCase() as keyof typeof INTEREST_RATE_STRATEGY
    ];

  const currentUtilization = reserve.utilization;

  const { optimalUtilization, baseRate, slope1, slope2, reserveFactor } =
    interesetRateStrategy;

  const chartData = generateInterestRateModelData({
    optimalUtilization,
    baseRate,
    slope1,
    slope2,
    reserveFactor,
  });

  const customTooltipFormatter = (value: number, name: string) => {
    if (name === "borrowRate") return [`${value}%`, "Borrow Rate"];
    if (name === "supplyRate") return [`${value}%`, "Supply Rate"];
    return [`${value}%`, name];
  };

  const customLabelFormatter = (label: string) => {
    return `Utilization Rate: ${label}%`;
  };

  return (
    <div className="bg-surface h-[320px] w-full rounded-2xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <XAxis
            dataKey="utilization"
            stroke="#7f8fa1"
            tickFormatter={(tick) => `${tick}%`}
            ticks={["0.00", "25.00", "50.00", "75.00", "100.00"]}
            dy={10}
            tick={{ fontSize: 12 }}
            label={{
              value: "Utilization",
              position: "left",
              offset: -50,
              dy: 30,
              fill: "#7f8fa1",
              fontSize: 14,
            }}
          />
          <YAxis
            unit="%"
            stroke="#7f8fa1"
            orientation="right"
            tickSize={0}
            tickMargin={12}
            axisLine={false}
            label={{
              value: "APY",
              position: "insideRight",
              angle: 90,
              fill: "#7f8fa1",
              fontSize: 14,
            }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0a1929",
              borderColor: "#163954",
              borderRadius: 8,
              fontSize: 14,
            }}
            itemStyle={{
              padding: 0,
            }}
            formatter={customTooltipFormatter}
            labelFormatter={customLabelFormatter}
          />

          {/* Data lines */}
          <Line
            type="monotone"
            dataKey="borrowRate"
            stroke="#f24868"
            strokeWidth={2}
            name="Borrow Rate"
            dot={false}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="supplyRate"
            stroke="#2fd9a3"
            strokeWidth={2}
            name="Supply Rate"
            dot={false}
            activeDot={{ r: 5 }}
            dy={-10}
          />

          {/* Reference Lines */}
          <ReferenceLine
            x={(optimalUtilization * 100).toFixed(2)}
            stroke="#fcd94c" // text-warning
            label={{
              position: "top",
              value: `Optimal (${optimalUtilization * 100}%)`,
              fill: "#fcd94c",
              fontSize: 14,
              dx: -52,
              dy: 10,
            }}
            strokeDasharray="3 3"
          />
          <ReferenceLine
            x={Math.round(Number(reserve.utilization)).toFixed(2)}
            stroke="#67a8ff"
            label={{
              position: "top",
              value: `Current (${currentUtilization}%)`,
              fill: "#67a8ff",
              fontSize: 14,
              dx: -50,
              dy: 30,
            }}
            strokeDasharray="4 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
