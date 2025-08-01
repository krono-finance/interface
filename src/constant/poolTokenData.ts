import { IInterestRateStrategy, IToken } from "@/types";

export const POOL_TOKENS: {
  idrx: IToken;
  weth: IToken;
  wbtc: IToken;
  usdc: IToken;
  usdt: IToken;
} = {
  weth: {
    name: "Ethereum",
    symbol: "ETH",
    image: "/tokens/eth.svg",
    decimals: 18,
    address: "0x4200000000000000000000000000000000000006",
    kTokenName: "Krono Lisk WETH",
    kTokenSymbol: "kLiskWETH",
    kTokenAddress: "0xf9AFDEE240d30F85cAC17d3c995F6DF474d39F95",
    stableDebtTokenName: "Krono Lisk Stable Debt WETH",
    stableDebtTokenSymbol: "stableDebtLiskWETH",
    stableDebtTokenAddress: "0xc88823383b6E1D4beD4E8319289D8a7DCC99bBBb",
    variableDebtTokenName: "Krono Lisk Variable Debt WETH",
    variableDebtTokenSymbol: "variableDebtLiskWETH",
    variableDebtTokenAddress: "0x4a673B1c2348aF738c52Cf84c8e7c0E499467e37",
    interestRateStrategyAddress: "0x63D41662484d665B657Fe7Ccec19B17540C75cf1",
  },
  idrx: {
    name: "IDRX",
    symbol: "IDRX",
    image: "/tokens/idrx.svg",
    decimals: 2,
    address: "0xd63029c1a3da68b51c67c6d1dec3dee50d681661",
    kTokenName: "Krono Lisk IDRX",
    kTokenSymbol: "kLiskIDRX",
    kTokenAddress: "0x01e117A4D2462A2218F66Cf56753dc73490d03c5",
    stableDebtTokenName: "Krono Lisk Stable Debt IDRX",
    stableDebtTokenSymbol: "stableDebtLiskIDRX",
    stableDebtTokenAddress: "0x98623acbfd9E336A72524614bE80fA43d892d774",
    variableDebtTokenName: "Krono Lisk Variable Debt IDRX",
    variableDebtTokenSymbol: "variableDebtLiskIDRX",
    variableDebtTokenAddress: "0x9fa49a606fc6Cc0f8Fc4E5659961AeF5eF95EAa6",
    interestRateStrategyAddress: "0xecd44a2A08F3cedd1CCf09c28756861EE28F630e",
  },
  wbtc: {
    name: "Wrapped BTC",
    symbol: "WBTC",
    image: "/tokens/wbtc.svg",
    decimals: 8,
    address: "0xee6cB032769B7B76aaB233f7E068903B573249E5",
    kTokenName: "Krono Lisk WBTC",
    kTokenSymbol: "kLiskWBTC",
    kTokenAddress: "0x4B90A795a9DD1e8e84F8037D5c8f626912cC723A",
    stableDebtTokenName: "Krono Lisk Stable Debt WBTC",
    stableDebtTokenSymbol: "stableDebtLiskWBTC",
    stableDebtTokenAddress: "0xB525EFbA5f55C48d40a3371A7C90105dbe00CE49",
    variableDebtTokenName: "Krono Lisk Variable Debt WBTC",
    variableDebtTokenSymbol: "variableDebtLiskWBTC",
    variableDebtTokenAddress: "0xC7a0AE8008725f460FB5f264Aa1c5d72bea53805",
    interestRateStrategyAddress: "0x47359a64E686b1664Daa4Fc4b97D288cde4d7381",
  },
  usdc: {
    name: "USD Coin",
    symbol: "USDC",
    image: "/tokens/usdc.svg",
    decimals: 6,
    address: "0xddb0c6b66Cf2BaCB6FB835a74c33be8ad728e596",
    kTokenName: "Krono Lisk USDC",
    kTokenSymbol: "kLiskUSDC",
    kTokenAddress: "0x6A75Bb56750F67231742B9b6f5a05013aC72aF42",
    stableDebtTokenName: "Krono Lisk Stable Debt USDC",
    stableDebtTokenSymbol: "stableDebtLiskUSDC",
    stableDebtTokenAddress: "0x6C6A8CCE25f57343b06e66AE82B85937BA8809D8",
    variableDebtTokenName: "Krono Lisk Variable Debt USDC",
    variableDebtTokenSymbol: "variableDebtLiskUSDC",
    variableDebtTokenAddress: "0x5e332646Ddb041548B8Ab0F303dFDD56F7BCC38e",
    interestRateStrategyAddress: "0x2cabcc96e0F478F13738364192c6C3c9EA80451e",
  },
  usdt: {
    name: "Tether",
    symbol: "USDT",
    image: "/tokens/usdt.svg",
    decimals: 6,
    address: "0x814c5aeA0dcEaF6b334499d080630071F0A336EF",
    kTokenName: "Krono Lisk USDT",
    kTokenSymbol: "kLiskUSDT",
    kTokenAddress: "0xf51B6aA4e465f7dd88ca8F2643d540E6D54c274D",
    stableDebtTokenName: "Krono Lisk Stable Debt USDT",
    stableDebtTokenSymbol: "stableDebtLiskUSDT",
    stableDebtTokenAddress: "0x291a05b8d9FC4E8482b93d42d9A530F1e2228eD3",
    variableDebtTokenName: "Krono Lisk Variable Debt USDT",
    variableDebtTokenSymbol: "variableDebtLiskUSDT",
    variableDebtTokenAddress: "0x5af439cA0CFd08139b2B3C3981f496374Bb065FB",
    interestRateStrategyAddress: "0xa279884F378a0Bab98Fc00Da57d2Acd56a068119",
  },
};

export const poolList = Object.values(POOL_TOKENS);

export const getTokenByAddress = (address: string): IToken | undefined => {
  const normalizedAddress = address.toLowerCase();
  return poolList.find(
    (token) => token.address.toLowerCase() === normalizedAddress,
  );
};

export const INTEREST_RATE_STRATEGY: {
  idrx: IInterestRateStrategy;
  weth: IInterestRateStrategy;
  eth: IInterestRateStrategy;
  wbtc: IInterestRateStrategy;
  usdc: IInterestRateStrategy;
  usdt: IInterestRateStrategy;
} = {
  idrx: {
    optimalUtilization: 0.8,
    baseRate: 0.01,
    slope1: 0.04,
    slope2: 1,
    reserveFactor: 0.15,
  },
  weth: {
    optimalUtilization: 0.8,
    baseRate: 0.01,
    slope1: 0.04,
    slope2: 0.8,
    reserveFactor: 0.1,
  },
  eth: {
    optimalUtilization: 0.8,
    baseRate: 0.01,
    slope1: 0.04,
    slope2: 0.8,
    reserveFactor: 0.1,
  },
  wbtc: {
    optimalUtilization: 0.7,
    baseRate: 0,
    slope1: 0.04,
    slope2: 3,
    reserveFactor: 0.2,
  },
  usdc: {
    optimalUtilization: 0.8,
    baseRate: 0,
    slope1: 0.125,
    slope2: 0.6,
    reserveFactor: 0.1,
  },
  usdt: {
    optimalUtilization: 0.8,
    baseRate: 0,
    slope1: 0.125,
    slope2: 0.6,
    reserveFactor: 0.1,
  },
};
