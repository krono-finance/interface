"use client";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex h-full min-h-[300px] w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-1">
        <h1 className="text-accent text-5xl font-bold">404</h1>
        <h2 className="text-tertiary text-3xl font-semibold">Page Not Found</h2>
      </div>
    </div>
  );
};

export default NotFoundPage;
