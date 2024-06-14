"use client";
import ChangePassword from "@/components/auth/change-password";
import {
  checkUidToken,
  otpandPasswordSubmit,
} from "@/components/backend/un-authapi";
import {Loading} from "@/components/manage/loading";
import { TParams } from "@/components/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ResetPassword = ({ params: { uid, token } }: TParams) => {
  const router = useRouter();
  const [mount, setMount] = useState(false);

  const changePassword = useMutation({
    mutationFn: otpandPasswordSubmit,
    onSuccess: ({ data }) => {
      toast.success("Password has changed successfully");
      router.replace(`/auth/signin/${data.pos}`);
    },
  });
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await checkUidToken(uid, token, "reset-password");
//         setMount(true);
//       } catch {
//         router.replace("/");
//       }
//     };

//     fetchData();
//   }, []);

//   if (!mount) return <Loading />;

  return <ChangePassword mutation={changePassword} uid={uid} token={token} />;
};

export default ResetPassword;
