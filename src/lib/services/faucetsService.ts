import { Address, WalletClient } from "viem";

import { KRONO_FAUCETS_CONTRACT_ADDRESS } from "@/constant/contractAddresses";
import { POOL_TOKENS } from "@/constant/poolTokenData";
import KRONO_FAUCETS_ABI from "@/lib/abi/KronoFaucetsABI.json";

import { publicClient } from "./common";

export const batchClaimFaucets = async (
  walletClient: WalletClient,
  account: Address,
) => {
  try {
    const tokens = [
      POOL_TOKENS.idrx.address,
      POOL_TOKENS.wbtc.address,
      POOL_TOKENS.usdc.address,
      POOL_TOKENS.usdt.address,
    ];

    const { request } = await publicClient.simulateContract({
      address: KRONO_FAUCETS_CONTRACT_ADDRESS,
      abi: KRONO_FAUCETS_ABI,
      functionName: "batchClaim",
      args: [tokens],
      account,
    });

    const tx = await walletClient.writeContract(request);
    console.log(tx);
    return tx;
  } catch (error) {
    console.error(`Error in batchClaimFaucets: ${error}`);
    throw error;
  }
};
