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
                  {permission?.projects.delete ? (
                    <Button
                      size="small"
                      icon={<DeleteFilled />}
                      danger
                      onClick={() => handleDelete(data)}
                    >
                      Delete
                    </Button>
                  ) : null}
                  {permission?.projects.update ? (
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
                  ) : null}
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
