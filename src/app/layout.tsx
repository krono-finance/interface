import React from "react";

import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";

import MainLayout from "@/components/Layout/MainLayout";
import Web3Provider from "@/components/Web3Provider/Web3Provider";

import "../styles/globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krono Finance",
  description: "Lending and borrowing platform for crypto assets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${inter.variable} antialiased`}>
        <Web3Provider>
          <MainLayout className="max-w-[1440px]">{children}</MainLayout>
        </Web3Provider>
      </body>
    </html>
  );
}
