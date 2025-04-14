import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getListOfProjectsApi } from "../../api/project";
interface Props {
  project?: GetProjectResponse;
  loading: boolean;
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
  },
});

export default projectSlice.reducer;
