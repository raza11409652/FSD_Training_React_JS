import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { getListOfProjectsApi } from "../../api/project";

interface TaskData {
  title: string;
  description: string;
  project: number;
}

interface Props {
  open: true | false;
  close: () => void;
  onSubmit: (data: TaskData) => void; 
  editingTask: Task | null;

}
const TaskCreateForm: React.FC<Props> = ({ open, close, onSubmit, editingTask }) => {
  const [form] = Form.useForm();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (open) {
      if (editingTask) {
        form.setFieldsValue({
          title: editingTask.title,
          description: editingTask.description,
          project: editingTask.project,
        });
      }
      else {
        form.resetFields();
      }
    }
    fetchProjects()
  }, [open, editingTask]);
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getListOfProjectsApi();
      setProjects(data.records || []); 
      const mappedProjects: any[] = data.records.map((project: any) => ({
        id: project.id,
        name: project.name,
        description: project.description,
      }));
      setProjects(mappedProjects);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async (values: TaskData) => {
    try {
      const taskData : TaskBody = {
        title: values.title,
        description: values.description,
        project:  values.project
      };
      onSubmit(taskData); 
      form.resetFields();
      close();
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  return (
    <Modal
      title={editingTask ? "Edit Task" : "Create New Task"}
      open={open}
      onCancel={close}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ status: 'To Do' }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Project"
          name="project"
          rules={[{ required: true, message: 'Please select a project' }]}
        >
          <Select placeholder="Select project">
            {projects.map(project => (
              <Select.Option key={project.id} value={project.id}>
                {project.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingTask ? "Update Task" : "Create Task"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default TaskCreateForm;
