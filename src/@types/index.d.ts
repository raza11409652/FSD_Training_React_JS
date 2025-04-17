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
  title: string;
  description: string;
}
