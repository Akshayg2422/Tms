import { AppLoader, InputWithImage, PageNotFound, ScreenWrapper, Spinner } from "@Components";
import { Routes, Route } from "react-router-dom";
import { AUTH_ROUTES } from "@Routes";
import { Splash, Dashboard, Otp, Procedure, Question, CodeEditor, Landing, FlowDiagram, HeaderNavbar, UserOnlineStatus } from "@Modules";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
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
import { useEffect } from "react";
import { postGenericCrudDetails } from "@Redux";


function App() {
  const dispatch = useDispatch()
  const { language, loginDetails } = useSelector((state: any) => state.AuthReducer);
  changeLanguage(language?.value);
  // console.log("logiinndetaaa-->", loginDetails)

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
  /**
   * User online status useEffect
   * hitting generic crud api once in 5 mins
   */
  useEffect(() => {
    setInterval(() => {
      let currentTime = moment().format("YYYY-MM-DD HH:mm:ss")
      const params = {
        mq: "employee__EmployeeCompanyInfo",
        data: {
          id: loginDetails?.id,
          last_active_time: currentTime
        }
      }
      dispatch(postGenericCrudDetails({
        params,
        onSuccess: (success: any) => {
        },
        onError: (error: string) => {
        },

      }))
    },300000)
  }, [])

  return (
    <ScreenWrapper>
      {/* <AppLoader /> */}

      <Routes>
        {getRoutes(AUTH_ROUTES)}
        <Route path={'/dashboard/*'} element={<Dashboard />} />
        <Route path={"*"} element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </ScreenWrapper>


  )
}

export default App;
