import { Button, Form, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../slice";
import { QuestionCircleTwoTone, WarningTwoTone } from "@ant-design/icons";

import {
  deleteProjectAction,
  getProjectsAction,
} from "../../slice/reducer/project";

const DeleteProject = (props: any) => {
  const dispatch = useAppDispatch();
  const { open, onClose, deleteID } = props;
  const { loadingDelete } = useAppSelector((a) => a.project);
  const [form] = Form.useForm();

  // Delete Project Submit Functionality
  const handleFormSubmit = () => {
    dispatch(deleteProjectAction(deleteID.id)).then((a) => {
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
      title={
        <div>
          Delete project <WarningTwoTone />
        </div>
      }
      children={
        <>
          <Form onFinish={handleFormSubmit} layout="vertical" form={form}>
            <div style={{ marginBottom: "1rem" }}>
              <span>Are you sure, you want to delete </span>{" "}
              <span style={{ fontWeight: 600, color: "#FF0000" }}>
                {deleteID.name}
              </span>{" "}
              <QuestionCircleTwoTone />
            </div>
            <Form.Item>
              <Button
                htmlType="submit"
                loading={loadingDelete}
                color="volcano"
                variant="filled"
              >
                Delete
              </Button>
            </Form.Item>
          </Form>
        </>
      }
      onCancel={() => onClose()}
    />
  );
};
export default DeleteProject;
