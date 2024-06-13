"use client";
import { motion, MotionProps } from "framer-motion";

type ButtonProps = {
  variant?: "btn-default" | "btn-destructive" | "btn-ghost" | "btn-link";
  size?: "btn-small" | "btn-icon";
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps;

const Button: React.FC<ButtonProps> = ({
  variant = "btn-default",
  size = "btn-small",
  className = "",
  children,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      whileFocus={{ scale: 1.1 }}
      className={`btn ${variant} ${size} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
