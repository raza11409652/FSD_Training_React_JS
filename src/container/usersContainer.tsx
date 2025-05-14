import { Button, Modal, Spin, Table } from "antd";
import ActionHeader from "../components/actionHeader";
import usePermission from "../hooks/usePermission";
import { EditFilled, PlusOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../slice";
import { getUserListAction, setCurrentUserAction } from "../slice/reducer/user";
import UserEditForm from "../components/users/userEditForm";
import UserCreateForm from "../components/users/userCreateForm";

const UserContainer = () => {
  const [open, setOpen] = React.useState(false);
  const [openNewUser, setOpenNewUser] = React.useState(false);

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
  const handleClose = (type: "edit" | "new", refresh = true) => {
    if (type === "edit") {
      dispatch(setCurrentUserAction());
      setOpen(false);
    } else {
      setOpenNewUser(false);
    }
    if (refresh) dispatch(getUserListAction());
  };
  return (
    <>
      <ActionHeader
        children={
          <>
            {users.create ? (
              <Button
                onClick={() => setOpenNewUser(true)}
                icon={<PlusOutlined />}
                variant="solid"
              >
                Add new user
              </Button>
            ) : null}
          </>
        }
        title="User management"
      />
      <Table
        rowKey={"id"}
        dataSource={userResponse?.records || []}
        pagination={false}
        loading={loading}
        scroll={{ y: "70vh" }}
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
        destroyOnClose
        open={open}
        children={
          user ? (
            <UserEditForm user={user} close={() => handleClose("edit")} />
          ) : (
            <Spin />
          )
        }
        title="Update user details"
        onCancel={() => handleClose("edit", false)}
        footer={null}
      />
      <Modal
        destroyOnClose
        open={openNewUser}
        children={<UserCreateForm close={() => handleClose("new")} />}
        title="Add new user"
        onCancel={() => setOpenNewUser(false)}
        footer={null}
      />
    </>
  );
};
export default UserContainer;
