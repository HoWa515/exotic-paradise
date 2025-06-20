/*eslint-disable*/
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  // tanstack --- UPDATE
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    // mutationFn can only has one para, in case of two, create an obj contains them;
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("User update successfully!");
      //   queryClient.setQueryData("user", user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateUser };
}
