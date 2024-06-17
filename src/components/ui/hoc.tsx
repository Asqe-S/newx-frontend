"use client";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { TChildren, Ttoken } from "../types";
import Blocked from "../manage/blocked";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const decodedTokens = () => {
  const access = Cookies.get("access");
  const refresh = Cookies.get("refresh");
  let accessToken = {};
  let refreshToken = {};
  if (access && refresh) {
    try {
      const accessToken = jwtDecode(access);
      const refreshToken = jwtDecode(refresh);
      if (refreshToken.exp) {
        const expired =
          new Date().getTime() >= refreshToken.exp * 1000 - 3 * 60 * 1000;
        if (expired) {
          toast.error("Haven't used for long days try to login again");
          throw new Error("Refresh token expired");
        }
      }
      return { accessToken, refreshToken };
    } catch {
      Cookies.remove("access");
      Cookies.remove("refresh");
    }
  }
  return { accessToken, refreshToken };
};

const Hoc = ({ children }: TChildren) => {
  const pathname = usePathname();
  const [mount, setMount] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const { accessToken }: { accessToken: Ttoken } = decodedTokens();

    if (accessToken.is_blocked) {
      setIsBlocked(true);
    }
    setMount(true);
  }, [pathname]);

  if (isBlocked) {
    return <Blocked />;
  }

  if (!mount) {
    return null;
  }

  return <>{children}</>;
};

export default Hoc;
