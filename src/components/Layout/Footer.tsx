import React from "react";

import { DiscordIcon, GithubIcon, InstagramIcon, TwitterIcon } from "@/assets";

const Footer = () => {
  const socials = [
    {
      name: "Twitter",
      icon: <TwitterIcon className="hover:text-primary size-4.5" />,
      link: "https://x.com/kronofinance",
    },
    {
      name: "Discord",
      icon: <DiscordIcon className="hover:text-primary size-5" />,
      link: "https://discord.gg/kronofinance",
    },

    {
      name: "Instagram",
      icon: <InstagramIcon className="hover:text-primary size-5" />,
      link: "https://instagram.com/kronofinance",
    },
    {
      name: "Github",
      icon: <GithubIcon className="hover:text-primary size-5.5" />,
      link: "https://github.com/krono-finance",
    },
  ];

  return (
    <footer className="bg-background text-tertiary border-elevated flex w-full justify-center border-t px-7.5 md:pt-1">
      <div className="flex w-full flex-col items-center gap-2 py-3 md:mb-2 md:flex-row md:items-center md:justify-between">
        <span className="order-2 text-sm md:order-1">
          © 2025 Krono Finance. All rights reserved.
        </span>

        <div className="text-tertiary order-1 flex items-center gap-6 md:order-2">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
