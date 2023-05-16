import axios from "axios";
import { getCookie } from "./src/hooks/AppCookies";

// get the token
const token =
  localStorage.getItem("x-auth-token") ||
  sessionStorage.getItem("x-auth-token");
const axiosInstance = axios.create({
  baseURL: "/api/",
  headers: {
    "x-auth-token": token,
  },
});

export default axiosInstance;
