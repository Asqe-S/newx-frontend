import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { TAuthSubmit, Targs, Ttoken } from "../types";
import { saveToken } from "../auth/signin";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const axiosApi = axios.create({
  baseURL,
});


const refreshAccessToken = async (refreshToken: string) => {
  try {
    const { data } = await axios.post(`${baseURL}auth/refresh/`, {
      refresh: refreshToken,
    });
    const { access, refresh } = data;
    saveToken("access", access);
    saveToken("refresh", refresh);
    return access;
  } catch (error) {
    throw new Error("Failed to refresh access token");
  }
};

axiosApi.interceptors.request.use(async (config) => {
  const access = Cookies.get("access");
  const refresh = Cookies.get("refresh");

  if (!access || !refresh) {
    return config;
  }

  try {
    const decodedAccessToken: Ttoken = jwtDecode(access);

    if (!decodedAccessToken.exp) {
      return config;
    }

    const expired =
      new Date().getTime() >= decodedAccessToken.exp * 1000 - 3 * 60 * 1000;

    if (expired) {
      console.log("Token expired. Refreshing...");
      const newAccessToken = await refreshAccessToken(refresh);
      config.headers.Authorization = `Bearer ${newAccessToken}`;
    } else {
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});





export const errorHandle = (error: any) => {
  if (error.response?.data) {
    const errorMessages = Object.values(error.response.data).join(" \n");
    toast.error(errorMessages);
  } else {
    toast.error("Network Error: Unable to process your request at the moment.");
  }
};


export const authSubmit = async ({ formData, role, type }: TAuthSubmit) => {
  try {
    const response = await axiosApi.post(`auth/${type}/${role}/`, formData);
    return response;
  } catch (error: any) {
    errorHandle(error);
    throw error;
  }
};


export const checkUidToken = async (
  uid: string | undefined,
  token: string | undefined,
  type: "verify-otp" | "resend-otp" | "reset-password"
) => {
  try {
    const response = await axiosApi.get(`auth/${type}/${uid}/${token}/`);
    return response;
  } catch (error) {
    errorHandle(error);
    throw error;
  }
};
export const otpandPasswordSubmit = async ({
  uid,
  token,
  formData,
  type,
}: Targs) => {
  try {
    const response = await axiosApi.post(
      `auth/${type}/${uid}/${token}/`,
      formData
    );
    return response;
  } catch (error) {
    errorHandle(error);
    throw error;
  }
};
export const forgotPassSubmit = async (formData: any) => {
  try {
    const response = await axiosApi.post("auth/forgot-password/", formData);
    return response;
  } catch (error) {
    errorHandle(error);
    throw error;
  }
};