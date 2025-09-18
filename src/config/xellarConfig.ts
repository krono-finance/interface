import { defaultConfig } from "@xellar/kit";
import { lisk } from "viem/chains";
import { Config } from "wagmi";

import { PROJECT_ID, XELLAR_APP_ID } from "@/constant";

const xellarConfig = defaultConfig({
  appName: "Krono Finance",
  walletConnectProjectId: PROJECT_ID,
  xellarAppId: XELLAR_APP_ID,
  xellarEnv: "sandbox",
  ssr: true,
  chains: [lisk],
}) as Config;

export default xellarConfig;
