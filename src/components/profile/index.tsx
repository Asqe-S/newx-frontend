"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchUserData, updateUserData } from "../backend/userapi";
import { Loading } from "../manage/loading";
import { UserError } from "../manage/errors";
import Picture from "./picture";
import Button from "../ui/button";
import { Camera } from "lucide-react";
import Modal from "../ui/modal";
import ProfilePicture from "./profilepicture";
import { toast } from "react-toastify";
import UpdatePassword from "./updatepassword";
import DeleteAccount, { RemoveToken } from "./deleteaccount";
import { TRole } from "../types";
import { motion } from "framer-motion";
// const aaa = {
//   initial: {
//     y: -100,
//     opacity: 0,
//   },
//   animate: {
//     opacity: 1,
//     y: 0,
//   },
//   exit: { y: -100, opacity: 0 },
// };

const Profile = ({ role }: TRole) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const setParams = (name: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("modal", name);
    router.replace(`${pathname}?${params.toString()}`);
  };
  const clearParams = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("modal");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const {
    data: userData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: () => fetchUserData(),
    retry: 2,
    staleTime: 10000,
  });

  const updateUser = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      toast.success("updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["userData"],
      });
      clearParams();
    },
  });

  if (isLoading) return <Loading />;

  if (error) return <UserError />;

  return (
    <>
      <motion.div
        initial={{
          scale: 0.8,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: {
            duration: .5,
            delay: .5,
          },
        }}
        className="flex flex-col items-center  space-y-2 mb-3"
      >
        <div className="relative">
          <div className="size-36 overflow-hidden rounded-full ring-1 ring-ring ring-offset-1 ring-offset-background brightness-90">
            <Picture profile_picture={userData.profile_picture} />
          </div>
          <Button
            size="btn-icon"
            className="rounded-full absolute bottom-2 right-1 "
            onClick={() => {
              setParams("photo");
            }}
          >
            <Camera className="size-5" />
          </Button>
        </div>
        <p>{userData.username}</p>
        <p>{userData.email}</p>
        <div className="space-x-3">
          <Button
            variant="btn-link"
            onClick={() => {
              RemoveToken();
              router.replace(`/auth/signin/${role}`);
            }}
          >
            Sign out
          </Button>
          <Button
            variant="btn-link"
            className=" text-red-500"
            onClick={() => {
              setParams("delete");
            }}
          >
            Delete account
          </Button>
          <Button
            variant="btn-link"
            onClick={() => {
              setParams("password");
            }}
          >
            Update password
          </Button>
        </div>
      </motion.div>
      <Modal isOpen={searchParams.get("modal") === "photo"}>
        <ProfilePicture
          close={clearParams}
          profile_picture={userData.profile_picture}
          updateUser={updateUser}
        />
      </Modal>
      <Modal isOpen={searchParams.get("modal") === "password"}>
        <UpdatePassword close={clearParams} updateUser={updateUser} />
      </Modal>
      <Modal isOpen={searchParams.get("modal") === "delete"}>
        <DeleteAccount close={clearParams} />
      </Modal>
    </>
  );
};

export default Profile;
