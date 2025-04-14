import React from "react";
import { Button, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider collapsedWidth="0">{/* Logo   & Menu */}</Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          children={
            <div className="header-action-container ">
              <Button color="danger" variant="solid" icon={<LogoutOutlined />}>
                Logout
              </Button>
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
