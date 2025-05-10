import { Button, Table } from "antd";
import ActionHeader from "../components/actionHeader";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import usePermission from "../hooks/usePermission";
import CreateNewProject from "../components/projects/createForm";
import { useEffect, useReducer } from "react";
import { ProjectState } from "../models/ProjectState";
import { ProjectAction } from "../models/ProjectAction";
import { useAppSelector } from "../slice";
import UpdateNewProject from "../components/projects/updateForm";
import DeleteProject from "../components/projects/deleteForm";

const initialState: ProjectState = {
  rowsData: [],
  projForm: false,
  updateForm: false,
  projectData: {},
  deleteForm: false,
  deleteID: "",
  projectColumns: [],
};

function projectReducer(
  state: ProjectState,
  action: ProjectAction
): ProjectState {
  switch (action.type) {
    case "ROWS_DATA":
      return { ...state, rowsData: action.payload };
    case "PROJ_FORM":
      return { ...state, projForm: action.payload };
    case "UPDATE_FORM":
      return { ...state, updateForm: action.payload };
    case "PROJECT_DATA":
      return { ...state, projectData: action.payload };
    case "DELETE_FORM":
      return { ...state, deleteForm: action.payload };
    case "DELETE_ID":
      return { ...state, deleteID: action.payload };
    case "PROJECT_COLUMNS":
      return { ...state, projectColumns: action.payload };
    default:
      return { ...state };
  }
}

const ProjectContainer = () => {
  const { loading, project }: any = useAppSelector((a) => a.project);
  const { projects } = usePermission();
  const [projectState, dispatchProjectState] = useReducer(
    projectReducer,
    initialState
  );

  const handleUpdate: any = (record: any) => {
    dispatchProjectState({ type: "UPDATE_FORM", payload: true });
    const projectData: any = {
      id: record?.id,
      name: record?.name,
      description: record?.description,
    };
    dispatchProjectState({ type: "PROJECT_DATA", payload: projectData });
  };

  const handleDelete: any = (record: any) => {
    const projectData: any = {
      id: record?.id,
      name: record?.name,
      description: record?.description,
    };
    dispatchProjectState({ type: "DELETE_FORM", payload: true });
    dispatchProjectState({ type: "DELETE_ID", payload: projectData });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: any, _record: any) => {
        return <div style={{ display: "flex" }}>{text}</div>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "project_name",
      render: (text: any, _record: any) => {
        return <div style={{ display: "flex" }}>{text}</div>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: any, _record: any) => {
        return (
          <div style={{ display: "flex" }}>
            {text === "" || text === undefined || text === null ? "-" : text}
          </div>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any, _record: any) => {
        return (
          <div style={{ display: "flex" }}>{new Date(text).toString()}</div>
        );
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text: any, _record: any) => {
        return <div style={{ display: "flex" }}>{text}</div>;
      },
    },
    // {
    //   title: "Update",
    //   dataIndex: "update",
    //   key: "updateData",
    //   render: (_text: any, record: any) => {
    //     return (
    //       <div style={{ display: "flex" }}>
    //         <Button
    //           icon={<EditOutlined />}
    //           variant="filled"
    //           color="volcano"
    //           onClick={() => handleUpdate(record)}
    //         >
    //           Update
    //         </Button>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: "Delete",
    //   dataIndex: "delete",
    //   key: "deleteData",
    //   render: (_text: any, record: any) => {
    //     return (
    //       <div style={{ display: "flex" }}>
    //         <Button
    //           icon={<DeleteOutlined />}
    //           variant="filled"
    //           color="volcano"
    //           onClick={() => handleDelete(record)}
    //         >
    //           Delete
    //         </Button>
    //       </div>
    //     );
    //   },
    // },
  ];

  useEffect(() => {
    const updateColumn = {
      title: "Update",
      dataIndex: "update",
      key: "updateData",
      render: (_text: any, record: any) => {
        return (
          <div style={{ display: "flex" }}>
            <Button
              icon={<EditOutlined />}
              variant="filled"
              color="volcano"
              onClick={() => handleUpdate(record)}
            >
              Update
            </Button>
          </div>
        );
      },
    };

    const deleteColumn = {
      title: "Delete",
      dataIndex: "delete",
      key: "deleteData",
      render: (_text: any, record: any) => {
        return (
          <div style={{ display: "flex" }}>
            <Button
              icon={<DeleteOutlined />}
              variant="filled"
              color="volcano"
              onClick={() => handleDelete(record)}
            >
              Delete
            </Button>
          </div>
        );
      },
    };
    if (projects.update) columns.push(updateColumn);
    if (projects.delete) columns.push(deleteColumn);
    dispatchProjectState({ type: "PROJECT_COLUMNS", payload: columns });
    dispatchProjectState({ type: "ROWS_DATA", payload: project?.records });
  }, [project]);

  return (
    <>
      {projects.create && (
        <ActionHeader
          title="Projects"
          children={
            <Button
              icon={<PlusOutlined />}
              variant="filled"
              color="volcano"
              onClick={() =>
                dispatchProjectState({ type: "PROJ_FORM", payload: true })
              }
            >
              Create New Projects
            </Button>
          }
        />
      )}
      <Table
        rowKey={"id"}
        columns={projectState.projectColumns}
        pagination={false}
        dataSource={projectState.rowsData}
        loading={loading}
      />
      <CreateNewProject
        open={projectState.projForm}
        onClose={() =>
          dispatchProjectState({ type: "PROJ_FORM", payload: false })
        }
      />
      <UpdateNewProject
        open={projectState.updateForm}
        onClose={() =>
          dispatchProjectState({ type: "UPDATE_FORM", payload: false })
        }
        projectData={projectState.projectData}
      />
      <DeleteProject
        open={projectState.deleteForm}
        onClose={() =>
          dispatchProjectState({ type: "DELETE_FORM", payload: false })
        }
        deleteID={projectState.deleteID}
      />
    </>
  );
};
export default ProjectContainer;
