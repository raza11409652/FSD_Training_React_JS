import React from "react";
import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../slice";
import { getProjectsAction } from "../slice/reducer/project";
import HomeContainer from "../container/homeContainer";
import AuthInitContainer from "../container/authInitContainer";

export const AppRoutes = () => {
  // Authentication will be implemented later on
  // On application load get List of projects

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getProjectsAction());
  }, [dispatch]);
  return (
    <>
      <Suspense fallback={<>Loading....</>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeContainer />}>
              <Route index element={<>Dashboard</>} />
              <Route path="/register" element={<>Register signup</>} />
            </Route>
            <Route path="/auth/init" element={<AuthInitContainer />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
};
