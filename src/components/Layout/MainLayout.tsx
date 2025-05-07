"use client";
import React, { ReactNode } from "react";

import classNames from "classnames";

import useWindowSize from "@/hooks/useWindowSize";

import Footer from "./Footer";
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

const MainLayout = ({ children, className }: MainLayoutProps) => {
  const { isTablet } = useWindowSize();

  return (
    <div className="h-full w-full">
      <div
        className={classNames(
          "relative mx-auto grid min-h-screen w-full",
          // "auto" is for the main tag
          // add "max-content" to the "grid-rows" class below for each div if want to add more "static" elements
          "grid-rows-[max-content_auto_max-content]",
        )}
      >
        {isTablet ? <MobileNavbar /> : <Navbar />}
        <div className="flex w-full justify-center">
          <main className={classNames("mx-4 w-full", className)}>
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
