interface GetProjectResponse {
  totalCount: number;
  records: Project[];
  totalPages: number;
  currentPage: number;
}
interface Project {
  id: number;
  name: string;
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
  status: string;
  project: number;
  createdAt: string;
  updatedAt: string;
}
interface TaskBody {
  title: string;
  description: string;
  project: number
}
