import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import { Address } from "viem";

import {
  balanceOf,
  batchBalanceOf,
  getLendingPool,
  getUserWalletBalances,
} from "@/lib/services/walletBalanceProviderService";

enum QueryKeys {
  "WALLET_BALANCE",
  "BATCH_WALLET_BALANCES",
  "USER_WALLET_BALANCES",
  "LENDING_POOL",
}

export const useWalletBalance = (
  user: Address | `0x${string}`,
  token: Address | `0x${string}`,
) => {
  return useQuery({
    queryKey: [QueryKeys.WALLET_BALANCE, user, token],
    queryFn: () => balanceOf(user, token),
    staleTime: 60_000, // 1 minute stale time
    gcTime: 300_000, // 5 minute cache time
  });
};

export const useBatchWalletBalances = (
  users: Address[],
  tokens: Address[],
  options?: {
    enabled?: boolean;
  },
) => {
  return useQuery({
    queryKey: [QueryKeys.BATCH_WALLET_BALANCES, users, tokens],
    queryFn: () => batchBalanceOf(users, tokens),
    enabled:
      options?.enabled !== false && users.length > 0 && tokens.length > 0,
    staleTime: 60_000,
  });
};

export const useUserWalletBalances = (
  lendingPoolAddressesProvider: Address,
  user: Address,
  options?: {
    enabled?: boolean;
  },
): UseQueryResult<{ tokens: Address[]; balances: bigint[] }, Error> => {
  return useQuery({
    queryKey: [QueryKeys.USER_WALLET_BALANCES, user],
    queryFn: () => getUserWalletBalances(lendingPoolAddressesProvider, user),
    enabled: options?.enabled !== false && !!user,
    staleTime: 60_000,
  });
};

export const useLendingPool = (
  lendingPoolAddressesProvider: Address,
  options?: {
    enabled?: boolean;
  },
) => {
  return useQuery({
    queryKey: [QueryKeys.LENDING_POOL, lendingPoolAddressesProvider],
    queryFn: () => getLendingPool(lendingPoolAddressesProvider),
    enabled: options?.enabled !== false && !!lendingPoolAddressesProvider,
    staleTime: Infinity, // Doesn't change often
  });
};

// Parallel queries for multiple tokens
export const useMultipleTokenBalances = (user: Address, tokens: Address[]) => {
  return useQueries({
    queries: tokens.map((token) => ({
      queryKey: [QueryKeys.WALLET_BALANCE, user, token],
      queryFn: () => balanceOf(user, token),
      enabled: !!user && !!token,
      staleTime: 60_000,
    })),
  });
};
