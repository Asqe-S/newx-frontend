import { axiosApi, errorHandle } from "./un-authapi";

export const fetchProperties = async () => {
  try {
    const { data } = await axiosApi.get("properties/");
    return data;
  } catch (error) {
    errorHandle(error);
    throw error;
  }
};

export const addProperty = async (formData: any) => {
  try {
    const { data } = await axiosApi.post("properties/", formData);
    return data;
  } catch (error) {
    errorHandle(error);
    throw error;
  }
};

export const fetchProperty = async (lookup: string) => {
  try {
    const { data } = await axiosApi.get(`properties/${lookup}`);
    return data;
  } catch (error) {
    errorHandle(error);
    throw error;
  }
};
