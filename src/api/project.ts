// Get list of projects

import axiosI from "./axios";

const getListOfProjectsApi = async () => {
  const { data } = await axiosI.get<GetProjectResponse>(
    "projects?page=1&size=1000"
  );
  return data;
};

const createProjectApi = async (body: ProjectBody) => {
  const { data } = await axiosI.post("projects", body);
  return data;
};
export { getListOfProjectsApi, createProjectApi };
