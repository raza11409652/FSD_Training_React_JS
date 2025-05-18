import React from "react";
import { useAppSelector } from "../slice";

const usePermission = () => {
  const permission = useAppSelector((a) => a.auth.permission);
  const obj = React.useMemo(() => {
    return permission;
  }, [permission]);
  return obj;
};
export default usePermission;
