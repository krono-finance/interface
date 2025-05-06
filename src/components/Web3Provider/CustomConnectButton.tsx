import React from "react";

import Image from "next/image";

import { ConnectButton } from "@xellar/kit";

import { transformAddress } from "@/lib/utils";

import Button from "../Button/Button";

const CustomConnectButton = () => {
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
                    {chain.name}
                  </Button>
                  <Button
                    onClick={openProfileModal}
                    variant="tertiary"
                    className="!py-2"
                  >
                    {transformAddress(6, 4, account.address)}
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

{
  /* <div
              className="bg-surface text-primary border-border hover:bg-surface-hover flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 transition"
              onClick={
                !isConnected ? openConnectModal : openProfileModal // or customize further
              }
            >
              {!isConnected ? (
                <span className="text-sm font-medium">Connect</span>
              ) : (
                <> */
}
{
  /* Network icon */
}
{
  /* <div
                    className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      openChainModal();
                    }}
                  >
                    <Image
                      src={"/logos/krono.svg"}
                      alt={"Test"}
                      className="h-full w-full object-cover"
                      width={20}
                      height={20}
                    />
                  </div> */
}

{
  /* Wallet Address */
}
{
  /* <span className="text-sm font-medium">
                    {account?.address.slice(0, 6)}...
                    {account?.address.slice(-4)}
                  </span>
                </>
              )}
            </div> */
}
