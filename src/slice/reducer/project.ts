import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProjectApi, getListOfProjectsApi } from "../../api/project";
interface Props {
  project?: GetProjectResponse;
  loading: boolean;
  loadingSubmit?: boolean;
}

export const getProjectsAction = createAsyncThunk<GetProjectResponse, void>(
  "getProjectsAction",
  async (_, { rejectWithValue }) => {
    try {
      const response = getListOfProjectsApi();
      return response;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return rejectWithValue("ERROR");
    }
  }
);
export const createProjectAction = createAsyncThunk<void, ProjectBody>(
  "createProjectAction",
  async (body, { rejectWithValue }) => {
    try {
      const response = createProjectApi(body);
      return response;
    } catch (er) {
      return rejectWithValue(er);
    }
  }
);
const initialState: Props = { project: undefined, loading: false };

const projectSlice = createSlice({
  name: "project_slice",
  initialState: initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(getProjectsAction.pending, (s) => {
      s.loading = true;
    });
    b.addCase(getProjectsAction.rejected, (s) => {
      s.loading = false;
      s.project = undefined;
    });
    b.addCase(getProjectsAction.fulfilled, (s, { payload }) => {
      s.loading = false;
      s.project = payload;
    });
    b.addCase(createProjectAction.pending, (s) => {
      s.loadingSubmit = true;
    });
    b.addCase(createProjectAction.rejected, (s) => {
      s.loadingSubmit = false;
    });
    b.addCase(createProjectAction.fulfilled, (s) => {
      s.loadingSubmit = false;
    });
  },
});

export default projectSlice.reducer;
