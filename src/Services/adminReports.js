import { axiosPrivate } from "../Configs/axios";
import toast from "react-hot-toast";

export const getReports = () => {
  return axiosPrivate
    .get("admin/reports")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};
