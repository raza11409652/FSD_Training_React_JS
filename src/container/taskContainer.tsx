import { Button, Table, Typography } from "antd";
import ActionHeader from "../components/actionHeader";
import { PlusOutlined } from "@ant-design/icons";
import TaskCreateForm from "../components/tasks/createForm";
import React, { useState } from "react";

const { Title } = Typography;

interface TaskData {
  description: string;
  dueDate: string;
  status: string;
  owner: string;
  project: string;
}
interface Task extends TaskData {
  key: string;
}

const dummyOwners = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' }
];

const dummyProjects = [
  { id: 'a', name: 'Project Alpha' },
  { id: 'b', name: 'Project Beta' }
];

const TaskContainer = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // for  tasks
  const [open, setOpen] = React.useState(false);
  // Load tasks related to logged-in user account

  const handleCreateTask = (newTask: TaskData) => {
    const taskWithKey: Task = {
      ...newTask,
      key: Date.now().toString(),
      dueDate: newTask.dueDate ? newTask.dueDate.toString() : "",  
    };
    setTasks(prev => [...prev, taskWithKey]); // Add the new task to state
  };
  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Project',
      dataIndex: 'project',
      key: 'project',
    }
  ];

  return (
    <>
      <ActionHeader
        title="Tasks"
        children={
          <>
            <Button
              variant="filled"
              color="volcano"
              icon={<PlusOutlined />}
              onClick={() => setOpen(true)}
            >
              Create new task
            </Button>
          </>
        }
      />
      {/* Table Goes here */}
      <Title level={3} style={{ marginTop: 20 }}>Task List</Title>
      <Table
        columns={columns} 
        dataSource={tasks} 
        pagination={false} 
        rowKey="key" // Set the unique key for each row
        locale={{ emptyText: 'No tasks available' }} // Empty state message
      />
       {/* Task Create Modal */}
      <TaskCreateForm open={open} close={() => setOpen(false)}
        onSubmit={handleCreateTask} owners={dummyOwners} projects={dummyProjects}
      />
    </>
  );
};
export default TaskContainer;
