import React, { useState, useEffect } from 'react'
import { PageNotFound, ScreenWrapper, Sidebar, ComponentLoader, Button } from "@Components";
import { Route, Routes, useLocation } from "react-router-dom";
import { HOME_ROUTES, AUTH_ROUTES, TASK_ROUTES, RequireAuth, RequireHome } from "@Routes";
import { Tasks } from "@Modules";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { icons } from '@Assets'
import { changeLanguage } from "@I18n";
/**
 *  select-react  - important need to add this app.js
 */
import "select2/dist/css/select2.min.css";
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "@fullcalendar/common/main.min.css";
import "@fullcalendar/daygrid/main.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "quill/dist/quill.core.css";
import "@fortawesome/fontawesome-free/css/all.min.css";




function App() {


  const { language } = useSelector((state: any) => state.AuthReducer);
  changeLanguage(language?.value);


  const AUTH = 1
  const HOME = 2

  const getRoutes = (routes: any, type: number) => {
    return routes.map((prop: any, key: any) => {
      return (
        <Route
          path={prop.path}
          element={type === AUTH ? <RequireHome>{prop.component}</RequireHome> : <RequireAuth>{prop.component}</RequireAuth>}
          key={key}
        />
      );
    });
  };

  return (

    <>
      <ScreenWrapper>
        <Routes>
          {getRoutes(AUTH_ROUTES, AUTH)}
          {getRoutes(HOME_ROUTES, HOME)}
          {getRoutes(TASK_ROUTES, HOME)}
          <Route path={"*"} element={<PageNotFound />} />
        </Routes>
      </ScreenWrapper>
    </>
  );
}

export default App; 
