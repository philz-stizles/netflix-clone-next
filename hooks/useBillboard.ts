import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useBillboard = () => {
  const { data, isLoading, error } = useSWR("/api/random", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { data, isLoading, error };
};

export default useBillboard;
