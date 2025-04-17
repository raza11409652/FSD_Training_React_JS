import axiosI from "./axios";

const getGCPLogin = async () => {
  const { data } = await axiosI.get<string>("auth/gcp-login");
  return data;
};
export default getGCPLogin;
