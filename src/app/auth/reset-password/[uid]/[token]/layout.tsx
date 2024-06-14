import { TChildren } from "@/components/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset password",
};

const ResetPasswordLayout = ({ children }: TChildren) => {
  return <>{children}</>;
};

export default ResetPasswordLayout;
