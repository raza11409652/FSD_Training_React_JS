import { Button, Form, Input, Modal } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../slice";
import { createProjectAction } from "../../slice/reducer/project";
interface Props {
  open: true | false;
  onClose: (refresh?: true | false) => void;
}
const CreateNewProject: React.FC<Props> = ({ ...props }) => {
  const dispatch = useAppDispatch();
  const { loadingSubmit } = useAppSelector((a) => a.project);
  const obj: ProjectBody = { title: "", description: "" };
  const [form] = Form.useForm();
  const handleFormSubmit = (p: ProjectBody) => {
    dispatch(createProjectAction(p)).then((a) => {
      if (a.meta.requestStatus === "fulfilled") {
        form.resetFields();
        props.onClose(true);
      }
    });
  };
  return (
    <Modal
      footer={null}
      open={props.open}
      title="Create new project"
      children={
        <>
          <Form
            onFinish={handleFormSubmit}
            layout="vertical"
            initialValues={obj}
            form={form}
          >
            <Form.Item
              name={"title"}
              label="Project name"
              rules={[{ required: true, message: "Project name is required" }]}
            >
              <Input name="title" />
            </Form.Item>
            <Form.Item
              name={"description"}
              label="Project description"
              rules={[
                { type: "string", message: "Description Should be string" },
              ]}
            >
              <Input.TextArea name="description" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" loading={loadingSubmit}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </>
      }
      //   onClose={props.onClose}
      onCancel={() => props.onClose()}
    />
  );
};
export default CreateNewProject;
