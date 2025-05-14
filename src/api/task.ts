import axiosI from "./axios";

const getListOfTasksApi = async () => {
    const { data } = await axiosI.get<GetTaskResponse>(
      "tasks?page=1&size=100"
    );
    return data;
};
const createTaskApi = async (body: TaskBody) => {
    const { data } = await axiosI.post("tasks", body);
    return data;
};
const updateTaskApi = async (id: number | string, body: TaskBody) => {
    const { data } = await axiosI.put(`tasks/${id}`, body);
    return data;
};
  
const deleteTaskApi = async (id: number | string) => {
    const { data } = await axiosI.delete(`tasks/${id}`);
    return data;
};

export { getListOfTasksApi, createTaskApi, updateTaskApi, deleteTaskApi  };