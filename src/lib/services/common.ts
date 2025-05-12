import { createPublicClient, http } from "viem";
import { liskSepolia } from "viem/chains";

import { LISK_SEPOLIA_RPC_URL } from "@/constant";

export const publicClient = createPublicClient({
  chain: liskSepolia,
  transport: http(LISK_SEPOLIA_RPC_URL),
});
