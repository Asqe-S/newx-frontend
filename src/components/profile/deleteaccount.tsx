import { TProfileProps } from "../types";
import Cookies from "js-cookie";
import Button from "../ui/button";
import { ChevronLeft, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { DeleteUser } from "../backend/userapi";

export const RemoveToken = () => {
  Cookies.remove("access");
  Cookies.remove("refresh");
};

const DeleteAccount = ({ close }: TProfileProps) => {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const { isPending, mutate } = useMutation({
    mutationFn: DeleteUser,
    onSuccess: () => {
      router.replace("/");
      RemoveToken();
    },
  });

  return (
    <>
      <div className=" flex justify-center items-center size-full ">
        <div className="bg-red-700 text-destructive-foreground border border-border p-4 rounded-md w-11/12 max-w-sm space-y-4">
          <h2 className="auth-head"> Delete Account</h2>
          <div className="space-y-3 text-center">
            <p> Are you sure you want to proceed?</p>
            <p className="text-balance">
              This action cannot be undone. It will permanently delete your
              account and remove all associated data from our servers.
            </p>
            <p> To confirm, please type</p>
            <p className="font-bold">DELETE ACCOUNT</p>
            <input
              autoFocus
              type="text"
              className="h-8 w-full flex bg-transparent border-b px-3 py-1 text-sm text-center  focus-visible:border-white"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          <div className="space-x-5 flex items-center">
            <Button className="w-1/2" disabled={isPending} onClick={close}>
              Cancel
            </Button>
            <Button
              variant="btn-destructive"
              className="w-1/2"
              disabled={inputText !== "DELETE ACCOUNT" || isPending}
              onClick={() => mutate()}
            >
              {isPending ? (
                <>
                  <RotateCw className="rotate-icon" />
                  <span className="animate-pulse">Deleting ...</span>
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
