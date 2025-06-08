import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditHotel } from "../../services/apiHotels";
import toast from "react-hot-toast";

export function useCreateHotel() {
  // tanstack --CREATE
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createHotel } = useMutation({
    mutationFn: createEditHotel,
    onSuccess: () => {
      toast.success("New hotel created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["hotels"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createHotel };
}
