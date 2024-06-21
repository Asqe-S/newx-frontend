import React, { useState } from "react";
import PropertyPhotos from "../properties/property-photos";
import { TPropertyPhoto } from "@/components/types";
import { NoImage } from "@/components/manage/no-image";
import { ChevronLeft, RotateCw, Trash2 } from "lucide-react";
import Button from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProperty, deleteProperties } from "@/components/backend/merchapi";

const Photos = ({
  id,
  close,
  field,
}: {
  id: number;
  close: () => void;
  field: TPropertyPhoto[];
}) => {
  const [picture, setPicture] = useState<File | null>();

  const queryClient = useQueryClient();

  const updateProperty = useMutation({
    mutationFn: addProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`fetchProperty${id}`],
      });
      queryClient.invalidateQueries({
        queryKey: ["fetchProperties"],
      });
      setPicture(null);
    },
  });

  const deletePhoto = useMutation({
    mutationFn: deleteProperties,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`fetchProperty${id}`],
      });
      queryClient.invalidateQueries({
        queryKey: ["fetchProperties"],
      });
    },
  });

  return (
    <>
      <div className="sticky-top ">
        <Button
          variant="btn-link"
          autoFocus
          disabled={updateProperty.isPending || deletePhoto.isPending}
          onClick={close}
        >
          <ChevronLeft />
          Back
        </Button>
        <Button
          disabled={updateProperty.isPending || deletePhoto.isPending}
          variant="btn-link"
          onClick={() => {
            document.getElementById("picture")?.click();
          }}
        >
          {picture ? "Choose Another" : "New Picture"}
        </Button>

        <input
          className="hidden"
          id="picture"
          type="file"
          accept="image/*"
          onChange={(e) => {
            setPicture(e.target.files && e.target.files[0]);
          }}
        />
        {picture && (
          <Button
            variant="btn-link"
            disabled={updateProperty.isPending || deletePhoto.isPending}
            onClick={() => {
              const formData = new FormData();
              formData.append("photo", picture);
              updateProperty.mutate({ id: id, formData: formData });
            }}
          >
            {updateProperty.isPending && <RotateCw className="rotate-icon" />}
            Save
          </Button>
        )}
      </div>

      <div className="max-w-xl max-h-[50%] mx-auto overflow-hidden  rounded-lg mb-4">
        {picture && (
          <img src={URL.createObjectURL(picture)} className="size-full" />
        )}
      </div>

      {!picture && field.length < 1 && <NoImage />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-4 ">
        {field.length > 0 &&
          field.map((photo) => (
            <div
              key={photo.id}
              className="min-h-60 h-60 max-h-60 w-11/12 mx-auto relative "
            >
              <Button
                disabled={deletePhoto.isPending}
                variant="btn-destructive"
                size="btn-icon"
                className="rounded-full absolute -top-2 -right-2"
                onClick={() => {
                  deletePhoto.mutate({ id: photo.id });
                }}
              >
                <Trash2 className="size-4" />
              </Button>
              <PropertyPhotos field={photo} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Photos;
