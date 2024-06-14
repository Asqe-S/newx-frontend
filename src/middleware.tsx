import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Ttoken } from "./components/types";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const access = request.cookies.get("access");
  const refresh = request.cookies.get("refresh");

  let accessToken: Ttoken = {};
  let refreshToken: Ttoken = {};
  if (access && refresh) {
    try {
      accessToken = jwtDecode(access.value);
      refreshToken = jwtDecode(refresh.value);
    } catch {
      request.cookies.delete("access");
      request.cookies.delete("refresh");
    }
  }

  const redirect = (path: string) => {
    return NextResponse.redirect(new URL(path, request.url));
  };
  const rewrite = (path: string) => {
    return NextResponse.rewrite(new URL(path, request.url));
  };

  if (pathname.startsWith("/auth")) {
    if (accessToken.role) {
      return redirect(`/${accessToken.role}`);
    }
  }

  if (pathname.startsWith("/user")) {
    if (!refreshToken.role) {
      return rewrite("/auth/signin/user");
    }
    if (refreshToken.role !== "user") {
      return redirect(`/${accessToken.role}`);
    }
  }

  if (pathname.startsWith("/merchant")) {
    if (!refreshToken.role) {
      return rewrite("/auth/signin/merchant");
    }
    if (refreshToken.role !== "merchant") {
      return redirect(`/${accessToken.role}`);
    }
  }

  if (pathname.startsWith("/superuser")) {
    if (!refreshToken.role) {
      return rewrite("/auth/signin/superuser");
    }
    if (refreshToken.role !== "superuser") {
      return redirect(`/${accessToken.role}`);
    }
  }
}
