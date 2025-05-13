import { Button, Table, Tooltip } from "antd";
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

// Reducer Initial State
const initialState: ProjectState = {
  rowsData: [],
  projForm: false,
  updateForm: false,
  projectData: {},
  deleteForm: false,
  deleteID: "",
  projectColumns: [],
};

// Reducer Function
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
  const { loading, project } = useAppSelector((a) => a.project);
  const { projects } = usePermission();
  const [projectState, dispatchProjectState] = useReducer(
    projectReducer,
    initialState
  );

  // Column Definitions
  // const columns = [
  //   {
  //     title: "ID",
  //     dataIndex: "id",
  //     key: "id",
  //     width: 50,
  //     render: (text: any, _record: Project) => {
  //       return <div style={{ display: "flex" }}>{text}</div>;
  //     },
  //   },
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "project_name",
  //     width: 200,
  //     render: (text: any, _record: any) => {
  //       return <div style={{ display: "flex" }}>{text}</div>;
  //     },
  //   },
  //   {
  //     title: "Description",
  //     dataIndex: "description",
  //     key: "description",
  //     width: 200,
  //     render: (text: any, _record: any) => {
  //       return (
  //         <div style={{ display: "flex" }}>
  //           {text === "" || text === undefined || text === null ? "-" : text}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     title: "Created At",
  //     dataIndex: "createdAt",
  //     key: "createdAt",
  //     width: 200,
  //     render: (text: any, _record: any) => {
  //       return (
  //         <div style={{ display: "flex" }}>{new Date(text).toString()}</div>
  //       );
  //     },
  //   },
  //   {
  //     title: "Updated At",
  //     dataIndex: "updatedAt",
  //     key: "updatedAt",
  //     width: 200,
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     render: (text: any, _record: any) => {
  //       return <div style={{ display: "flex" }}>{text}</div>;
  //     },
  //   },
  // ];

  // Update Project Functionality
  const handleUpdate = (record: Project) => {
    dispatchProjectState({ type: "UPDATE_FORM", payload: true });
    const projectData = {
      id: record?.id,
      name: record?.name,
      description: record?.description,
    };
    dispatchProjectState({ type: "PROJECT_DATA", payload: projectData });
  };

  // Delete Project Functionality
  const handleDelete = (record: Project) => {
    const projectData = {
      id: record?.id,
      name: record?.name,
      description: record?.description,
    };
    dispatchProjectState({ type: "DELETE_FORM", payload: true });
    dispatchProjectState({ type: "DELETE_ID", payload: projectData });
  };

  /**
   * const updateColumn = {
      title: "Update",
      dataIndex: "update",
      key: "updateData",
      width: 150,
      render: (_text: string, record: Project) => {
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
      width: 150,
      render: (_: string, record: Project) => {
        return (
          <div style={{ display: "flex" }}>
            <Button
              icon={<DeleteOutlined />}
              variant="solid"
              color="red"
              onClick={() => handleDelete(record)}
            >
              Delete
            </Button>
          </div>
        );
      },
    };
   */

  useEffect(() => {
    // Admin Role Views

    // if (projects.update) columns.push(updateColumn);
    // if (projects.delete) columns.push(deleteColumn);

    // dispatchProjectState({ type: "PROJECT_COLUMNS", payload: columns });
    dispatchProjectState({ type: "ROWS_DATA", payload: project?.records });
  }, [project, projects.delete, projects.update]);

  return (
    <>
      <ActionHeader
        title="Projects"
        children={
          projects.create ? (
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
          ) : (
            <></>
          )
        }
      />

      <Table
        rowKey={"id"}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 50,
            render: (text: string) => {
              return <div style={{ display: "flex" }}>{text}</div>;
            },
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "project_name",
            width: 200,
            render: (text: string) => {
              return <div style={{ display: "flex" }}>{text}</div>;
            },
          },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
            width: 200,
            render: (text?: string) => {
              return (
                <div style={{ display: "flex" }}>
                  {text === "" || text === undefined || text === null
                    ? "-"
                    : text}
                </div>
              );
            },
          },
          {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 200,
            render: (text: string) => {
              return (
                <div style={{ display: "flex" }}>
                  {new Date(text).toString()}
                </div>
              );
            },
          },
          {
            title: "Updated At",
            dataIndex: "updatedAt",
            key: "updatedAt",
            width: 200,
            render: (text: string) => {
              return <div style={{ display: "flex" }}>{text}</div>;
            },
          },
          {
            title: "Action",
            dataIndex: "id",
            key: "id",
            render: (_, record: Project) => {
              return (
                <>
                  {projects.update ? (
                    <Tooltip title="Edit Project">
                      <Button
                        onClick={() => handleUpdate(record)}
                        title="Edit Project"
                        variant="text"
                        icon={<EditOutlined />}
                      ></Button>
                    </Tooltip>
                  ) : null}
                  {projects.delete ? (
                    <Tooltip title="Edit Project">
                      <Button
                        onClick={() => {
                          handleDelete(record);
                        }}
                        title="Delete Project"
                        danger
                        variant="solid"
                        icon={<DeleteOutlined />}
                      ></Button>
                    </Tooltip>
                  ) : null}
                </>
              );
            },
          },
        ]}
        dataSource={projectState.rowsData}
        loading={loading}
        scroll={{
          x: 300,
          y: 400,
        }}
        pagination={{
          pageSize: 10,
          /* Commenting for now */
          // onChange: (page, pageSize) => {
          //   console.log("Page:", page, "PageSize:", pageSize);
          //   // Optionally fetch data for the selected page from server
          // },
        }}
      />
      <CreateNewProject
        open={projectState.projForm}
        onClose={() =>
          dispatchProjectState({ type: "PROJ_FORM", payload: false })
        }
      />
      {/* Update Project Component */}
      <UpdateNewProject
        open={projectState.updateForm}
        onClose={() =>
          dispatchProjectState({ type: "UPDATE_FORM", payload: false })
        }
        projectData={projectState.projectData}
      />

      {/* Delete Project Component */}
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
