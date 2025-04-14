// Get list of projects

import axiosI from "./axios";

const getListOfProjectsApi = async () => {
  const { data } = await axiosI.get<GetProjectResponse>(
    "projects?page=1&size=1000"
  );
  return data;
};
export { getListOfProjectsApi };
