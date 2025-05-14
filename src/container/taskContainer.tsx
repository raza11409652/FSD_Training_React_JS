import { Button, Modal, Table, Typography, message } from "antd";
import { PlusOutlined, WarningTwoTone } from "@ant-design/icons";
import React, { useState } from "react";
import TaskCreateForm from "../components/tasks/createForm";
import ActionHeader from "../components/actionHeader";
import { updateTaskApi, createTaskApi, deleteTaskApi } from "../api/task";
import { useAppDispatch, useAppSelector } from "../slice";
import { getTaskListAction } from "../slice/reducer/task";
import usePermission from "../hooks/usePermission";

const { Title } = Typography;

const TaskContainer = () => {
  const { tasks } = usePermission();
  // const [tasks, setTasks] = useState<Task[]>([]);
  const { task, loading } = useAppSelector((a) => a.task);
  // const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const dispatch = useAppDispatch();

  const handleCreate = async (data: any) => {
    try {
      if (editingTask) {
        await updateTaskApi(editingTask.id, data);
        message.success("Task updated successfully");
      } else {
        await createTaskApi(data);
        message.success("Task created successfully");
      }
      setOpen(false);
      setEditingTask(null);
      dispatch(getTaskListAction());
    } catch (error) {
      message.error("Failed to save task");
    }
  };
  React.useEffect(() => {
    dispatch(getTaskListAction());
  }, [dispatch]);

  // const handleDelete = async (task: any) => {
  //   try {
  //     await deleteTaskApi(task.id);
  //     message.success("Task deleted successfully");
  //     dispatch(getTaskListAction());
  //   } catch (error) {
  //     message.error("Failed to delete task");
  //   }
  // };
  const handleDelete = (record: Task) => {
  Modal.confirm({
    title: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>Delete Task?</span>
        <WarningTwoTone style={{ marginLeft: '10px', color: 'orange' }} />
      </div>
    ),
    icon: null,
    content: record.title,
    okText: 'Delete',
    onOk: async () => {
      try {
        await deleteTaskApi(record.id);  // Assuming `deleteTaskApi` is a function to delete the task
        message.success("Task deleted successfully");
        dispatch(getTaskListAction());
      } catch (error) {
        message.error("Failed to delete task");
      }
    },
    cancelButtonProps: {
      style: { display: 'none' }, 
    },
    okButtonProps: {
      danger: true,
      style: {
        float: 'left',
        marginRight: '10px',
        marginInlineStart: 0
      },
    },
    closable: true,
  });
};

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setOpen(true);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Task) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button danger type="link" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <ActionHeader
        title="Tasks"
        children={
          tasks.create ? (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingTask(null); // Reset form for new task
                setOpen(true);
              }}
            >
              Create new task
            </Button>
          ) : (
            <></>
          )
        }
      />
      <Title level={3} style={{ marginTop: 20 }}>
        Task List
      </Title>
      <Table
        columns={columns}
        dataSource={task?.records || []}
        rowKey="id"
        loading={loading}
        pagination={false}
        locale={{ emptyText: "No tasks available" }}
      />
      <TaskCreateForm
        open={open}
        close={() => {
          setOpen(false);
          setEditingTask(null);
          setEditingTask(null);
        }}
        onSubmit={handleCreate}
        editingTask={editingTask}
      />
    </>
  );
};

export default TaskContainer;
