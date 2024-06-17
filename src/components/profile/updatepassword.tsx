import { ChevronLeft } from "lucide-react";
import { TProfileProps } from "../types";
import Button from "../ui/button";
import ChangePassword from "../auth/change-password";

const UpdatePassword = ({ close, updateUser }: TProfileProps) => {
  return (
    <>
      <div className="sticky-top ">
        <Button
          variant="btn-link"
          autoFocus
          disabled={updateUser.isPending}
          onClick={close}
        >
          <ChevronLeft />
          Back
        </Button>
      </div>
      <div className="w-10/12 max-w-md mx-auto bg-background px-2 py-4 rounded-md">
        <ChangePassword mutation={updateUser} />
      </div>
    </>
  );
};

export default UpdatePassword;
