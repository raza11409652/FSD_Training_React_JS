import { Button, Table } from "antd";
import { useAppSelector } from "../slice";
import ActionHeader from "../components/actionHeader";
import { PlusOutlined } from "@ant-design/icons";
import usePermission from "../hooks/usePermission";
import CreateNewProject from "../components/projects/createForm";
import React from "react";

const ProjectContainer = () => {
  const { loading, project } = useAppSelector((a) => a.project);
  const { projects } = usePermission();
  const [openProjForm, setOpenProjForm] = React.useState(false);

  return (
    <>
      <ActionHeader
        title="Projects"
        children={
          <>
            {projects?.create === true ? (
              <Button
                icon={<PlusOutlined />}
                variant="filled"
                color="volcano"
                onClick={() => setOpenProjForm(true)}
              >
                Create New Projects
              </Button>
            ) : (
              <></>
            )}
          </>
        }
      />
      <Table
        rowKey={"id"}
        columns={[]}
        pagination={false}
        dataSource={project?.records || []}
        loading={loading}
      />
      <CreateNewProject
        open={openProjForm}
        onClose={() => setOpenProjForm(false)}
      />
    </>
  );
};
export default ProjectContainer;
