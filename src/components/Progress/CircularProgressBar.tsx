import React from "react";

import classNames from "classnames";

const CircularProgressBar = ({ percentage = 75, size = 20, stroke = 3 }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg className="-rotate-90 transform" width={size} height={size}>
        <circle
          className="text-gray-700"
          stroke="currentColor"
          strokeWidth={stroke}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={classNames(
            "transition-all duration-500",
            percentage > 80
              ? "text-error"
              : percentage > 50
                ? "text-warning"
                : "text-success",
          )}
          stroke="currentColor"
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
    </div>
  );
};

export default CircularProgressBar;
