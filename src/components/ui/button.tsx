"use client";
import { motion } from "framer-motion";
import { TButtonProps } from "../types";

const Button: React.FC<TButtonProps> = ({
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
