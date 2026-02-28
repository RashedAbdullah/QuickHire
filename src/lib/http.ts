import axios from "axios";
import { Environment } from "@/config/env.config";

const http = axios.create({
  baseURL: Environment.API_URL,
  withCredentials: true,
});

http.interceptors.request.use(async (config) => {
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }
  config.headers["Cache-Control"] = "no-cache";
  config.headers["Expires"] = "0";
  config.headers["Pragma"] = "no-cache";

  return config;
});

export default http;
