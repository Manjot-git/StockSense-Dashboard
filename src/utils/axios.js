import axios from "axios";

const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080/api"       // local backend
    : "https://stocksense-backend-9ha1.onrender.com/api"; // deployed backend

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // send cookies for login/auth
});

export default axiosInstance;
