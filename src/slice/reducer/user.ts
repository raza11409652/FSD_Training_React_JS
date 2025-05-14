import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUser, getUserRecords, updateUserData } from "../../api/users";
import handleAxiosError from "../../utils/axiosError";

interface Props {
  loading: true | false;
  loadingUpdate: true | false;
  loadingCreate: true | false;
  userResponse?: UserApiResponse;
  user?: User;
}
export const getUserListAction = createAsyncThunk<UserApiResponse, void>(
  "getUserListAction",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserRecords();
      return response;
    } catch (er) {
      return rejectWithValue(er);
    }
  }
);
export const updateUserAction = createAsyncThunk<
  string,
  { body: UserUpdateBody; id: string }
>("updateUserAction", async (body, { rejectWithValue }) => {
  try {
    const response = await updateUserData(body.body, body.id);
    return response;
  } catch (er) {
    return rejectWithValue(er);
  }
});
export const createUserAction = createAsyncThunk<
  string,
  { body: UserCreateBody }
>("createUserAction", async (body, { rejectWithValue }) => {
  try {
    const response = await createUser(body.body);
    return response;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (er: any) {
    handleAxiosError(er);
    return rejectWithValue(er);
  }
});

const initialState: Props = {
  loading: false,
  loadingUpdate: false,
  loadingCreate: false,
};
const userSlice = createSlice({
  name: "userSlice",
  reducers: {
    setCurrentUserAction: (s, p: PayloadAction<User | undefined>) => {
      s.user = p.payload;
    },
  },
  extraReducers: (b) => {
    b.addCase(getUserListAction.pending, (s) => {
      s.loading = true;
    });
    b.addCase(getUserListAction.rejected, (s) => {
      s.loading = false;
    });
    b.addCase(getUserListAction.fulfilled, (s, { payload }) => {
      s.loading = false;
      s.userResponse = payload;
    });
    b.addCase(updateUserAction.pending, (s) => {
      s.loadingUpdate = true;
    });
    b.addCase(updateUserAction.rejected, (s) => {
      s.loadingUpdate = false;
    });
    b.addCase(updateUserAction.fulfilled, (s) => {
      s.loadingUpdate = false;
    });
    b.addCase(createUserAction.pending, (s) => {
      s.loadingCreate = true;
    });
    b.addCase(createUserAction.rejected, (s) => {
      s.loadingCreate = false;
    });
    b.addCase(createUserAction.fulfilled, (s) => {
      s.loadingCreate = false;
    });
  },
  initialState,
});

export const { setCurrentUserAction } = userSlice.actions;
export default userSlice.reducer;
