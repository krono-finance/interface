"use client";
import React, { useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import classNames from "classnames";
import { XIcon } from "lucide-react";

import Button from "../Button/Button";
import Drawer from "../Drawer/Drawer";
import CustomConnectButton from "../Web3Provider/CustomConnectButton";

import { menus } from "./Navbar";

const MobileNavbar = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-background border-elevated sticky top-0 z-20 flex h-[60px] w-full items-center justify-between border-b px-4">
      <Link href={"/market"}>
        <Image
          src={"/logos/krono.svg"}
          alt="Krono Finance"
          width={64}
          height={64}
          className="h-7 w-fit"
        />
      </Link>

      <div className="flex items-center gap-2 text-sm">
        <CustomConnectButton />

        <Button
          variant="tertiary"
          className="!px-2.5 !py-2"
          onClick={() => setOpen(true)}
        >
          <AiOutlineMenuFold className="size-5" />
        </Button>
      </div>

      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        position="right"
        size="full"
      >
        <div className="flex items-center justify-between">
          <Link href={"/"} onClick={() => setOpen(false)}>
            <Image
              src={"/logos/krono.svg"}
              alt="Krono Finance"
              width={200}
              height={150}
              className="h-10 w-fit"
            />
          </Link>

          <XIcon
            className="size-8 cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        <div className="mt-8 flex flex-col space-y-3">
          {menus.map((menu) => (
            <Link
              key={menu.name}
              href={menu.link}
              className={classNames(
                "-mx-4 rounded-md px-4 py-2 text-xl font-semibold",
                pathname === menu.link ? "text-primary" : "text-tertiary",
              )}
              onClick={() => setOpen(false)}
            >
              {menu.name}
            </Link>
          ))}
        </div>
      </Drawer>
    </nav>
  );
};

export default MobileNavbar;
