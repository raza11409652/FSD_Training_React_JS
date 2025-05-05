import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React from "react";

interface TaskData {
  description: string;
  dueDate: string;
  status: string;
  owner: string;
  project: string;
}
interface Option {
  id: string;
  name: string;
}

interface Props {
  open: true | false;
  close: () => void;
  onSubmit: (data: TaskData) => void; 
  owners: Option[];
  projects: Option[];

}
const TaskCreateForm: React.FC<Props> = ({ open, close, onSubmit, owners = [], projects = []}) => {
  const [form] = Form.useForm();
  const handleFinish = (values: TaskData) => {
    onSubmit(values);
    form.resetFields();
    close();
  };

  return (
    <Modal
      title="Create new task"
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
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Due Date"
          name="dueDate"
          rules={[{ required: true, message: 'Please select a due date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="To Do">To Do</Select.Option>
            <Select.Option value="In Progress">In Progress</Select.Option>
            <Select.Option value="Done">Done</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Owner"
          name="owner"
          rules={[{ required: true, message: 'Please select an owner' }]}
        >
          <Select placeholder="Select owner">
            {owners.map(owner => (
              <Select.Option key={owner.id} value={owner.id}>
                {owner.name}
              </Select.Option>
            ))}
          </Select>
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
            Create Task
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default TaskCreateForm;
