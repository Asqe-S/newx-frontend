import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PropertyField, propertySchema } from "./property-data";
import Button from "@/components/ui/button";
import { ChevronLeft, RotateCw } from "lucide-react";
import Input from "@/components/ui/input";
import AddPropertyMap from "@/components/map";
import { TProperty } from "@/components/types";

const AddProperty = ({
  id,
  mutationQuery,
  close,
  data,
}: {
  id?: number;
  close: () => void;
  data?: TProperty;
  mutationQuery: any;
}) => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(propertySchema),
    mode: "onChange",
    defaultValues: data
      ? {
          name: data.name,
          city: data.city,
          state: data.state,
          latitude: data.latitude,
          longitude: data.longitude,
        }
      : {
          name: "",
          city: "Chennai",
          state: "Tamil Nadu ",
          latitude: 13.0827,
          longitude: 80.2707,
        },
  });
  return (
    <>
      <div className="sticky-top">
        <Button
          variant="btn-link"
          autoFocus
          disabled={mutationQuery.isPending}
          onClick={close}
        >
          <ChevronLeft />
          Back
        </Button>
        <Button
          disabled={mutationQuery.isPending}
          variant="btn-link"
          onClick={handleSubmit((formData) => {
            if (id) {
              mutationQuery.mutate({ id: id, formData: formData });
            } else {
              mutationQuery.mutate({ formData: formData });
            }
          })}
        >
          {mutationQuery.isPending && <RotateCw className="rotate-icon" />}
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
