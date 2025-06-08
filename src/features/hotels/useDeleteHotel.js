import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteHotel as deleteHotelApi } from "../../services/apiHotels";

export function useDeleteHotel() {
  // tanstack: Delete hotel
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteHotel } = useMutation({
    mutationFn: (id) => deleteHotelApi(id),
    // onSuccess:to refetch data, so UI updated
    onSuccess: () => {
      toast.success("Hotel deleted!");
      queryClient.invalidateQueries({
        queryKey: ["hotels"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, deleteHotel };
}
