interface GetProjectResponse {
  totalCount: number;
  records: Project[];
  totalPages: number;
  currentPage: number;
}
interface Project {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
interface GetUserApiResponse {
  user: User;
  permission: Permission;
}
interface Permission {
  projects: Projects;
  tasks: Tasks;
  users: Users;
}

interface Projects {
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

interface Tasks {
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

interface Users {
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

// interface UserProfile {
//   id: number;
//   name: string;
//   profileImage: string;
//   role: string;
//   email: string;
//   createdAt: string;
//   updatedAt: string;
// }
type TaskStatus = "CREATED" | "IN PROGRESS" | "ON HOLD" | "COMPLETED";
interface ProjectBody {
  name: string;
  description: string;
}

interface UpdatePayload {
  id: number | string;
  body: ProjectBody;
}
interface GetTaskResponse {
  totalCount: number;
  records: Task[];
  totalPages: number;
  currentPage: number;
}
interface Task {
  id: number;
  title: string;
  description: string;
  dueDate?: string;
  status: TaskStatus;
  assignedTo?: number;
  projectId: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  project?: Project;
  user?: User;
}
interface TaskBody {
  title: string;
  description: string;
  dueDate?: string;
  status: string;
  assignedTo?: number;
  project: number;
}
interface UserApiResponse {
  totalCount: number;
  records: User[];
  totalPages: number;
  currentPage: number;
}

interface User {
  id: number;
  name: string;
  profileImage: string;
  role: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface UserUpdateBody {
  role: string;
  name: string;
}

interface UserCreateBody extends UserUpdateBody {
  email: string;
}
