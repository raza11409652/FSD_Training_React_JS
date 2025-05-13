import { Button } from "antd";
import ActionHeader from "../components/actionHeader";
import usePermission from "../hooks/usePermission";
import { PlusOutlined } from "@ant-design/icons";

const UserContainer = () => {
  const { users } = usePermission();
  return (
    <>
      <ActionHeader
        children={
          <>
            <Button
              icon={<PlusOutlined />}
              variant="solid"
              hidden={!users.create}
            >
              Add new user
            </Button>
          </>
        }
        title="User management"
      />
    </>
  );
};
export default UserContainer;
