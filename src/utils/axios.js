import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // backend
  withCredentials: true,
});

export default axiosInstance;
