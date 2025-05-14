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

interface Props {
  isAuthenticated: boolean;
  loading: true | false;
  user?: UserProfile;
}
const initialState: Props = {
  isAuthenticated: getItemFromLocal(IS_AUTH) || false,
  loading: false,
  user: getItemFromLocal(PROFILE) || undefined,
};

export const authenticateProfileAction = createAsyncThunk<UserProfile, void>(
  "authenticateProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = getUserProfile();
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      handleAxiosError(e);
      return rejectWithValue(e);
    }
  }
);
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
    });
    b.addCase(authenticateProfileAction.fulfilled, (s, { payload }) => {
      s.isAuthenticated = true;
      s.loading = false;
      if (payload) {
        s.user = payload;
        setItemInLocal(IS_AUTH, true);
        setItemInLocal(PROFILE, payload);
      }
    });
  },
});
export const { logoutAction } = authSlice.actions;
export default authSlice.reducer;
