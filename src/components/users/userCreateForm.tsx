import { Button, Form, Input, message, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../slice";
import { createUserAction } from "../../slice/reducer/user";
import React from "react";
interface Props {
  close: () => void;
}
const UserCreateForm: React.FC<Props> = ({ close }) => {
  const initialValues: UserCreateBody = { email: "", name: "", role: "" };
  const roles = [
    { key: "ADMIN", title: "Admin" },
    { key: "TASK_CREATOR", title: "Task Creator" },
    { key: "USER", title: "User" },
  ];
  const loading = useAppSelector((a) => a.user.loadingCreate);
  const dispatch = useAppDispatch();
  const handleSubmit = (a: UserCreateBody) => {
    dispatch(createUserAction({ body: a }))
      .then((data) => {
        if (data.meta.requestStatus === "fulfilled") {
          message.open({ type: "success", content: "Profile created" });
        }
      })
      .finally(() => close());
  };
  return (
    <>
      <Form
        layout="vertical"
        requiredMark={false}
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Email"
          name={"email"}
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Should be a valid email" },
          ]}
        >
          <Input placeholder="example@email.com" />
        </Form.Item>
        <Form.Item
          label="Name"
          name={"name"}
          rules={[
            { required: true, message: "Name is required" },
            { type: "string", message: "Should be a valid string" },
          ]}
        >
          <Input placeholder="example@email.com" />
        </Form.Item>
        <Form.Item
          name={"role"}
          label="Select Role"
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
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default UserCreateForm;
