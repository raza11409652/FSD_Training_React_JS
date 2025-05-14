interface ProjectState {
  rowsData: Project[];
  projForm: boolean;
  updateForm: boolean;
  projectData: Partial<Project>;
  deleteForm: boolean;
  deleteID: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  projectColumns:Array<any>;
}

export type { ProjectState };
