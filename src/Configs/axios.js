import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "http://localhost:5001/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:5001/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);
