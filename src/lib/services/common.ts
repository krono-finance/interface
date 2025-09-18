import { createPublicClient, http } from "viem";
import { lisk } from "viem/chains";

import { LISK_RPC_URL } from "@/constant";

export const publicClient = createPublicClient({
  chain: lisk,
  transport: http(LISK_RPC_URL),
});
