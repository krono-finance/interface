import { defaultConfig } from "@xellar/kit";
import { liskSepolia } from "viem/chains";
import { Config } from "wagmi";

import { PROJECT_ID, XELLAR_APP_ID } from "@/constant";

const xellarConfig = defaultConfig({
  appName: "Krono Finance",
  walletConnectProjectId: PROJECT_ID,
  xellarAppId: XELLAR_APP_ID,
  xellarEnv: "sandbox",
  ssr: true,
  chains: [liskSepolia],
}) as Config;

export default xellarConfig;
