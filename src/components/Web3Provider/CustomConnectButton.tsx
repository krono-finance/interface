import React from "react";

import Image from "next/image";

import { ConnectButton } from "@xellar/kit";

import useWindowSize from "@/hooks/useWindowSize";
import { transformAddress } from "@/lib/utils";

import Button from "../Button/Button";

const CustomConnectButton = () => {
  const { isMobile } = useWindowSize();

  return (
    <ConnectButton.Custom>
      {({
        isConnected,
        account,
        chain,
        openConnectModal,
        openChainModal,
        openProfileModal,
      }) => {
        return (
          <>
            {!isConnected ? (
              <Button
                onClick={openConnectModal}
                variant="secondary"
                className="!py-2.5"
              >
                Connect Wallet
              </Button>
            ) : (
              account &&
              chain && (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={openChainModal}
                    variant="tertiary"
                    className="gap-1.5 !py-2"
                  >
                    <Image
                      src={"/logos/lisk-profile-w.svg"}
                      alt={"Test"}
                      width={18}
                      height={18}
                    />
                    {!isMobile && chain.name}
                  </Button>
                  <Button
                    onClick={openProfileModal}
                    variant="tertiary"
                    className="!py-2"
                  >
                    {transformAddress(isMobile ? 4 : 6, 4, account.address)}
                  </Button>
                </div>
              )
            )}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;
