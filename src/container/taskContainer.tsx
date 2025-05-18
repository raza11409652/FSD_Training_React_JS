// import { Button, Modal, Select, Table, Typography, message } from "antd";
// import { PlusOutlined, WarningTwoTone } from "@ant-design/icons";
// import { useEffect, useState } from "react";
// import TaskCreateForm from "../components/tasks/createForm";
// import ActionHeader from "../components/actionHeader";
// import { updateTaskApi, createTaskApi, deleteTaskApi } from "../api/task";
// import { useAppDispatch, useAppSelector } from "../slice";
// import { getTaskListAction } from "../slice/reducer/task";
// import usePermission from "../hooks/usePermission";
// import { getListOfProjectsApi } from "../api/project";
// import { getUserRecords } from "../api/users";
// const { Title } = Typography;
// const TaskContainer = () => {
//   const { tasks } = usePermission() || {
//     tasks: { create: false, delete: false },
//   };
//   // const { task, loading } = useAppSelector((a) => a.task);
//   // const [users, setUsers] = useState<User[]>([]);
//   // const [open, setOpen] = useState(false);
//   // const [editingTask, setEditingTask] = useState<Task | null>(null);
//   // const userProfile = useAppSelector((a) => a.auth.user);

//   // const [selectedProject, setSelectedProject] = useState<number | null>(null);
//   // const [projects, setProjects] = useState<Project[]>([]);

//   // const dispatch = useAppDispatch();

//   // React.useEffect(() => {
//   //   dispatch(getTaskListAction());
//   // }, [dispatch]);
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const userData = await getUserRecords();
//   //       setUsers(userData.records);

//   //       const projectData = await getListOfProjectsApi();
//   //       setProjects(projectData.records); // Store projects in state
//   //       dispatch(
//   //         getTaskListAction({ projectId: selectedProject ?? undefined })
//   //       );
//   //     } catch (error) {
//   //       message.error("Failed to fetch data");
//   //     }
//   //   };

//   //   fetchData();
//   // }, [dispatch, selectedProject]);
//   // const filteredTasks =
//   //   userProfile?.role === "User"
//   //     ? task?.records.filter(
//   //         (task: Task) => task.assignedTo === userProfile?.id
//   //       )
//   //     : task?.records;

//   // const handleDelete = (record: Task) => {
//   //   Modal.confirm({
//   //     title: (
//   //       <div style={{ display: "flex", alignItems: "center" }}>
//   //         <span>Delete Task?</span>
//   //         <WarningTwoTone style={{ marginLeft: "10px", color: "orange" }} />
//   //       </div>
//   //     ),
//   //     icon: null,
//   //     content: record.title,
//   //     okText: "Delete",
//   //     onOk: async () => {
//   //       try {
//   //         await deleteTaskApi(record.id);
//   //         message.success("Task deleted successfully");
//   //         setSelectedProject(null);
//   //         dispatch(getTaskListAction({}));
//   //       } catch (error) {
//   //         message.error("Failed to delete task");
//   //       }
//   //     },
//   //     cancelButtonProps: {
//   //       style: { display: "none" },
//   //     },
//   //     okButtonProps: {
//   //       danger: true,
//   //       style: {
//   //         float: "left",
//   //         marginRight: "10px",
//   //         marginInlineStart: 0,
//   //       },
//   //     },
//   //     closable: true,
//   //   });
//   // };

//   // const handleEdit = (task: Task) => {
//   //   setEditingTask(task);
//   //   setOpen(true);
//   // };
//   // const getUserNameById = (userId: number) => {
//   //   const user = users.find((user) => user.id === userId);
//   //   return user ? user.name : "Unknown";
//   // };

//   // const getProjectNameById = (projectId: number) => {
//   //   const project = projects.find((project) => project.id === projectId);
//   //   return project ? project.name : "Unknown";
//   // };

//   // const columns = [
//   //   {
//   //     title: "Title",
//   //     dataIndex: "title",
//   //     key: "title",
//   //   },
//   //   {
//   //     title: "Description",
//   //     dataIndex: "description",
//   //     key: "description",
//   //   },
//   //   {
//   //     title: "Due Date",
//   //     dataIndex: "dueDate",
//   //     key: "dueDate",
//   //   },
//   //   {
//   //     title: "Status",
//   //     dataIndex: "status",
//   //     key: "status",
//   //   },
//   //   {
//   //     title: "Owner",
//   //     dataIndex: "assignedTo",
//   //     key: "assignedTo",
//   //     render: (assignedTo: number) => getUserNameById(assignedTo),
//   //   },
//   //   {
//   //     title: "Project",
//   //     dataIndex: "project",
//   //     key: "project",
//   //     render: (projectId: number) => getProjectNameById(projectId),
//   //   },
//   //   {
//   //     title: "Actions",
//   //     key: "actions",
//   //     render: (_: any, record: Task) => {
//   //       const canDelete = tasks.delete;
//   //       return (
//   //         <>
//   //           <Button type="link" onClick={() => handleEdit(record)}>
//   //             Edit
//   //           </Button>
//   //           {canDelete && (
//   //             <Button danger type="link" onClick={() => handleDelete(record)}>
//   //               Delete
//   //             </Button>
//   //           )}
//   //         </>
//   //       );
//   //     },
//   //   },
//   // ];

//   return (
//     <>
//       <ActionHeader
//         title="Tasks"
//         children={
//           tasks.create ? (
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               onClick={() => {
//                 setEditingTask(null); // Reset form for new task
//                 setOpen(true);
//               }}
//             >
//               Create new task
//             </Button>
//           ) : (
//             <></>
//           )
//         }
//       />
//       <div style={{ display: "flex", justifyContent: "flex-end" }}>
//         <Select
//           placeholder="Filter by project"
//           allowClear
//           style={{ width: 250 }}
//           value={selectedProject || undefined}
//           onChange={(value) => setSelectedProject(value || null)} // Sets selected project
//         >
//           {projects.map((project) => (
//             <Select.Option key={project.id} value={project.id}>
//               {project.name}
//             </Select.Option>
//           ))}
//         </Select>
//       </div>

//       <Title level={3}>Task List</Title>
//       <Table
//         columns={columns}
//         dataSource={filteredTasks || []}
//         rowKey="id"
//         loading={loading}
//         scroll={{
//           x: 300,
//           y: 300,
//         }}
//         pagination={{
//           pageSize: 10,
//         }}
//         locale={{ emptyText: "No tasks available" }}
//       />
//       <TaskCreateForm
//         open={open}
//         close={() => {
//           setOpen(false);
//           setEditingTask(null);
//           setEditingTask(null);
//         }}
//         onSubmit={handleCreate}
//         editingTask={editingTask}
//         users={users}
//       />
//     </>
//   );
// };

// export default TaskContainer;
import React from "react";
import { useAppDispatch, useAppSelector } from "../slice";
import { getTaskListAction } from "../slice/reducer/task";
import ActionHeader from "../components/actionHeader";
import { Button, message, Modal, Select, Spin, Table, Tag } from "antd";
import getTaskStatusTag from "../utils/color";
import { getUserListAction } from "../slice/reducer/user";
import TaskCreateForm from "../components/tasks/createForm";
import {
  PlusOutlined,
  DeleteFilled,
  WarningTwoTone,
  EditFilled,
} from "@ant-design/icons";
import { createTaskApi, deleteTaskApi, updateTaskApi } from "../api/task";
import usePermission from "../hooks/usePermission";
import dayjs from "dayjs";

const TaskContainer = () => {
  const [state, setState] = React.useState<{
    project?: string;
    create?: boolean;
    task?: Task;
    formLoading?: boolean;
  }>({ create: false, task: undefined, formLoading: false });

  const permission = usePermission();
  const dispatch = useAppDispatch();
  const projects = useAppSelector((a) => a.project.project?.records) || [];
  const tasks = useAppSelector((a) => a.task.task?.records) || [];
  const taskLoading = useAppSelector((a) => a.task.loading);
  const users = useAppSelector((a) => a.user.userResponse?.records) || [];

  React.useEffect(() => {
    dispatch(getTaskListAction({ projectId: state.project || "" }));
  }, [dispatch, state.project]);
  React.useEffect(() => {
    dispatch(getUserListAction());
  }, [dispatch]);
  const refresh = () => {
    dispatch(getTaskListAction({ projectId: state.project || "" }));
  };

  const handleDelete = (record: Task) => {
    Modal.confirm({
      title: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>Delete Task?</span>
          <WarningTwoTone style={{ marginLeft: "10px", color: "orange" }} />
        </div>
      ),
      icon: null,
      content: record.title,
      okText: "Delete",
      onOk: async () => {
        try {
          await deleteTaskApi(record.id);
          message.success("Task deleted successfully");
          refresh();
        } catch {
          message.error("Failed to delete task");
        }
      },
      cancelButtonProps: {
        style: { display: "none" },
      },
      okButtonProps: {
        danger: true,
        style: {
          float: "left",
          marginRight: "10px",
          marginInlineStart: 0,
        },
      },
      closable: true,
    });
  };

  const handlesSubmit = async (data: TaskBody) => {
    try {
      setState((s) => {
        return { ...s, formLoading: true };
      });
      if (state.task) {
        await updateTaskApi(state.task.id, data);
        message.success("Task updated successfully");
      } else {
        await createTaskApi(data);
        message.success("Task created successfully");
      }
      refresh();
    } catch {
      message.error("Failed to save task");
    } finally {
      setState((s) => {
        return { ...s, create: false, task: undefined, formLoading: false };
      });
    }
  };
  return (
    <>
      <ActionHeader
        title={"Tasks"}
        children={
          <>
            {state.formLoading ? <Spin></Spin> : null}
            <Select
              value={state?.project}
              onChange={(e) => setState({ ...state, project: e })}
              placeholder="Filter by project"
              allowClear
              style={{ width: "250px" }}
              options={projects.map((a) => {
                return { label: a.name, value: a.id };
              })}
            />
            {permission?.projects.create ? (
              <Button
                style={{ marginLeft: "10px" }}
                icon={<PlusOutlined />}
                onClick={() =>
                  setState((s) => {
                    return { ...s, create: true };
                  })
                }
              >
                Create new project
              </Button>
            ) : (
              <></>
            )}
          </>
        }
      />
      <Table
        columns={[
          { title: "Title", key: "title", dataIndex: "title" },
          { title: "Description", key: "desc", dataIndex: "description" },
          {
            title: "Status",
            key: "desc",
            dataIndex: "status",
            render: (s) => {
              return <Tag color={getTaskStatusTag(s)}>{s}</Tag>;
            },
          },
          {
            title: "Due Date",
            key: "dueDate",
            dataIndex: "dueDate",
            render: (d?: string) => (d ? dayjs(d).format("YYYY-MM-DD") : "-"),
          },
          {
            title: "Project",
            key: "project",
            dataIndex: "projectId",
            render: (_, data) => data?.project?.name || "",
          },
          {
            title: "Owner",
            key: "owner",
            dataIndex: "assignedTo",
            render: (_, data) => data?.user?.name || "",
          },
          {
            title: "Action",
            dataIndex: "id",
            render: (_, data) => {
              return (
                <div style={{ display: "flex" }}>
                  <Button
                    size="small"
                    icon={<DeleteFilled />}
                    danger
                    onClick={() => handleDelete(data)}
                  >
                    Delete
                  </Button>
                  <Button
                    style={{ marginLeft: "10px" }}
                    size="small"
                    icon={<EditFilled />}
                    onClick={() => {
                      setState((s) => {
                        return { ...s, create: true, task: data };
                      });
                    }}
                  >
                    Edit
                  </Button>
                </div>
              );
            },
          },
        ]}
        dataSource={tasks}
        rowKey="id"
        loading={taskLoading}
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
        open={state.create || false}
        close={() => {
          setState((s) => {
            return { ...s, create: false, task: undefined };
          });
        }}
        onSubmit={function (data: TaskBody): void {
          handlesSubmit(data);
        }}
        editingTask={state.task || null}
        users={users}
      />
    </>
  );
};
export default TaskContainer;
