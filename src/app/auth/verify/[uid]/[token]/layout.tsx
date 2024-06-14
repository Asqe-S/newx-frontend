import { TChildren } from "@/components/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account verification",
};

const verifyOtpLayout = ({ children }: TChildren) => {
  return <>{children}</>;
};

export default verifyOtpLayout;
