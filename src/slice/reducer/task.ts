import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import handleAxiosError from "../../utils/axiosError";
import { getListOfTasksApi } from "../../api/task";
interface Props {
  task?: GetTaskResponse;
  loading: boolean;
  loadingSubmit?: boolean;
  loadingUpdate?: boolean;
  loadingDelete?: boolean;
}

const initialState: Props = { task: undefined, loading: false };

export const getTaskListAction = createAsyncThunk<GetTaskResponse, { projectId?: string }>(
  "getTaskListAction",
  async ({ projectId }, { rejectWithValue }) => {
    try {
      //const response = await getListOfTasksApi();
      const response = await getListOfTasksApi(projectId);
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (er: any) {
      handleAxiosError(er);
      return rejectWithValue("ERROR");
    }
  }
);
const taskSlice = createSlice({
  name: "task_slice",
  initialState: initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(getTaskListAction.pending, (s) => {
      s.loading = true;
    });
    b.addCase(getTaskListAction.rejected, (s) => {
      s.loading = false;
    });
    b.addCase(getTaskListAction.fulfilled, (s, { payload }) => {
      s.loading = false;
      s.task = payload;
    });
  },
});

export default taskSlice.reducer;
