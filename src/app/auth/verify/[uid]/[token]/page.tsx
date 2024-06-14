"use client";
import { VerifyOtpSchema } from "@/components/auth/form-data";
import { checkUidToken, otpandPasswordSubmit } from "@/components/backend/un-authapi";
import {Loading} from "@/components/manage/loading";
import { TParams } from "@/components/types";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Verify = ({ params: { uid, token } }: TParams) => {
  const router = useRouter();
  const [mount, setMount] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(VerifyOtpSchema),
    mode: "onChange",
  });

  const resendOtp = useMutation({
    mutationFn: () => checkUidToken(uid, token, "resend-otp"),
    onSuccess: ({ data }) => {
      toast.success(data.message);
    },
  });

  const verifyOtp = useMutation({
    mutationFn: otpandPasswordSubmit,
    onSuccess: ({ data }) => {
      router.replace(`/auth/signin/${data.role}`);
      toast.success(data.message);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await checkUidToken(uid, token, "verify-otp");
        setMount(true);
      } catch {
        router.replace("/");
      }
    };

    fetchData();
  }, []);

  if (!mount) return <Loading />;

  return (
    <>
      <h2 className="auth-head">Verify your account</h2>
      <form
        noValidate
        className="form"
        onSubmit={handleSubmit((formData) => {
          formData.otp = parseInt(formData.otp);
          verifyOtp.mutate({ uid, token, formData, type: "verify-otp" });
        })}
      >
        <div className="space-y-2">
          <Input
            name="otp"
            label="Enter (OTP)"
            type="text"
            register={register}
            focus
            error={errors.otp?.message?.toString()}
          />
        </div>
        <div className="text-center">
          <Button
            disabled={verifyOtp.isPending || resendOtp.isPending}
            className="w-1/2"
          >
            {verifyOtp.isPending && (
              <>
                <RotateCw className="rotate-icon" />
              </>
            )}
            Verify
          </Button>
        </div>
      </form>

      <Button
        disabled={
          verifyOtp.isPending || resendOtp.isPending || resendOtp.isSuccess
        }
        variant="btn-link"
        onClick={() => {
          resendOtp.mutate();
        }}
      >
        {resendOtp.isPending ? (
          <>
            <RotateCw className="rotate-icon" />
            <span className="animate-pulse">Resending Otp ...</span>
          </>
        ) : (
          " Resend Otp"
        )}
      </Button>
    </>
  );
};

export default Verify;
