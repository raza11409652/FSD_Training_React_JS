// import { PresetColorType } from "antd/es/theme/internal";

const getTaskStatusTag = (status: TaskStatus): string | undefined => {
  if (status === "COMPLETED") return "green";
  else if (status === "CREATED" || status === "ON HOLD") return "blue";
  else if (status === "IN PROGRESS") return "gold";
  return undefined;
};
export default getTaskStatusTag;
