import { AppLoader, PageNotFound, ScreenWrapper } from "@Components";
import { Routes, Route } from "react-router-dom";
import { RequireAuth, RequireHome, ROUTES } from "@Routes";
import { Splash, Login, Dashboard, Otp, RegisterUser, ViewGooglePlaces } from "@Modules";
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

  return (
    <ScreenWrapper>
      <AppLoader />
      <Routes>
        <Route path={ROUTES.AUTH.SPLASH} element={<RegisterUser />} />
        <Route path={ROUTES.AUTH.OTP} element={<Otp />} />
        <Route
          path={ROUTES.AUTH.LOGIN}
          element={<RequireHome>{<Login />}</RequireHome>}
        />
        <Route
          path={ROUTES.AUTH.VIEW_GOOGLE_BUSINESS}
          element={<RequireHome>{<ViewGooglePlaces />}</RequireHome>}
        />
        <Route
          path={ROUTES.HOME.DASHBOARD}
          element={<RequireAuth>{<Dashboard />}</RequireAuth>}
        />
        <Route path={"*"} element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </ScreenWrapper>
  );
}

export default App;
