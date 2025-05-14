import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import getGCPLogin from "../api/auth";
import React from "react";
import { useAppSelector } from "../slice";
// import { useNavigate } from "react-router-dom";

const LoginContainer = () => {
  //   const navigation = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const isLoading = useAppSelector((a) => a.auth.loading);
  const authInit = async () => {
    try {
      setLoading(true);
      const response = await getGCPLogin();
      window.location.replace(response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="login-container">
        <Button
          loading={loading || isLoading}
          icon={<GoogleOutlined />}
          onClick={authInit}
        >
          Login with Google
        </Button>
      </div>
    </>
  );
};
export default LoginContainer;
