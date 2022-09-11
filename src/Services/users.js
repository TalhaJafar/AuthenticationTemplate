import { axiosPublic, axiosPrivate } from "../Configs/axios";
import toast from "react-hot-toast";
export const getSystemAccess = (email) => {
  return axiosPublic
    .post("users/getToken", { email })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      toast.error("Access Failed");
    });
};

export const getUser = () => {
  return axiosPrivate
    .get("users/getUser")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      toast.error("Invalid Access Token");
    });
};
