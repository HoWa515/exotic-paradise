/*eslint-disable*/
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditHotel } from "../../services/apiHotels";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateHotelForm({ hotelToEdit = {} }) {
  const { id: editId, ...editValues } = hotelToEdit;
  const isEditSession = Boolean(editId);
  // react-hook-form
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function submitForm(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editHotel({ newHotelData: { ...data, image }, id: editId });
    else createHotel({ ...data, image: image });
    // console.log(data);
  }

  function onError(errors) {
    console.log(errors);
  }
  // react-query
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createHotel } = useMutation({
    mutationFn: createEditHotel,
    onSuccess: () => {
      toast.success("New hotel created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["hotels"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const { isLoading: isEditing, mutate: editHotel } = useMutation({
    mutationFn: ({ newHotelData, id }) => createEditHotel(newHotelData, id),
    onSuccess: () => {
      toast.success("Edited successfully!");
      queryClient.invalidateQueries({
        queryKey: ["hotels"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing;

  return (
    <Form onSubmit={handleSubmit(submitForm, onError)}>
      <FormRow label="Hotel name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required.",
          })}
        />
      </FormRow>

      <FormRow label="Max capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required.",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required.",
            min: { value: 1, message: "Price should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required.",
            min: { value: 1, message: "Discount should be less than price" },
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Hotel photo">
        <FileInput
          id="image"
          disabled={isWorking}
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit" : "Create"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateHotelForm;
