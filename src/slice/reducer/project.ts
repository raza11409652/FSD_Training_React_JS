import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProjectApi, deleteProjectApi, getListOfProjectsApi, updateProjectApi } from "../../api/project";
interface Props {
  project?: GetProjectResponse;
  loading: boolean;
  loadingSubmit?: boolean;
  loadingUpdate?: boolean,
  loadingDelete?: boolean
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

export const updateProjectAction = createAsyncThunk<void, UpdatePayload>(
  "updateProjectAction",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const response = await updateProjectApi(id, body);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProjectAction = createAsyncThunk<void, number | string>(
  "deleteProjectAction",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteProjectApi(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
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
    b.addCase(updateProjectAction.pending, (s) => {
      s.loadingUpdate = true;
    });
    b.addCase(updateProjectAction.rejected, (s) => {
      s.loadingUpdate = false;
    });
    b.addCase(updateProjectAction.fulfilled, (s) => {
      s.loadingUpdate = false;
    });
    b.addCase(deleteProjectAction.pending, (s) => {
      s.loadingDelete = true;
    });
    b.addCase(deleteProjectAction.rejected, (s) => {
      s.loadingDelete = false;
    });
    b.addCase(deleteProjectAction.fulfilled, (s) => {
      s.loadingDelete = false;
    });
  },
});

export default projectSlice.reducer;
