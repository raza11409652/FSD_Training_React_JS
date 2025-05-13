import React from "react";
import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../slice";
import { getProjectsAction } from "../slice/reducer/project";
import HomeContainer from "../container/homeContainer";
import AuthInitContainer from "../container/authInitContainer";
import LoginContainer from "../container/loginContainer";
import ProjectContainer from "../container/projectContainer";
import TaskContainer from "../container/taskContainer";
import UserContainer from "../container/usersContainer";

export const AppRoutes = () => {
  // Authentication will be implemented later on
  // On application load get List of projects

  const { isAuthenticated } = useAppSelector((a) => a.auth);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (isAuthenticated) dispatch(getProjectsAction());
  }, [dispatch, isAuthenticated]);
  return (
    <>
      <Suspense fallback={<>Loading....</>}>
        <BrowserRouter>
          <Routes>
            {isAuthenticated ? (
              <Route path="/" element={<HomeContainer />}>
                <Route index element={<>Dashboard</>} />
                <Route path="/projects" element={<ProjectContainer />} />
                <Route path="/tasks" element={<TaskContainer />} />
                <Route path="/users" element={<UserContainer />} />
              </Route>
            ) : (
              <Route path="/">
                <Route index element={<LoginContainer />} />
              </Route>
            )}
            <Route path="/auth/init" element={<AuthInitContainer />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
};
