import { MOCK_PRICE_ORACLE_CONTRACT_ADDRESS } from "@/constant/contractAddresses";
import { POOL_TOKENS } from "@/constant/poolTokenData";
import MOCK_PRICE_ORACLE_ABI from "@/lib/abi/MockPriceOracleABI.json";

import { publicClient } from "./common";

export const getAssetsPrices = async () => {
  try {
    return (await publicClient.readContract({
      address: MOCK_PRICE_ORACLE_CONTRACT_ADDRESS,
      abi: MOCK_PRICE_ORACLE_ABI,
      functionName: "getAssetsPrices",
      args: [
        [
          POOL_TOKENS.weth.address,
          POOL_TOKENS.idrx.address,
          POOL_TOKENS.wbtc.address,
          POOL_TOKENS.usdc.address,
          POOL_TOKENS.usdt.address,
        ],
      ],
    })) as bigint[];
  } catch (error) {
    console.error(`Error in getAssetsPrices: ${error}`);
    throw error;
  }
};
