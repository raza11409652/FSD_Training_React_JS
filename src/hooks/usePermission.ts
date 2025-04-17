import { useAppSelector } from "../slice";

const usePermission = () => {
  const role = useAppSelector((a) => a.auth.user?.role);
  return {
    projects: {
      // Project can be read for any of the user
      read: true,
      create: role === "ADMIN",
    },
  };
};
export default usePermission;
