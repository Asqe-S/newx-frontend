import SignInForm from "@/components/auth/signin";
import { TParams } from "@/components/types";
import Link from "next/link";
import { notFound } from "next/navigation";

export const generateMetadata = ({ params: { role } }: TParams) => {
  if (role === "merchant" || role === "user" || role === "superuser") {
    return {
      title: `${role} signin`,
    };
  } else {
    return {
      title: "unknown user",
    };
  }
};

const SignIn = ({ params: { role } }: TParams) => {
  if (role !== "merchant" && role !== "user" && role !== "superuser") {
    return notFound();
  }
  return (
    <>
      <h2 className="auth-head">Sign in to your {role} account</h2>
      <SignInForm role={role} />
      {role !== "superuser" && (
        <p>
          Don&apos;t have an account?.{" "}
          <Link className="link " href={`/auth/register/${role}`}>
            Register
          </Link>
        </p>
      )}
    </>
  );
};

export default SignIn;
