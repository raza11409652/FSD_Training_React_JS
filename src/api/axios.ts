import axios from "axios";
import { getItemFromLocal } from "../utils/localStorage";

const axiosI = axios.create({
  baseURL: "https://fsd-training-backend-node.onrender.com/v1/",
});
axiosI.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: any) => {
    const token = getItemFromLocal("session-token");
    // console.log({ token });

    return {
      ...config,
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    };
  },
  (e) => Promise.reject(e)
);

export default axiosI;
