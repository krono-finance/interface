import React from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import classNames from "classnames";

import CustomConnectButton from "../Web3Provider/CustomConnectButton";

export const menus = [
  {
    name: "Dashboard",
    link: "/dashboard",
    comingsoon: false,
  },
  {
    name: "Markets",
    link: "/markets",
  },
  // {
  //   name: "Strategies",
  //   link: "/strategies",
  //   comingsoon: true,
  // },
  // {
  //   name: "Stake",
  //   link: "/stake",
  //   comingsoon: true,
  // },
  // {
  //   name: "Swap",
  //   link: "/swap",
  //   comingsoon: true,
  // },
  {
    name: "Faucet",
    link: "/faucet",
    comingsoon: false,
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-background border-elevated sticky top-0 z-20 flex h-[60px] w-full justify-center border-b px-[30px]">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={"/market"}>
            <Image
              src={"/logos/krono.svg"}
              alt="Krono Finance"
              width={64}
              height={64}
              className="h-7 w-fit"
            />
          </Link>

          <ul className="flex items-center gap-1.5">
            {menus.map((menu) => (
              <li key={menu.name}>
                {menu.comingsoon ? (
                  <span
                    title="Coming Soon"
                    className={classNames(
                      "text-tertiary rounded-lg px-3.5 py-2.5 text-sm font-semibold",
                      "cursor-not-allowed opacity-50",
                    )}
                  >
                    {menu.name}
                  </span>
                ) : (
                  <Link
                    href={menu.link}
                    className={classNames(
                      "rounded-lg px-3.5 py-2.5 text-sm font-semibold",
                      "hover:text-primary hover:bg-elevated",
                      pathname.includes(menu.link)
                        ? "!text-primary bg-elevated"
                        : "text-tertiary",
                    )}
                  >
                    {menu.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <CustomConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
