import { Button, Form, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../slice";

import {
  deleteProjectAction,
  getProjectsAction,
} from "../../slice/reducer/project";

const DeleteProject = (props: any) => {
  const dispatch = useAppDispatch();
  const { open, onClose, deleteID } = props;
  const { loadingDelete } = useAppSelector((a) => a.project);
  const [form] = Form.useForm();
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
      title="Delete project"
      children={
        <>
          <Form onFinish={handleFormSubmit} layout="vertical" form={form}>
            <span>
              Are you sure, you want to delete project {deleteID.name}
            </span>
            <Form.Item>
              <Button htmlType="submit" loading={loadingDelete}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </>
      }
      //   onClose={props.onClose}
      onCancel={() => onClose()}
    />
  );
};
export default DeleteProject;
