import { AppLoader, PageNotFound, ScreenWrapper, Sidebar } from "@Components";
import { Route, Routes } from "react-router-dom";
import { ADMIN_ROUTES, AUTH_ROUTES, HOME_PATH } from "@Routes";
import { AddReferenceTask, AddReferenceTicket, AddSubTask, AddTask, AddUser, AdminDashboard, CompanyDashBoard, CompanyDetails, CreateBroadCast, CreateCompany, IssueCreate, IssueDetails, PushNotification, TaskDetails } from "@Modules";
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
import { FCM_TOKEN } from "./Utils";


function App() {
  const { language } = useSelector((state: any) => state.AuthReducer);
  changeLanguage(language?.value);
  const { loginUserSuccess } = useSelector((state: any) => state.AdminReducer);

  const fcmToken = localStorage.getItem(FCM_TOKEN)
  console.log("FCM TOKEN======>", fcmToken)
 

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
      <PushNotification />
      <AppLoader />
   {loginUserSuccess &&
   
    <AdminDashboard/>
      
      }
      
   <div className={"main-content"} >
      <Routes>
        {getRoutes(AUTH_ROUTES)}
        {getRoutes(ADMIN_ROUTES)}
          <Route path={HOME_PATH.CREATE_COMPANY} element={<CreateCompany />} />
          <Route path={HOME_PATH.COMPANY_INFO} element={<CompanyDetails />} />
          <Route path={HOME_PATH.ADD_USER} element={<AddUser />} />
          <Route path={HOME_PATH.ISSUE_DETAILS} element={<IssueDetails />} />
          <Route path={HOME_PATH.ADD_REFERENCE_TICKET} element={<AddReferenceTicket />} />
          <Route path={HOME_PATH.ADD_REFERENCE_TASK} element={<AddReferenceTask />} />
          <Route path={HOME_PATH.CREATE_BROAD_CAST} element={<CreateBroadCast />} />
          <Route path={HOME_PATH.ISSUE_TICKET} element={<IssueCreate />} />
          <Route path={HOME_PATH.ADD_TASK} element={<AddTask />} />
          <Route path={HOME_PATH.TASK_DETAILS+'/:id'} element={<TaskDetails />} />
          <Route path={HOME_PATH.ADD_SUB_TASK} element={<AddSubTask />} />
        {/* <Route path={HOME_PATH.DASHBOARD } element={<AdminDashboard />} /> */}
        {/* <Route path={HOME_PATH.COMPANY + "/*"} element={<CompanyDashBoard />} /> */}
        {/* <Route path={"*"} element={<PageNotFound />} /> */}
      </Routes>
      </div>
      
      
    
      <ToastContainer />

    </ScreenWrapper>
  );
}

export default App;
