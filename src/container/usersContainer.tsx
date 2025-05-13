import { Button, message, Modal, Spin, Table } from "antd";
import ActionHeader from "../components/actionHeader";
import usePermission from "../hooks/usePermission";
import { EditFilled, PlusOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../slice";
import { getUserListAction, setCurrentUserAction } from "../slice/reducer/user";
import UserEditForm from "../components/users/userEditForm";

const UserContainer = () => {
  const [open, setOpen] = React.useState(false);
  const { loading, userResponse, user } = useAppSelector((a) => a.user);
  const { users } = usePermission();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserListAction());
  }, [dispatch]);
  const handleEdit = (user: User) => {
    dispatch(setCurrentUserAction(user));
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(getUserListAction());
    message.open({ type: "success", content: "Profile updated" });
  };
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
      <Table
        rowKey={"id"}
        dataSource={userResponse?.records || []}
        pagination={false}
        loading={loading}
        columns={[
          {
            dataIndex: "id",
            key: "id",
            title: "ID",
          },
          {
            dataIndex: "name",
            key: "name",
            title: "Name",
          },
          {
            dataIndex: "email",
            key: "email",
            title: "Email",
          },
          {
            dataIndex: "role",
            key: "role",
            title: "Role",
          },
          {
            dataIndex: "profileImage",
            key: "image",
            title: "Profile image",
            render: (i?: string) =>
              i ? (
                <a target="_blank" href={i}>
                  Image
                </a>
              ) : (
                "-"
              ),
          },
          {
            dataIndex: "id",
            key: "edit",
            title: "Edit",
            render: (_, user: User) => (
              <Button icon={<EditFilled />} onClick={() => handleEdit(user)}>
                Edit
              </Button>
            ),
          },
        ]}
      />
      <Modal
        open={open}
        children={
          user ? <UserEditForm user={user} close={handleClose} /> : <Spin />
        }
        title="Update user details"
        onCancel={() => setOpen(false)}
        footer={null}
      />
    </>
  );
};
export default UserContainer;
