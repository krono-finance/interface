import { Address, WalletClient } from "viem";

import { KRONO_FAUCETS_CONTRACT_ADDRESS } from "@/constant/contractAddresses";
import { TESTNET_POOL_TOKENS } from "@/constant/poolTokenData";
import KRONO_FAUCETS_ABI from "@/lib/abi/KronoFaucetsABI.json";

import { publicClient } from "./common";

export const batchClaimFaucets = async (
  walletClient: WalletClient,
  account: Address,
) => {
  try {
    const tokens = [
      TESTNET_POOL_TOKENS.idrx.address,
      TESTNET_POOL_TOKENS.wbtc.address,
      TESTNET_POOL_TOKENS.usdc.address,
      TESTNET_POOL_TOKENS.usdt.address,
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
