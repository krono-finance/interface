"use client";
import { useEffect } from "react";

import useReservesData from "@/hooks/useReservesData";
import { useRootStore } from "@/store/root";

const AppInitializer = () => {
  const { data, isSuccess } = useReservesData();
  const updateReservesData = useRootStore((state) => state.updateReservesData);

  useEffect(() => {
    if (isSuccess && data) {
      const [reserves] = data;
      updateReservesData(reserves);
    }
  }, [isSuccess, data, updateReservesData]);

  return null;
};

export default AppInitializer;
