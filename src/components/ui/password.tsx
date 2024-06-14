import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { TInputprops } from "../types";
const PasswordField = ({
  signin,
  name,
  register,
  focus,
  label,
  error,
}: TInputprops) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {signin ? (
        <div className="flex justify-between items-center ">
          <label
            htmlFor={name}
            className={`label ${error ? "text-red-500" : ""}`}
          >
            {label}
          </label>
          <Link className="link " href={"/auth/forgot-password"}>
            forgot password?.
          </Link>
        </div>
      ) : (
        <label
          htmlFor={name}
          className={`label ${error ? "text-red-500" : ""}`}
        >
          {label}
        </label>
      )}

      <div className="relative ">
        <input
          type={showPassword ? "text" : "password"}
          autoFocus={focus}
          id={name}
          className={`input ${
            error ? "border-red-500 focus-visible:ring-red-700" : ""
          }`}
          {...register(name)}
        />
        <button
          tabIndex={-1}
          className={`absolute  right-2 bottom-1 bg-background size-6 btn  ${
            error && "text-red-500"
          }`}
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </>
  );
};

export default PasswordField;
