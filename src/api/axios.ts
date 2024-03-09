import axios from "axios";
const BASE_URL = "https://groceteria-server.onrender.com/api/v1/";

const axiosConfig = {
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export default axios.create(axiosConfig);

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
