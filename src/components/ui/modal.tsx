"use client";

import { TModalProps } from "../types";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  NavbarVariant: {
    initial: {
      x: 100,
      opacity: 0,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: { x: 100, opacity: 0 },
  },
  ModalVariant: {
    initial: {
      y: -100,
      opacity: 0,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: { y: -100, opacity: 0 },
  },
};

const Modal = ({ isOpen, children, variant = "ModalVariant" }: TModalProps) => {
  const [showModal, setModal] = useState(false);
  const modalRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    modalRef.current = document.getElementById("modal");
    setModal(true);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]):not(.hidden), textarea:not([disabled]), select:not([disabled]), details:not([disabled]), [tabindex]:not([tabindex="-1"]), label'
        );
        if (focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[
            focusableElements.length - 1
          ] as HTMLElement;
          if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          } else if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        }
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyPress);
    } else {
      window.removeEventListener("keydown", handleKeyPress);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen]);

  if (!showModal) return null;

  return (
    <>
      {modalRef.current &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div className="fixed inset-0 z-50 bg-black/60">
                <motion.div
                  variants={variants[variant]}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.35 }}
                  className="fixed inset-0 max-w-[95.5rem] mx-auto  min-h-screen overflow-scroll "
                >
                  {children}
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          modalRef.current
        )}
    </>
  );
};

export default Modal;
