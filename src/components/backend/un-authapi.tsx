import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { TAuthSubmit, Targs } from "../types";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const axiosApi = axios.create({
  baseURL,
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