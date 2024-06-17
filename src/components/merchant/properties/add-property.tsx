import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PropertyField, propertySchema } from "./property-data";
import { addProperty } from "@/components/backend/merchapi";
import Button from "@/components/ui/button";
import { ChevronLeft, RotateCw } from "lucide-react";
import Input from "@/components/ui/input";
import AddPropertyMap from "@/components/map";

const AddProperty = ({ close }: { close: () => void }) => {
  const queryClient = useQueryClient();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(propertySchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      city: "Chennai",
      state: "Tamil Nadu ",
      latitude: 13.0827,
      longitude: 80.2707,
    },
  });
  const { isPending, mutate } = useMutation({
    mutationFn: addProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchProperties"],
      });
      close();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <div className="sticky-top">
        <Button
          variant="btn-link"
          autoFocus
          disabled={isPending}
          onClick={close}
        >
          <ChevronLeft />
          Back
        </Button>
        <Button
          disabled={isPending}
          variant="btn-link"
          onClick={handleSubmit((formData) => {
            mutate(formData);
          })}
        >
          {isPending && <RotateCw className="rotate-icon" />}
          Save
        </Button>
      </div>
      <div className=" mb-4 w-10/12 max-w-md mx-auto bg-background border rounded-md px-3 py-2">
        <div className="space-y-2  mb-4">
          <Input
            label="Name of the property"
            name="name"
            type="text"
            register={register}
            error={errors.name?.message?.toString()}
          />
        </div>
        <div className=" grid grid-cols-2 gap-4">
          {PropertyField.map((field) => (
            <div className="space-y-2" key={field.name}>
              <label
                className="label opacity-50"
                tabIndex={-1}
                htmlFor={field.name}
              >
                {field.label}
              </label>
              <input
                className="input"
                disabled
                type="text"
                id={field.name}
                {...register(field.name)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-11/12  h-5/6 mx-auto pb-8 mb-8">
        <AddPropertyMap setValue={setValue} watch={watch} />
      </div>
    </>
  );
};

export default AddProperty;
