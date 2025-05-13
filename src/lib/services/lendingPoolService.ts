import { Address, WalletClient } from "viem";

import { LENDING_POOL_CONTRACT_ADDRESS } from "@/constant/contractAddresses";
import LENDING_POOL_ABI from "@/lib/abi/LendingPoolABI.json";

import { publicClient } from "./common";

export const supplyService = async (
  asset: Address,
  amount: bigint,
  onBehalfOf: Address,
  walletClient: WalletClient,
  account: Address,
) => {
  try {
    const referralCode = 0;
    const { request } = await publicClient.simulateContract({
      address: LENDING_POOL_CONTRACT_ADDRESS,
      abi: LENDING_POOL_ABI,
      functionName: "deposit",
      args: [asset, amount, onBehalfOf, referralCode],
      account,
    });

    const tx = await walletClient.writeContract(request);
    console.log(tx);
    return tx;
  } catch (error) {
    console.error(`Error in supply: ${error}`);
    throw error;
  }
};

export const borrowService = async (
  asset: Address,
  amount: bigint,
  onBehalfOf: Address,
  walletClient: WalletClient,
  account: Address,
) => {
  try {
    const referralCode = 0;
    const { request } = await publicClient.simulateContract({
      address: LENDING_POOL_CONTRACT_ADDRESS,
      abi: LENDING_POOL_ABI,
      functionName: "borrow",
      args: [asset, amount, 2, referralCode, onBehalfOf],
      account,
    });

    const tx = await walletClient.writeContract(request);
    console.log(tx);
    return tx;
  } catch (error) {
    console.error(`Error in supply: ${error}`);
    throw error;
  }
};

export const withdrawService = async (
  asset: Address,
  amount: bigint,
  onBehalfOf: Address,
  walletClient: WalletClient,
  account: Address,
) => {
  try {
    const { request } = await publicClient.simulateContract({
      address: LENDING_POOL_CONTRACT_ADDRESS,
      abi: LENDING_POOL_ABI,
      functionName: "withdraw",
      args: [asset, amount, onBehalfOf],
      account,
    });

    const tx = await walletClient.writeContract(request);
    console.log(tx);
    return tx;
  } catch (error) {
    console.error(`Error in supply: ${error}`);
    throw error;
  }
};

export const repayService = async (
  asset: Address,
  amount: bigint,
  onBehalfOf: Address,
  walletClient: WalletClient,
  account: Address,
) => {
  try {
    const { request } = await publicClient.simulateContract({
      address: LENDING_POOL_CONTRACT_ADDRESS,
      abi: LENDING_POOL_ABI,
      functionName: "repay",
      args: [asset, amount, 2, onBehalfOf],
      account,
    });

    const tx = await walletClient.writeContract(request);
    console.log(tx);
    return tx;
  } catch (error) {
    console.error(`Error in supply: ${error}`);
    throw error;
  }
};
