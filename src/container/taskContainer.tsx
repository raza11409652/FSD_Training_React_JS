import { Button } from "antd";
import ActionHeader from "../components/actionHeader";
import { PlusOutlined } from "@ant-design/icons";
import TaskCreateForm from "../components/tasks/createForm";
import React from "react";

const TaskContainer = () => {
  const [open, setOpen] = React.useState(false);
  // Load tasks related to logged-in user account
  return (
    <>
      <ActionHeader
        title="Tasks"
        children={
          <>
            <Button
              variant="filled"
              color="volcano"
              icon={<PlusOutlined />}
              onClick={() => setOpen(true)}
            >
              Create new task
            </Button>
          </>
        }
      />
      {/* Table Goes here */}

      <TaskCreateForm open={open} close={() => setOpen(false)} />
    </>
  );
};
export default TaskContainer;
