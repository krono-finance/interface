import React from "react";

import classNames from "classnames";

interface CircularProgressBarProps {
  percentage?: number;
  size?: number;
  stroke?: number;
  showPercentage?: boolean;
  textSize?: string;
}

const CircularProgressBar = ({
  percentage = 75,
  size = 20,
  stroke = 3,
  showPercentage,
  textSize,
}: CircularProgressBarProps) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const getProgressColor = () => {
    if (percentage > 80) return "#f24868";
    if (percentage > 50) return "#fcd94c";
    return "#2fd9a3";
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg className="-rotate-90 transform" width={size} height={size}>
        <circle
          className="text-gray-800"
          stroke="currentColor"
          strokeWidth={stroke}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={classNames("transition-all duration-500")}
          stroke={getProgressColor()}
          strokeWidth={stroke}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="square"
        />
      </svg>

      {showPercentage && (
        <div
          className="absolute inset-0 flex items-center justify-center font-medium"
          style={{ color: getProgressColor(), fontSize: textSize }}
        >
          {percentage.toFixed(2)}%
        </div>
      )}
    </div>
  );
};

export default CircularProgressBar;
