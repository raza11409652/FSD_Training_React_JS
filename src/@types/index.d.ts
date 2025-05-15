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
interface UserProfile {
  id: number;
  name: string;
  profileImage: string;
  role: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectBody {
  name: string;
  description: string;
}

interface UpdatePayload {
  id: number | string;
  body: ProjectBody;
}
interface GetTaskResponse{
  totalCount: number;
  records: Task[];
  totalPages: number;
  currentPage: number;
}
interface Task{
  id: number;
  title: string;
  description: string;
  dueDate?: string;
  status: string;
  assignedTo?: number;
  project: number
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  project?: number
}
interface TaskBody {
  title: string;
  description: string;
  dueDate?: string;
  status: string;
  assignedTo?: number;
  project: number

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
