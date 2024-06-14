import { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth/forgot-password";

export const metadata: Metadata = {
  title: "Forgot password",
};

const ForgotPassword = () => {
  return (
    <>
      <h2 className="auth-head">Reset your password</h2>
      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPassword;
