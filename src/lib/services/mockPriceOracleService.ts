import { MAINNET_CONTRACT } from "@/constant/contractAddresses";
import { POOL_TOKENS } from "@/constant/poolTokenData";
import PRICE_ORACLE_ABI from "@/lib/abi/PriceOracleABI.json";

import { publicClient } from "./common";

export const getAssetsPrices = async () => {
  try {
    return (await publicClient.readContract({
      address: MAINNET_CONTRACT.PRICE_ORACLE_CONTRACT_ADDRESS as `0x${string}`,
      abi: PRICE_ORACLE_ABI,
      functionName: "getAssetsPrices",
      args: [
        [
          POOL_TOKENS.weth.address,
          POOL_TOKENS.idrx.address,
          POOL_TOKENS.usdc.address,
        ],
      ],
    })) as bigint[];
  } catch (error) {
    console.error(`Error in getAssetsPrices: ${error}`);
    throw error;
  }
};
