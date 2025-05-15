"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

import Image from "next/image";

import { ExternalLinkIcon } from "lucide-react";
import { waitForTransactionReceipt } from "viem/actions";
import { useAccount, useWalletClient } from "wagmi";

import Button from "@/components/Button/Button";
import { POOL_TOKENS, poolList } from "@/constant/poolTokenData";
import { batchClaimFaucets } from "@/lib/services/faucetsService";
import { transformAddress } from "@/lib/utils";

const FaucetPage = () => {
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();

  const [isClaiming, setIsClaiming] = useState(false);

  const handleBatchClaim = async () => {
    if (!walletClient || !address) return;

    try {
      setIsClaiming(true);

      const txToast = toast.loading("Claiming Faucet...");

      try {
        const tx = await batchClaimFaucets(walletClient, address);

        await waitForTransactionReceipt(walletClient, {
          hash: tx as `0x${string}`,
        });

        toast.success("Claim successful!");
      } catch (error) {
        toast.error("Claim failed!");
        throw error;
      } finally {
        setIsClaiming(false);
        toast.dismiss(txToast);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="flex h-full w-full justify-center pt-10 pb-20 sm:pt-20">
      <div>
        <h1 className="font-sora text-2xl font-bold sm:text-3xl">
          Krono Finance Testnet Faucet
        </h1>
        <div className="border-elevated bg-surface mt-4 rounded-xl border p-4 sm:p-5">
          <p className="text-tertiary max-w-[470px] text-sm font-medium">
            This is a testnet faucet for Krono Finance. You can use this faucet
            to get testnet tokens for testing purposes.
          </p>

          <div className="bg-background border-elevated mt-4 space-y-3 rounded-lg border p-4 sm:space-y-5">
            <div key={POOL_TOKENS.weth.address} className="flex items-center">
              <Image
                src={POOL_TOKENS.weth.image}
                alt={POOL_TOKENS.weth.name}
                width={40}
                height={40}
                className="mr-2 size-6 rounded-full sm:size-10"
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold sm:text-base">
                  {POOL_TOKENS.weth.symbol}
                </p>

                <a
                  href={"https://docs.lisk.com/lisk-tools/faucets/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tertiary hover:text-primary flex cursor-pointer gap-1 text-xs sm:text-sm"
                >
                  Lisk Sepolia Faucet
                  <ExternalLinkIcon className="mt-[1px] size-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-background border-elevated mt-4 space-y-3 rounded-lg border p-4 sm:space-y-5">
            {poolList.slice(1, 5).map((token) => (
              <div key={token.address} className="flex items-center">
                <Image
                  src={token.image}
                  alt={token.name}
                  width={40}
                  height={40}
                  className="mr-2 size-6 rounded-full sm:size-10"
                />
                <div className="flex flex-col">
                  <p className="text-sm font-semibold sm:text-base">
                    {token.symbol}
                  </p>
                  {token.symbol !== "ETH" ? (
                    <a
                      href={`https://sepolia-blockscout.lisk.com/address/${token.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-tertiary hover:text-primary flex cursor-pointer gap-1 text-xs sm:text-sm"
                    >
                      {transformAddress(12, 12, token.address)}
                      <ExternalLinkIcon className="mt-[1px] size-4" />
                    </a>
                  ) : (
                    <a
                      href={"https://lisk-sepolia-faucet.vercel.app/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-tertiary hover:text-primary flex cursor-pointer gap-1 text-xs sm:text-sm"
                    >
                      Lisk Sepolia Faucet
                      <ExternalLinkIcon className="mt-[1px] size-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Button
            className="mt-5 mb-2 w-full"
            disabled={isClaiming}
            onClick={handleBatchClaim}
          >
            Request Testnet Tokens
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FaucetPage;
