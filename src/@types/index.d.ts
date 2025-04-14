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
