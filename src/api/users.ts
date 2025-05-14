// import { UserApiResponse } from "../@types";
import axiosI from "./axios";

const getUserRecords = async () => {
  const { data } = await axiosI.get<UserApiResponse>(`users/?page=1&size=1000`);
  return data;
};

/**
 *
 * @param body
 * @param id
 * @returns
 */
const updateUserData = async (body: UserUpdateBody, id: string) => {
  const { data } = await axiosI.put(`users/${id}`, body);
  return data;
};
/**
 *
 * @param body
 * @returns
 */
const createUser = async (body: UserCreateBody) => {
  const { data } = await axiosI.post(`users`, body);
  return data;
};
export { getUserRecords, updateUserData, createUser };
