// import { UserApiResponse } from "../@types";
import axiosI from "./axios";

const getUserRecords = async () => {
  const { data } = await axiosI.get<UserApiResponse>(`users/?page=1&size=1000`);
  return data;
};

const updateUserData = async (body: UserUpdateBody, id: string) => {
  const { data } = await axiosI.put(`users/${id}`, body);
  return data;
};
export { getUserRecords, updateUserData };
