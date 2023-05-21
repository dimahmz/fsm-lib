import axios from "axios";
import { getCookie } from "./src/hooks/AppCookies";

// get the token
const token = getCookie("csrftoken");

const axiosInstance = axios.create({
  headers: {
    "X-CSRFToken": token,
  },
});

export default axiosInstance;
