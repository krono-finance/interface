import { getReservesData } from "@/lib/services/uiPoolDataProviderService";
import { useQuery } from "@tanstack/react-query";

enum QueryKeys {
  "GET_RESERVES_DATA",
}

const useReservesData = () => {
  return useQuery({
    queryKey: [QueryKeys.GET_RESERVES_DATA],
    queryFn: () => getReservesData(),
    staleTime: 60_000,
    gcTime: 300_000,
  });
};

export default useReservesData;
