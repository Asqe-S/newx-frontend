import { z } from "zod";
import { TRegisterField } from "../types";
export const combinedRegex =
  /^(?=.*[a-zA-Z])[a-zA-Z0-9_.-]{4,30}$|^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_.-]{4,30}$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_+=\-[\]{}|\\:;"'<>,.?/~]{8,30}$/;
export const otpRegex = /^\d{6}$/;

export const registerField: TRegisterField[] = [
  { name: "username", type: "text", label: "Username" },
  { name: "email", type: "email", label: "Email" },
  { name: "password", type: "password", label: "Password" },
  { name: "confirm_password", type: "password", label: "Confirm password" },
];

export const RegisterSchema = z
  .object({
    username: z.string().regex(usernameRegex, {
      message: "Please provide a valid username.",
    }),
    email: z.string().regex(emailRegex, {
      message: "Please provide a valid email address.",
    }),
    password: z.string().regex(passwordRegex, {
      message:
        "Invalid password format. It must be 8-30 characters long and include at least one lowercase letter, one uppercase letter, and one digit.",
    }),
    confirm_password: z.string().regex(passwordRegex, {
      message: "Invalid password format.",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Oops! Confirm password doesn't match",
    path: ["confirm_password"],
  });

  export const SignInSchema = z.object({
    username: z.string().regex(combinedRegex, {
      message: "Please provide a valid username or email.",
    }),

    password: z.string().regex(passwordRegex, {
      message:
        "Invalid password format. It must be 8-30 characters long and include at least one lowercase letter, one uppercase letter, and one digit.",
    }),
  });