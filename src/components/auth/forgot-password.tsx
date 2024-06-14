"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ForgotPassSchema } from "./form-data";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { RotateCw } from "lucide-react";
import { forgotPassSubmit } from "../backend/un-authapi";
import Input from "../ui/input";
import Button from "../ui/button";

const ForgotPasswordForm = () => {
      const router = useRouter();

      const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(ForgotPassSchema),
        mode: "onChange",
      });

      const { mutate, isPending } = useMutation({
        mutationFn: forgotPassSubmit,
        onSuccess: ({ data }) => {
          toast.success(
            "Password reset email has been sent. Please check your inbox."
          );
          router.replace(`/auth/signin/${data.pos}`);
        },
      });

  return (
    <form
      noValidate
      className="form"
      onSubmit={handleSubmit((formData) => mutate(formData))}
    >
      <div className="space-y-2">
        <Input
          label="Username or email"
          name="username"
          type="text"
          focus
          register={register}
          error={errors.username?.message?.toString()}
        />
      </div>
      <div className="text-center">
        <Button
          disabled={isPending}
          className="w-1/2"
          type="submit"
        >
          {isPending ? (
            <>
              <RotateCw className="rotate-icon" />
              <span className="animate-pulse">Sending Link ...</span>
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
