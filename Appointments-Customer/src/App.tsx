import React, { useEffect, useState } from 'react';
import { AppLoader, PageNotFound, ScreenWrapper, Toggle } from '@Components';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth, RequireHome, ROUTES } from '@Routes'
import { icons } from '@Assets'
import { Splash, Login, Dashboard } from '@Modules'

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
  return (
    <ScreenWrapper>
      <AppLoader />
      <Routes>
        <Route path={ROUTES.AUTH.SPLASH} element={<Splash />} />
        <Route path={ROUTES.AUTH.LOGIN} element={<RequireHome>{<Login />}</RequireHome>} />
        <Route path={ROUTES.HOME.DASHBOARD} element={<RequireAuth>{<Dashboard />}</RequireAuth>} />
        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
    </ScreenWrapper>
  );
}

export default App;