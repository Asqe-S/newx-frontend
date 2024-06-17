"use client";
import { useEffect, useState } from "react";
import ThemeToggler from "../theme/theme-toggler";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Modal from "../ui/modal";
import { usePathname } from "next/navigation";
import { merchantField, superuserField, userField } from "./nav-data";
import Button from "../ui/button";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

    useEffect(() => {
      if (isOpen) {
        setOpen(!isOpen);
      }
    }, [pathname]);

  let fields = userField;
  let link = "/";
  if (pathname.includes("superuser")) {
    fields = superuserField;
    link = "/superuser";
  }
  if (pathname.includes("merchant")) {
    fields = merchantField;
    link = "/merchant";
  }

  return (
    <>
      <header className="sticky-top flex items-center justify-around ">
        <Link className="text-2xl" href={link}>
          NEWX
        </Link>

        <div className="space-x-3 flex">
          <ThemeToggler />
          <Button size="btn-icon" onClick={() => setOpen(true)}>
            <Menu />
          </Button>
        </div>
      </header>
      <Modal isOpen={isOpen} variant="NavbarVariant">
        <div className="absolute right-0 top-0 w-3/4 max-w-md h-full border-l bg-background">
          <div className="relative w-4/6 mx-auto mt-16 space-y-1 ">
            <Button
              autoFocus
              className="absolute -top-12 -left-8"
              size="btn-icon"
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>
            {fields.map((field) => (
              <Link
                className={` rounded-md flex justify-center items-center w-full h-10 px-4 py-2 ${
                  field.link === pathname
                    ? "bg-accent text-accent-foreground     "
                    : "focus-visible:bg-accent focus-visible:text-accent-foreground hover:bg-accent hover:text-accent-foreground"
                } `}
                key={field.link}
                href={field.link}
              >
                {field.name}
              </Link>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Navbar;
