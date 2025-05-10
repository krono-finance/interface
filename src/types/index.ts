export type quickAddPercentageType = 25 | 50 | 75 | 100;
export const quickAddPercentages: quickAddPercentageType[] = [25, 50, 75, 100];

export interface IToken {
  name: string;
  symbol: string;
  image: string;
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
