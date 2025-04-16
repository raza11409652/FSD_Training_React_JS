import { createSlice } from "@reduxjs/toolkit";
interface Props {
  isAuthenticated: boolean;
}
const initialState: Props = { isAuthenticated: false };
const authSlice = createSlice({
  name: "auth-slice",
  initialState: initialState,
  reducers: {
    authenticate: (state) => {
      state.isAuthenticated = true;
    },
  },
});
export default authSlice.reducer;
