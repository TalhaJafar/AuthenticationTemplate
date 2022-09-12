import { axiosPublic, axiosPrivate } from "../Configs/axios";
import toast from "react-hot-toast";



export const listMeals = () => {
  return axiosPublic
    .get("meals/list")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      toast.error("Invalid Access Token");
    });
};


export const addMeal = (entry) => {
    return axiosPrivate
      .post("meals/add",entry)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        toast.error("Invalid Access Token");
      });
  };

  export const updateMeal = (entry) => {
    return axiosPrivate
      .post("meals/update",entry)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        toast.error("Invalid Access Token");
      });
  };


  export const deleteMeal = (entry) => {
    return axiosPrivate
      .delete("foodEntry/delete",entry)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        toast.error("Invalid Access Token");
      });
  };