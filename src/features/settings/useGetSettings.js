import { useQuery } from "@tanstack/react-query";
import { getSettings as getSettingsApi } from "./../../services/apiSettings";

export function useGetSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsApi,
  });

  return { isLoading, settings, error };
}
