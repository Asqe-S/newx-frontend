import { axiosApi, errorHandle } from "./un-authapi";

export const fetchProperties = async (lookup?: string | number) => {
  try {
    if (lookup) {
      const { data } = await axiosApi.get(`properties/${lookup}`);
      return data;
    } else {
      const { data } = await axiosApi.get("properties/");
      return data;
    }
  } catch (error) {
    errorHandle(error);
    throw error;
  }
};


export const addProperty = async ({
  id,
  formData,
}: {
  id?: number;
  formData: any;
}) => {
  try {
    if (id) {
      const { data } = await axiosApi.post(
        `properties/property-photo/${id}/`,
        formData
      );
      return data;
    } else {
      const { data } = await axiosApi.post("properties/", formData);
      return data;
    }
  } catch (error) {
    errorHandle(error);
    throw error;
  }
};

export const PatchProperty = async ({
  id,
  formData,
}: {
  id?: number;
  formData: any;
}) => {
  try {
    const { data } = await axiosApi.patch(`properties/${id}/`, formData);
    return data;
  } catch (error) {
    errorHandle(error);
    throw error;
  }
};

export const deleteProperties = async ({
  id,
  property,
}: {
  id: number;
  property?: boolean;
}) => {
  try {
    if (property) {
      const { data } = await axiosApi.delete(`properties/${id}`);
      return data;
    } else {
      const { data } = await axiosApi.delete(`properties/property-photo/${id}`);
      return data;
    }
  } catch (error) {
    errorHandle(error);
    throw error;
  }
};
