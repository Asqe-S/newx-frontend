import { useState } from "react";
import { TProfileProps } from "../types";
import { ChevronLeft, RotateCw } from "lucide-react";
import Picture from "./picture";
import Button from "../ui/button";

const ProfilePicture = ({
  close,
  profile_picture,
  updateUser,
}: TProfileProps) => {
  const [picture, setPicture] = useState<File | null>();
  return (
    <>
      <div className="sticky-top ">
        <Button
          variant="btn-link"
          autoFocus
          disabled={updateUser.isPending}
          onClick={close}
        >
          <ChevronLeft />
          Back
        </Button>
          <Button
            disabled={updateUser.isPending}
            variant="btn-link"
            onClick={() => {
              document.getElementById("picture")?.click();
            }}
          >
            {picture ? "Choose Another" : "New Pic"}
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
            disabled={updateUser.isPending}
            onClick={() => {
              const formData = new FormData();
              formData.append("profile_picture", picture);
              updateUser.mutate(formData);
            }}
          >
            {updateUser.isPending && <RotateCw className="rotate-icon" />}
            Save
          </Button>
        )}
      </div>
      <div className="w-10/12 max-w-lg mx-auto h-4/6 rounded-lg overflow-hidden">
        <Picture
          profile_picture={
            picture ? URL.createObjectURL(picture) : profile_picture
          }
        />
      </div>
    </>
  );
};

export default ProfilePicture;
