import { Button, Form, Input, Modal } from "antd";
import React from "react";
interface Props {
  open: true | false;
  onClose: () => void;
}
const CreateNewProject: React.FC<Props> = ({ ...props }) => {
  return (
    <Modal
      footer={null}
      open={props.open}
      title="Create new project"
      children={
        <>
          <Form layout="vertical">
            <Form.Item label="Project name">
              <Input name="title" />
            </Form.Item>
            <Form.Item label="Project description">
              <Input.TextArea name="description" />
            </Form.Item>
            <Form.Item>
              <Button>Save</Button>
            </Form.Item>
          </Form>
        </>
      }
      //   onClose={props.onClose}
      onCancel={props.onClose}
    />
  );
};
export default CreateNewProject;
