import React from "react";
import { Button, Layout, theme, Typography } from "antd";
import { Outlet } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../slice";
import { logoutAction } from "../slice/reducer/auth";
import SideMenu from "../components/sideMenu";
const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    token: { colorBgContainer, colorWhite },
  } = theme.useToken();
  const logoutClickHandler = () => dispatch(logoutAction());
  const userProfile = useAppSelector((a) => a.auth.user);
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider collapsedWidth="0" style={{ background: colorWhite }}>
        {/* Logo   & Menu */}
        <SideMenu />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          children={
            <div className="header-action-container ">
              <Button
                color="danger"
                variant="solid"
                icon={<LogoutOutlined />}
                onClick={logoutClickHandler}
              >
                Logout
              </Button>
              <Typography.Text style={{ marginRight: "10px" }}>
                {userProfile?.name || ""} - ({userProfile?.role || ""})
              </Typography.Text>
            </div>
          }
        />
        <Content style={{ margin: "24px 16px 0" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
