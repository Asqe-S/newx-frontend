import { User } from "lucide-react";
import { TProfileProps } from "../types";
import Image from "next/image";

const Picture = ({ profile_picture }: TProfileProps) => {
  return (
    <>
      {profile_picture ? (
        <Image
          alt="profile picture"
          src={profile_picture}
          sizes="100vw"
          priority
          style={{
            width: "100%",
            height: "auto",
          }}
          width={500}
          height={300}
        />
      ) : (
        <User className="w-full h-full" />
      )}
    </>
  );
};

export default Picture;
