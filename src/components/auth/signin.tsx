"use client";
import { RotateCw } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "./form-data";
import { useMutation } from "@tanstack/react-query";
import { authSubmit } from "../backend/un-auth";
import { toast } from "react-toastify";
import { TRole } from "../types";
import Input from "../ui/input";
import PasswordField from "../ui/password";
import Button from "../ui/button";

export const saveToken = (name: string, token: string) => {
  Cookies.set(name, token, { secure: true, sameSite: "strict", expires: 90 });
};

const SignInForm = ({ role }: TRole) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
    mode: "onChange",
  });

  const { isPending, mutate } = useMutation({
    mutationFn: authSubmit,
    onSuccess: ({ data }) => {
      if (data.pos === false) {
        toast.error("You don't have the permission");
      } else if (data.notverified) {
        toast.error(
          "Account not verified. A verification email has been sent to your inbox. Please check."
        );
      } else if (data.is_blocked) {
        toast.error("Your account has been blocked.");
      } else {
        saveToken("access", data.access);
        saveToken("refresh", data.refresh);
        if (pathname.includes("auth")) {
          router.replace(`/${data.role}`);
        } else {
          router.refresh();
        }
      }
    },
  });

  return (
    <form
      noValidate
      className="form"
      onSubmit={handleSubmit((formData) =>
        mutate({ formData, role, type: "login" })
      )}
    >
      <div className="space-y-2">
        <Input
          label="Username"
          name="username"
          type="text"
          focus
          register={register}
          error={errors.username?.message?.toString()}
        />
      </div>

      <div className="space-y-2">
        <PasswordField
          signin
          label="Password"
          name="password"
          register={register}
          error={errors.password?.message?.toString()}
        />
      </div>

      <div className="text-center">
        <Button disabled={isPending} className="w-1/2">
          {isPending && (
            <>
              <RotateCw className="rotate" />
            </>
          )}
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
