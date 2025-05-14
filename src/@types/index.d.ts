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
