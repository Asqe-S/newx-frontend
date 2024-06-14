import { User } from "lucide-react";
import { TProfileProps } from "../types";

const Picture = ({ profile_picture }: TProfileProps) => {
  return (
    <>
      {profile_picture ? (
        <img
          src={profile_picture}
          className="size-full object-cover object-top"
          alt="profile picture"
          loading="lazy"
        />
      ) : (
        <User className="w-full h-full" />
      )}
    </>
  );
};

export default Picture;