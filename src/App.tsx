import { AppLoader, PageNotFound, ScreenWrapper } from "@Components";
import { Route, Routes } from "react-router-dom";
import { AUTH_ROUTES, HOME_PATH } from "@Routes";
import { AdminDashboard, CompanyDashBoard } from "@Modules";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

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

import { changeLanguage } from "@I18n";

function App() {
  const { language } = useSelector((state: any) => state.AuthReducer);
  changeLanguage(language?.value);

  const getRoutes = (routes: any) => {
    return routes.map((prop: any, key: any) => {
      return (
        <Route
          path={prop.path}
          element={prop.component}
          key={key}
        />
      );
    });
  };

  return (
    <ScreenWrapper>
      <AppLoader />
      <Routes>
        {getRoutes(AUTH_ROUTES)}
        <Route path={HOME_PATH.DASHBOARD + "/*"} element={<AdminDashboard />} />
        <Route path={HOME_PATH.COMPANY + "/*"} element={<CompanyDashBoard />} />
        <Route path={"*"} element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </ScreenWrapper>
  );
}

export default App;
