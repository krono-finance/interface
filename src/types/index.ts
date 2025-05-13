import { Address } from "viem";

export type quickAddPercentageType = 25 | 50 | 75 | 100;
export const quickAddPercentages: quickAddPercentageType[] = [25, 50, 75, 100];

export interface IToken {
  name: string;
  symbol: string;
  image: string;
  decimals: number;
  address: string;
  kTokenName: string;
  kTokenSymbol: string;
  kTokenAddress: string;
  stableDebtTokenName: string;
  stableDebtTokenSymbol: string;
  stableDebtTokenAddress: string;
  variableDebtTokenName: string;
  variableDebtTokenSymbol: string;
  variableDebtTokenAddress: string;
  interestRateStrategyAddress: string;
}

export interface IReserve {
  underlyingAsset: string | Address | `0x${string}`;
  name: string;
  symbol: string;
  decimals: bigint;
  baseLTVasCollateral: bigint;
  reserveLiquidationThreshold: bigint;
  reserveLiquidationBonus: bigint;
  reserveFactor: bigint;
  usageAsCollateralEnabled: boolean;
  borrowingEnabled: boolean;
  stableBorrowRateEnabled: boolean;
  isActive: boolean;
  isFrozen: boolean;

  liquidityIndex: bigint;
  variableBorrowIndex: bigint;
  liquidityRate: bigint;
  variableBorrowRate: bigint;
  stableBorrowRate: bigint;
  lastUpdateTimestamp: bigint;
  kTokenAddress: string | Address | `0x${string}`;
  stableDebtTokenAddress: string | Address | `0x${string}`;
  variableDebtTokenAddress: string | Address | `0x${string}`;
  interestRateStrategyAddress: string | Address | `0x${string}`;

  availableLiquidity: bigint;
  totalPrincipalStableDebt: bigint;
  averageStableRate: bigint;
  stableDebtLastUpdateTimestamp: bigint;
  totalScaledVariableDebt: bigint;
  priceInEth: bigint;
  variableRateSlope1: bigint;
  variableRateSlope2: bigint;
  stableRateSlope1: bigint;
  stableRateSlope2: bigint;
}

export interface IUserReserve {
  underlyingAsset: string | Address | `0x${string}`;
  scaledATokenBalance: bigint;
  usageAsCollateralEnabledOnUser: boolean;
  stableBorrowRate: bigint;
  scaledVariableDebt: bigint;
  principalStableDebt: bigint;
  stableBorrowLastUpdateTimestamp: bigint;
}
