import { axiosPrivate } from "../Configs/axios";
import toast from "react-hot-toast";



export const getUserFoodEntries = () => {
  return axiosPrivate
    .get("foodEntry/listEntries")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      toast.error("Invalid Access Token");
    });
};


export const getAdminFoodEntries = () => {
  return axiosPrivate
    .get("foodEntry/adminlist")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      toast.error("Invalid Access Token");
    });
};


export const addFoodEntry = (entry) => {
    return axiosPrivate
      .post("foodEntry/add",entry)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        toast.error("Invalid Access Token");
      });
  };

  export const updateFoodEntry = (entry) => {
    return axiosPrivate
      .post("foodEntry/update",entry)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        toast.error("Invalid Access Token");
      });
  };


  export const deleteFoodEntry = (entry) => {
    return axiosPrivate
      .delete("foodEntry/delete",entry)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        toast.error("Invalid Access Token");
      });
  };