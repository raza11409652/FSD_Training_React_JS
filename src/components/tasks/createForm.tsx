import { Modal } from "antd";
import React from "react";

interface Props {
  open: true | false;
  close: () => void;
}
const TaskCreateForm: React.FC<Props> = ({ ...props }) => {
  return (
    <Modal
      title="Create new task"
      open={props.open}
      children={<>{/* Form goes Here */}</>}
      footer={<></>}
      onCancel={props.close}
    />
  );
};
export default TaskCreateForm;
