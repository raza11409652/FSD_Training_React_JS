import { Button, Table, Typography, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import TaskCreateForm from "../components/tasks/createForm";
import ActionHeader from "../components/actionHeader";
import { deleteProjectApi } from "../api/project";
import { updateTaskApi, createTaskApi } from "../api/task";
import { useAppDispatch, useAppSelector } from "../slice";
import { getTaskListAction } from "../slice/reducer/task";

const { Title } = Typography;

const TaskContainer = () => {
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
      fetchTasks(); // Refresh the list
    } catch (error) {
      message.error("Failed to save task");
    }
  };
  React.useEffect(() => {
    dispatch(getTaskListAction());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    try {
      await deleteProjectApi(id);
      message.success("Task deleted successfully");
      dispatch(getTaskListAction());
    } catch (error) {
      message.error("Failed to delete task");
    }
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
          <Button danger type="link" onClick={() => handleDelete(record.id)}>
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
