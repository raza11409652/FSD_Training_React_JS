import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getUserProfile from "../../api/profile";
import {
  deleteAllFromLocal,
  getItemFromLocal,
  setItemInLocal,
} from "../../utils/localStorage";
import handleAxiosError from "../../utils/axiosError";
const IS_AUTH = "is-authenticated";
const PROFILE = "user-profile";
const SESSION_TOKEN = "session-token";

interface Props {
  isAuthenticated: boolean;
  loading: true | false;
  user?: User;
  permission?: Permission;
}
const initialState: Props = {
  isAuthenticated: getItemFromLocal(IS_AUTH) || false,
  loading: false,
  user: getItemFromLocal(PROFILE) || undefined,
  // permission: null,
};

export const authenticateProfileAction = createAsyncThunk<
  GetUserApiResponse | null,
  void
>("authenticateProfile", async (_, { rejectWithValue }) => {
  try {
    const token = getItemFromLocal(SESSION_TOKEN);
    // console.log({ token });
    const response = token ? getUserProfile() : null;
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    handleAxiosError(e);
    return rejectWithValue(e);
  }
});
const authSlice = createSlice({
  name: "auth-slice",
  initialState: initialState,
  reducers: {
    // authenticate: (state) => {
    //   state.isAuthenticated = true;
    // },
    logoutAction: (state) => {
      deleteAllFromLocal();
      state.isAuthenticated = false;
      state.user = undefined;
    },
  },
  extraReducers: (b) => {
    b.addCase(authenticateProfileAction.pending, (s) => {
      s.loading = true;
    });
    b.addCase(authenticateProfileAction.rejected, (s) => {
      s.isAuthenticated = false;
      s.loading = false;
    });
    b.addCase(authenticateProfileAction.fulfilled, (s, { payload }) => {
      if (payload) {
        s.isAuthenticated = true;
        s.user = payload.user;
        s.permission = payload.permission;
        setItemInLocal(IS_AUTH, true);
        setItemInLocal(PROFILE, payload);
      }
      s.loading = false;
    });
  },
});
export const { logoutAction } = authSlice.actions;
export default authSlice.reducer;
