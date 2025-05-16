import React from "react";
import { useAppSelector } from "../slice";

const usePermission = () => {
  let role = useAppSelector((a) => a.auth.user?.role);
  role = role ? role.toUpperCase() : undefined;
  // console.log({ role });
  const obj = React.useMemo(() => {
    const obj = {
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
        update: role === "ADMIN" || role === "TASK_CREATOR" || role === "USER",
        delete: role === "ADMIN",
      },
      users: {
        read: role === "ADMIN",
        create: role === "ADMIN",
        update: role === "ADMIN",
        delete: role === "ADMIN",
      },
    };
    return obj;
  }, [role]);
  // console.log(role, obj);
  return obj;
};
export default usePermission;
