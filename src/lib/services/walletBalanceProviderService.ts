import { Address, parseAbi } from "viem";

import { NATIVE_ETH } from "@/constant";
import { WALLET_BALANCE_CONTRACT_ADDRESS } from "@/constant/contractAddresses";
import WALLET_BALANCE_PROVIDER_ABI from "@/lib/abi/WalletBalanceProviderABI.json";

import { publicClient } from "./common";

export const balanceOf = async (user: Address, token: Address) => {
  try {
    if (token === NATIVE_ETH) {
      return await publicClient.getBalance({ address: user });
    }

    const contractCheck = await isContract(token);
    if (!contractCheck) {
      throw new Error("INVALID_TOKEN");
    }

    return await publicClient.readContract({
      address: WALLET_BALANCE_CONTRACT_ADDRESS,
      abi: WALLET_BALANCE_PROVIDER_ABI,
      functionName: "balanceOf",
      args: [user, token],
    });
  } catch (error) {
    console.error(`Error in balanceOf: ${error}`);
    throw error;
  }
};

// Batch balance check
export const batchBalanceOf = async (
  users: Address[],
  tokens: Address[],
): Promise<bigint[]> => {
  try {
    return (await publicClient.readContract({
      address: WALLET_BALANCE_CONTRACT_ADDRESS,
      abi: WALLET_BALANCE_PROVIDER_ABI,
      functionName: "batchBalanceOf",
      args: [users, tokens],
    })) as bigint[];
  } catch (error) {
    console.error(`Error in batchBalanceOf: ${error}`);
    throw error;
  }
};

// Get user wallet balances for all reserves
export const getUserWalletBalances = async (
  lendingPoolAddressesProvider: Address,
  user: Address,
): Promise<{ tokens: Address[]; balances: bigint[] }> => {
  try {
    const result = (await publicClient.readContract({
      address: WALLET_BALANCE_CONTRACT_ADDRESS,
      abi: WALLET_BALANCE_PROVIDER_ABI,
      functionName: "getUserWalletBalances",
      args: [lendingPoolAddressesProvider, user],
    })) as [Address[], bigint[]];

    return {
      tokens: result[0],
      balances: result[1],
    };
  } catch (error) {
    console.error(`Error in getUserWalletBalances: ${error}`);
    throw error;
  }
};

// Utility function to get lending pool from provider
export const getLendingPool = async (
  lendingPoolAddressesProvider: Address,
): Promise<Address> => {
  try {
    return (await publicClient.readContract({
      address: lendingPoolAddressesProvider,
      abi: parseAbi([
        "function getLendingPool() external view returns (address)",
      ]),
      functionName: "getLendingPool",
    })) as Address;
  } catch (error) {
    console.error(`Error getting lending pool: ${error}`);
    throw error;
  }
};

// Helper function to check if address is a contract
const isContract = async (address: Address): Promise<boolean> => {
  try {
    const bytecode = await publicClient.getCode({ address });
    return bytecode !== undefined;
  } catch (error) {
    console.log(error);
    return false;
  }
};
