import BigNumber from "bignumber.js";

type NumericValue = number | bigint | string;

interface FormatOptions {
  decimals?: number;
  prefix?: string;
  suffix?: string;
  threshold?: number;
  lowerCase?: boolean;
}

export const transformAddress = (
  beginning: number,
  end: number,
  address: string,
) => {
  if (address.length <= beginning + end) {
    return address;
  }

  return `${address?.slice(0, beginning)}...${address?.slice(
    address?.length - end,
  )}`;
};

export const formatNumber = (
  value: NumericValue,
  options: FormatOptions = {},
): string => {
  const {
    decimals = 2,
    prefix = "",
    suffix = "",
    threshold = 1000,
    lowerCase = false,
  } = options;

  try {
    const bn = new BigNumber(value.toString());

    if (bn.isNaN()) {
      return "Invalid number";
    }

    if (bn.isZero()) {
      return `${prefix}0${suffix}`;
    }

    const absoluteValue = bn.abs();

    if (absoluteValue.lt(threshold)) {
      return `${prefix}${absoluteValue.toFixed(decimals)}${suffix}`;
    }

    const suffixCases = lowerCase
      ? ["", "k", "m", "b", "t", "q"]
      : ["", "K", "M", "B", "T", "Q"];

    const magnitude = Math.min(
      Math.floor(absoluteValue.e ? absoluteValue.e / 3 : 0),
      suffixCases.length - 1,
    );

    const scaled = absoluteValue.div(new BigNumber(10).pow(magnitude * 3));
    const formatted = scaled.toFixed(decimals);

    return `${prefix}${formatted}${suffixCases[magnitude]}${suffix}`;
  } catch (error) {
    console.error("Error formatting number:", error);
    return "Error";
  }
};

export const formatTokenValue = (value: BigNumber): string => {
  if (value.isNaN() || !value.isFinite() || value.isZero()) return "0";

  const thresholds = [
    { value: new BigNumber("1e15"), suffix: "Q" }, // Quadrillion
    { value: new BigNumber("1e12"), suffix: "T" }, // Trillion
    { value: new BigNumber("1e9"), suffix: "B" }, // Billion
    { value: new BigNumber("1e6"), suffix: "M" }, // Million
    { value: new BigNumber("1e3"), suffix: "K" }, // Thousand
  ];

  // Handle large number suffix formatting
  for (const t of thresholds) {
    if (value.gte(t.value)) {
      return value.dividedBy(t.value).toFixed(2) + t.suffix;
    }
  }

  // Handle decimal precision based on size
  if (value.gte(1)) {
    return value.toFixed(2); // Large enough, like ETH/USDC val
  }

  if (value.gte(0.0001)) {
    return value.toFixed(4); // Mid-range decimals
  }

  return value.toFixed(6); // Small value, like IDR or low ETH fraction
};
