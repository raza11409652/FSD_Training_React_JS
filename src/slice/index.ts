import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import projectReducer from "./reducer/project";
import authReducer from "./reducer/auth";
import userReducer from "./reducer/user";
import taskReducer from "./reducer/task";

// import { useReducer } from "react";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    auth: authReducer,
    user: userReducer,
    task: taskReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
