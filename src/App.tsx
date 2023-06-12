import { PageNotFound, ScreenWrapper } from "@Components";
import { Route, Routes } from "react-router-dom";
import { HOME_ROUTES, AUTH_ROUTES, TASK_ROUTES, TICKET_ROUTES, USER_COMPANY_ROTES, MESSAGE_ROUTES, RequireAuth, RequireHome } from "@Routes";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
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
import { DateTimePicker } from '@Components'



function App() {

  const { language } = useSelector((state: any) => state.AuthReducer);

  changeLanguage(language?.value);

  const AUTH = 1
  const HOME = 2

  const getRoutes = (routes, type?: any) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }

      const path = prop.layout ? prop.layout + prop.path : prop.path;

      return (
        <Route
          path={path}
          element={type === AUTH ? <RequireHome>{prop.component}</RequireHome> : <RequireAuth>{prop.component}</RequireAuth>}
          key={key}
        />
      );

    });
  };


  return (
    <ScreenWrapper>
      <Routes>
        {getRoutes(AUTH_ROUTES, AUTH)}
        {getRoutes(HOME_ROUTES, HOME)}
        {getRoutes(TASK_ROUTES, HOME)}
        {getRoutes(TICKET_ROUTES, HOME)}
        {getRoutes(MESSAGE_ROUTES, HOME)}
        {getRoutes(USER_COMPANY_ROTES, HOME)}
        <Route path={"*"} element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </ScreenWrapper>

  );
}

export default App; 
