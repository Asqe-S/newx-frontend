import { ReactNode } from "react";

export type TModalProps = {
  children: ReactNode;
  isOpen: boolean;
  variant: "NavbarVariant" | "ModalVariant";
};
