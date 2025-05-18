import { NavLink } from "react-router-dom";
import {
  // HomeOutlined,
  SettingOutlined,
  FileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import usePermission from "../hooks/usePermission";

const SideMenu = () => {
  const { users } = usePermission() || { users: { read: false } };
  return (
    <div className="app-side-menu">
      <ul>
        {/* <li>
          <NavLink to={"/"}>
            <HomeOutlined />
            <span className="label">Home</span>
          </NavLink>
        </li> */}
        <li>
          <NavLink to={"/projects"}>
            <SettingOutlined />
            <span className="label">Projects</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/tasks"}>
            <FileOutlined />
            <span className="label">Tasks</span>
          </NavLink>
        </li>
        {users.read === true ? (
          <li>
            <NavLink to={"/users"}>
              <UserOutlined />
              <span className="label">Users</span>
            </NavLink>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};
export default SideMenu;
