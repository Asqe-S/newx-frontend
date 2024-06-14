import Profile from "@/components/profile";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "user profile",
};

const UserProfile = () => {
  return (
    <Suspense>
      <Profile role={'user'} />
    </Suspense>
  );
};

export default UserProfile;
