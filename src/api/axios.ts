import axios from "axios";

const axiosI = axios.create({ baseURL: "https://fsd-training-backend-node.onrender.com/v1/" });

export default axiosI;
