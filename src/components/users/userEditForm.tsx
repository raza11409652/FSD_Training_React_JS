import { Button, Form, Input, Select } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../slice";
import { updateUserAction } from "../../slice/reducer/user";

interface Props {
  user: User;
  close: () => void;
}
const UserEditForm: React.FC<Props> = ({ user, close }) => {
  //   console.log(user);
  const dispatch = useAppDispatch();
  const body: UserUpdateBody = { name: user.name, role: user.role };
  //   console.log(body);
  const loading = useAppSelector((a) => a.user.loadingUpdate);
  const roles = [
    { key: "ADMIN", title: "Admin" },
    { key: "TASK_CREATOR", title: "Task Creator" },
    { key: "USER", title: "User" },
  ];
  const handleUpdate = (b: UserUpdateBody) => {
    dispatch(updateUserAction({ body: b, id: String(user.id) })).then(() => {
      close();
    });
  };
  return (
    <>
      <Form
        initialValues={body}
        layout="vertical"
        requiredMark={false}
        onFinish={handleUpdate}
      >
        <Form.Item
          name={"name"}
          label="Name"
          rules={[
            { required: true, message: "Name is required" },
            {
              type: "string",
              message: "Name should be valid string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"role"}
          label="Role"
          rules={[{ required: true, message: "Role is required" }]}
        >
          <Select
            options={roles.map((a) => {
              return { label: a.title, value: a.key };
            })}
          ></Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" loading={loading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default UserEditForm;
