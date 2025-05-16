import { Button, Modal, Select, Table, Typography, message } from "antd";
import { PlusOutlined, WarningTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
import TaskCreateForm from "../components/tasks/createForm";
import ActionHeader from "../components/actionHeader";
import { updateTaskApi, createTaskApi, deleteTaskApi } from "../api/task";
import { useAppDispatch, useAppSelector } from "../slice";
import { getTaskListAction } from "../slice/reducer/task";
import usePermission from "../hooks/usePermission";
import { getListOfProjectsApi } from "../api/project";
import { getUserRecords } from "../api/users";

const { Title } = Typography;

const TaskContainer = () => {
  const { tasks } = usePermission();
  const { task, loading } = useAppSelector((a) => a.task);
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const userProfile = useAppSelector((a) => a.auth.user);

  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

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
      setSelectedProject(null);
      dispatch(getTaskListAction({}));
    } catch (error) {
      message.error("Failed to save task");
    }
  };
  // React.useEffect(() => {
  //   dispatch(getTaskListAction());
  // }, [dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserRecords(); 
        setUsers(userData.records);

        const projectData = await getListOfProjectsApi();
        setProjects(projectData.records); // Store projects in state
        dispatch(getTaskListAction({ projectId: selectedProject ?? undefined }));
      } catch (error) {
        message.error("Failed to fetch data");
      }
    };

    fetchData(); 

  }, [dispatch, selectedProject]);
  const filteredTasks =  userProfile?.role === 'User' 
        ? task?.records.filter((task: Task) => task.assignedTo === userProfile?.id) 
        : task?.records;
  
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
        await deleteTaskApi(record.id); 
        message.success("Task deleted successfully");
         setSelectedProject(null);
        dispatch(getTaskListAction({}));
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
  const getUserNameById = (userId: number) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown'; 
  };

  const getProjectNameById = (projectId: number) => {
    const project = projects.find((project) => project.id === projectId);
    return project ? project.name : 'Unknown'; 
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
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Owner",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (assignedTo: number) => getUserNameById(assignedTo),
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
      render: (projectId: number) => getProjectNameById(projectId),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Task) => {
        const canDelete = tasks.delete;
          return (
            <>
                <Button type="link" onClick={() => handleEdit(record)}>
                  Edit
                </Button>
              {canDelete && (
                <Button danger type="link" onClick={() => handleDelete(record)}>
                  Delete
                </Button>
              )}
            </>
          );
      },
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
      <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
          <Select
            placeholder="Filter by project"
            allowClear
            style={{ width: 250 }}
            value={selectedProject || undefined}
            onChange={(value) => setSelectedProject(value || null)} // Sets selected project
          >
            {projects.map((project) => (
              <Select.Option key={project.id} value={project.id}>
                {project.name}
              </Select.Option>
            ))}
          </Select>
      </div>


      <Title level={3} >
        Task List
      </Title>
      <Table
        columns={columns}
        dataSource={filteredTasks || []}
        rowKey="id"
        loading={loading}
        scroll={{
          x: 300,
          y: 300,
        }}
        pagination={{
          pageSize: 10,
        }}
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
        users={users}
      />
    </>
  );
};

export default TaskContainer;
