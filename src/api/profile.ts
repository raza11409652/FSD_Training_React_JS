import axiosI from "./axios";

// Get Logged in user
const getUserProfile = async () => {
  const { data } = await axiosI.get<UserProfile>("auth/profile");
  //   console.log(data);
  return data;
};
export default getUserProfile;
