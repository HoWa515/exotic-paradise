import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditHotel } from "../../services/apiHotels";
import toast from "react-hot-toast";

export function useUpdateHotel() {
  // tanstack --- UPDATE
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editHotel } = useMutation({
    // mutationFn can only has one para, in case of two, create an obj contains them;
    mutationFn: ({ newHotelData, id }) => createEditHotel(newHotelData, id),
    onSuccess: () => {
      toast.success("Edited successfully!");
      queryClient.invalidateQueries({
        queryKey: ["hotels"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editHotel };
}
