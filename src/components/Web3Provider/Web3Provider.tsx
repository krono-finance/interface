"use client";
import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme, XellarKitProvider } from "@xellar/kit";
import { WagmiProvider } from "wagmi";

import xellarConfig from "@/config/xellarConfig";

const queryClient = new QueryClient();

const customTheme: Theme = {
  scheme: "dark",
  colors: {
    BACKGROUND_TRANSPARENT: "transparent",
    PRIMARY: "#ffffff",
    PRIMARY_ACCENT: "#67a8ff",
    BACKGROUND: "#07111c",
    BACKGROUND_SECONDARY: "#0a1929",
    TEXT: "#ffffff",
    TEXT_SECONDARY: "#7f8fa1",
    SHADOW: "#122c44",
    BORDER: "#163954",
    BUTTON_TEXT_PRIMARY: "#ffffff",
    BUTTON_TEXT_SECONDARY: "#b8d9ff",
    BUTTON_BACKGROUND: "#0e2238",
  },
};

const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={xellarConfig}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider theme={customTheme}>{children}</XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
