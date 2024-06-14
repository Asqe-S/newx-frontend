import RegisterForm from "@/components/auth/register";
import { TParams } from "@/components/types";
import Link from "next/link";
import { notFound } from "next/navigation";


export const generateMetadata = ({ params: { role } }: TParams) => {
  if (role === "merchant" || role === "user") {
    return {
      title: `${role} register`,
    };
  } else {
    return {
      title: "unknown user",
    };
  }
};


const Register = ({ params: { role } }: TParams) => {
     if (role !== "merchant" && role !== "user") {
       return notFound();
     }
  return (
    <>
      <h2 className="auth-head">Create your {role} account</h2>
      <RegisterForm role={role} />
      <p className="text-sm">
        Already have an account?.{" "}
        <Link className="link" href={`/auth/signin/${role}`}>
          {" "}
          Sign In
        </Link>
      </p>
    </>
  );
};

export default Register