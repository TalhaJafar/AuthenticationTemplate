import { axiosPrivate } from "../Configs/axios";
import toast from "react-hot-toast";

export const getUserFoodEntries = (filters) => {
  return axiosPrivate
    .get("foodEntry/listEntries", { params: filters })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};

export const getAdminFoodEntries = (filters) => {
  return axiosPrivate
    .get("foodEntry/adminlist", { params: filters })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      throw new Error(error);
    });
};

export const addFoodEntry = (entry) => {
  return axiosPrivate
    .post("foodEntry/add", entry)
    .then((res) => {
      toast.success("Operation Finished");
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
    });
};

export const updateFoodEntry = (entry) => {
  return axiosPrivate
    .post("foodEntry/update", entry)
    .then((res) => {
      toast.success("Operation Finished");
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
    });
};

export const deleteFoodEntry = (entry) => {
  return axiosPrivate
    .delete("foodEntry/delete", { data: entry })
    .then((res) => {
      toast.success("Operation Finished");
      return res.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};
