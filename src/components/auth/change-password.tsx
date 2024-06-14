import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { ChangePasswordSchema } from "./form-data";
import { RotateCw } from "lucide-react";
import PasswordField from "../ui/password";
import Button from "../ui/button";

const ChangePassword = ({
  mutation,
  uid,
  token,
}: {
  mutation: any;
  uid?: string;
  token?: string;
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
  });
  return (
    <>
      <p className="text-sm text-red-500 mb-3">
        Enter a new password that havent used before
      </p>
      <form
        onSubmit={handleSubmit((formData) => {
          if (uid && token) {
            mutation.mutate({
              uid,
              token,
              formData,
              type: "reset-password",
            });
          } else {
            mutation.mutate(formData);
          }
        })}
        noValidate
        className="form"
      >
        <div className="space-y-2">
          <PasswordField
            label="Password"
            name="password"
            register={register}
            focus
            error={errors.password?.message?.toString()}
          />
        </div>
        <div className="space-y-2">
          <PasswordField
            label="Confirm Password"
            name="confirm_password"
            register={register}
            error={errors.confirm_password?.message?.toString()}
          />
        </div>
        <div className="text-center">
          <Button
            disabled={mutation.isPending}
            className=" w-1/2"
          >
            {mutation.isPending && (
              <>
                <RotateCw className="rotate-icon" />
              </>
            )}
            Change Password
          </Button>
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
