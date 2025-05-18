import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
// import { getListOfProjectsApi } from "../../api/project";
import { useAppSelector } from "../../slice";
// import usePermission from "../../hooks/usePermission";
import dayjs from "dayjs";

interface Props {
  open: true | false;
  close: () => void;
  onSubmit: (data: TaskBody) => void;
  editingTask: Task | null;
  users: User[];
}
const TaskCreateForm: React.FC<Props> = ({
  open,
  close,
  onSubmit,
  editingTask,
  users,
}) => {
  const [form] = Form.useForm();
  const projects = useAppSelector((a) => a.project.project?.records) || [];
  const [loading, setLoading] = useState<boolean>(false);
  // const [owners, setOwners] = useState<any[]>([]);
  const userProfile = useAppSelector((a) => a.auth.user);

  const isReadOnlyUser = userProfile?.role === "USER";

  useEffect(() => {
    if (open) {
      const fetchData = async () => {
        try {
          setLoading(true);

          // If editing a task, populate the form
          if (editingTask) {
            form.setFieldsValue({
              title: editingTask.title ?? "",
              description: editingTask.description ?? "",
              project: editingTask.projectId ?? "",
              status: editingTask.status ?? "",
              assignedTo: editingTask?.assignedTo
                ? editingTask?.assignedTo
                : undefined,
              dueDate: editingTask.dueDate ? dayjs(editingTask.dueDate) : null,
            });
          } else {
            form.resetFields();
          }
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch projects or users", error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [open, editingTask, form]); // Re-run when the modal opens, task changes, or form instance changes

  const handleFinish = async (values: TaskBody) => {
    try {
      const dueDate = values.dueDate ? new Date(values.dueDate) : null;
      const formattedDueDate: string | undefined = dueDate
        ? dayjs(values.dueDate).format("YYYY-MM-DD")
        : undefined;

      const taskData: TaskBody = {
        title: values.title,
        description: values.description,
        project: values.project,
        dueDate: formattedDueDate,
        status: values.status,
        assignedTo: values.assignedTo,
      };
      if (!values.dueDate) {
        delete taskData.dueDate;
      }
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
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input disabled={isReadOnlyUser} />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input disabled={isReadOnlyUser} />
        </Form.Item>
        <Form.Item label="Due Date" name="dueDate">
          <DatePicker
            disabled={isReadOnlyUser}
            style={{ width: "100%" }}
            disabledDate={(current) =>
              current && current.isBefore(dayjs().startOf("day"), "day")
            }
          />
        </Form.Item>
        {editingTask && (
          <Form.Item label="Status" name="status">
            <Select defaultValue={editingTask?.status}>
              <Select.Option value="IN PROGRESS">In Progress</Select.Option>
              <Select.Option value="COMPLETED">Completed</Select.Option>
            </Select>
          </Form.Item>
        )}

        <Form.Item label="Owner" name="assignedTo">
          <Select disabled={isReadOnlyUser} placeholder="Select owner">
            {users
              .filter((owner) => userProfile && owner.id !== userProfile.id)
              .map((owner) => (
                <Select.Option key={owner.id} value={owner.id}>
                  {owner.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Project"
          name="project"
          rules={[{ required: true, message: "Please select a project" }]}
        >
          <Select disabled={isReadOnlyUser} placeholder="Select project">
            {projects.map((project) => (
              <Select.Option key={project.id} value={project.id}>
                {project.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={isReadOnlyUser && !editingTask}
          >
            {editingTask ? "Update Task" : "Create Task"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default TaskCreateForm;
