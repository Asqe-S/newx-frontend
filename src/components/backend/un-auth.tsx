import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { TAuthSubmit } from "../types";

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