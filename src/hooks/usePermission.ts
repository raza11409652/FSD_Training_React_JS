import { useAppSelector } from "../slice";

const usePermission = () => {
  let role = useAppSelector((a) => a.auth.user?.role);
  role = role ? role.toUpperCase() : undefined;
  return {
    projects: {
      // Project can be read for any of the user
      read: true,
      create: role === "ADMIN",
      update: role === "ADMIN",
      delete: role === "ADMIN",
    },
    tasks: {
      read: true,
      create: role === "ADMIN" || role === "TASK_CREATOR",
      update: role === "ADMIN" || role === "TASK_CREATOR",
      delete: role === "ADMIN",
    },
    users: {
      read: role === "ADMIN",
      create: role === "ADMIN",
      update: role === "ADMIN",
      delete: role === "ADMIN",
    },
  };
};
export default usePermission;
