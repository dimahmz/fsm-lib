import axios from "axios";
import { getCookie } from "../hooks/AppCookies";

const token = getCookie("token");

const axiosInstance = axios.create({
  baseURL: "localhost:3000",
  headers: {
    "x-auth-token": token,
  },
});

export default axiosInstance;
