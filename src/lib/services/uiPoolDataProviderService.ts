import { Address } from "viem";

import {
  LENDING_POOL_ADDRESSES_PROVIDER_CONTRACT_ADDRESS,
  UI_POOL_DATA_CONTRACT_ADDRESS,
} from "@/constant/contractAddresses";
import UI_POOL_DATA_ABI from "@/lib/abi/UiPoolDataProviderABI.json";
import { IReserve, IUserReserveData } from "@/types";

import { publicClient } from "./common";

export const getReservesData = async () => {
  try {
    const data = await publicClient.readContract({
      address: UI_POOL_DATA_CONTRACT_ADDRESS,
      abi: UI_POOL_DATA_ABI,
      functionName: "getSimpleReservesData",
      args: [LENDING_POOL_ADDRESSES_PROVIDER_CONTRACT_ADDRESS],
    });

    return data as [IReserve[], bigint];
  } catch (error) {
    console.error(`Error in getReservesData: ${error}`);
    throw error;
  }
};

export const getUserReservesData = async (user: Address) => {
  try {
    const data = await publicClient.readContract({
      address: UI_POOL_DATA_CONTRACT_ADDRESS,
      abi: UI_POOL_DATA_ABI,
      functionName: "getUserReservesData",
      args: [LENDING_POOL_ADDRESSES_PROVIDER_CONTRACT_ADDRESS, user],
    });

    return data as IUserReserveData[];
  } catch (error) {
    console.error(`Error in getUserReservesData: ${error}`);
    throw error;
  }
};
