import React from "react";
import { Spin } from "antd";
import { setItemInLocal } from "../utils/localStorage";
// import { useAppDispatch } from "../slice";
const AuthInitContainer = () => {
  //   const navigation = useNavigate();
//   const dispatch = useAppDispatch();
  const queryParameters = new URLSearchParams(window.location.search);
  const session = queryParameters.get("session");
  const refresh = queryParameters.get("refresh");
  //   console.log({ session, refresh });
  React.useEffect(() => {
    // This should be added into local-storage
    if (session && refresh) {
      setItemInLocal("session-token", session);
      setItemInLocal("refresh-token", session);
    }
  }, [session, refresh]);
  return (
    <>
      <Spin />
    </>
  );
};
export default AuthInitContainer;
