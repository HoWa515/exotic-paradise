import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  // tanstack --- UPDATE
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    // mutationFn can only has one para, in case of two, create an obj contains them;
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateSetting };
}
