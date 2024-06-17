import Profile from "@/components/profile";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "merchant profile",
};

const MerchantProfile = () => {
  return (
    <Suspense>
      <Profile role={"merchant"} />
    </Suspense>
  );
};

export default MerchantProfile;
