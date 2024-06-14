import { axiosApi, errorHandle } from "./un-authapi";

export const fetchUserData = async () => {
  try {
    const { data } = await axiosApi.get("user-data/");
    return data;
  } catch (error) {
    errorHandle(error);
    throw error;
  }
};

export const updateUserData = async (FormData: any) => {
  try {
    const response = await axiosApi.patch("user-data/", FormData);
    return response;
  } catch (error) {
    errorHandle(error);
    throw error;
  }
};

export const DeleteUser = async () => {
  try {
    const response = await axiosApi.delete("user-data/");
    return response;
  } catch (error) {
    errorHandle(error);
    throw error;
  }
};
