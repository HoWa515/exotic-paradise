import { useQuery } from "@tanstack/react-query";
import { getHotels } from "../../services/apiHotels";

export function useFetchHotels() {
  const { isLoading, data: hotels } = useQuery({
    queryKey: ["hotels"],
    queryFn: getHotels,
  });
  return { isLoading, hotels };
}
