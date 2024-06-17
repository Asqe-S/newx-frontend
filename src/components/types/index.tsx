import { ReactNode } from "react";
import { MotionProps } from "framer-motion";

export type TChildren = {
  children: ReactNode;
};

export type TModalProps = {
  children: TChildren["children"];
  isOpen: boolean;
  variant?: "NavbarVariant" | "ModalVariant";
};

export type TButtonProps = {
  variant?: "btn-default" | "btn-destructive" | "btn-ghost" | "btn-link";
  size?: "btn-small" | "btn-icon";
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps;

export type TRole = {
  role?: "merchant" | "superuser" | "user";
};
export type TUidToken = {
  uid: string;
  token: string;
};

export type TParams = {
  params: TRole & TUidToken;
};

export type TInputprops = {
  name: string;
  label: string;
  register?: any;
  focus?: boolean;
  type?: string;
  error?: string;
  disabled?: boolean;
  signin?: boolean;
};

export type TRegisterField = {
  name: "username" | "email" | "password" | "confirm_password";
  type: "text" | "email" | "password";
  label: "Username" | "Password" | "Email" | "Confirm password";
};

export type TAuthSubmit = {
  formData: any;
  role: TRole["role"];
  type: "register" | "login";
};

export type Targs = {
  formData: any;
  type: "verify-otp" | "reset-password";
} & TUidToken;

export type Ttoken = {
  exp?: number;
  is_blocked?: boolean;
} & TRole;

export type TProfileProps = {
  close?: () => void;
  updateUser?: any;
  profile_picture?: string;
};



export type TPropertyField = {
  name: "city" | "state" | "name"  | "longitude" | "latitude";
  type: "text";
  label: "Name of the property" | "City" | "State" | "Longitude" | "Latitude";
};


export type TPropertyPhoto = {
  id: number;
  photo: string;
};
export type TProperty = {
  city: string;
  id: number;
  latitude: string;
  longitude: string;
  name: string;
  photos: TPropertyPhoto[];
  state: string;
};
