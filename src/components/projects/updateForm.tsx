import { Button, Form, Input, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../slice";

import {
  getProjectsAction,
  updateProjectAction,
} from "../../slice/reducer/project";
import { useEffect } from "react";

const UpdateNewProject = (props: any) => {
  const dispatch = useAppDispatch();
  const { open, onClose, projectData } = props;
  const { loadingUpdate } = useAppSelector((a) => a.project);
  const obj: ProjectBody = {
    name: projectData.name,
    description: projectData.description,
  };
  const [form] = Form.useForm();

  useEffect(() => {
    if (projectData && open) {
      form.setFieldsValue({
        name: projectData.name,
        description: projectData.description,
      });
    }
  }, [projectData, open]);

  // Update Project Submit Functionality
  const handleFormSubmit = (p: ProjectBody) => {
    const updateBody: UpdatePayload = {
      id: projectData.id,
      body: p,
    };
    dispatch(updateProjectAction(updateBody)).then((a) => {
      if (a.meta.requestStatus === "fulfilled") {
        form.resetFields();
        props.onClose(true);
        dispatch(getProjectsAction());
      }
    });
  };
  return (
    <Modal
      footer={null}
      open={open}
      title="Update project"
      children={
        <>
          <Form
            onFinish={handleFormSubmit}
            layout="vertical"
            initialValues={obj}
            form={form}
          >
            <Form.Item
              name={"name"}
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
              <Button
                htmlType="submit"
                loading={loadingUpdate}
                color="volcano"
                variant="filled"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </>
      }
      onCancel={() => onClose()}
    />
  );
};
export default UpdateNewProject;
