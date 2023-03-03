import React, { useEffect } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import { Sidebar } from "@Components";
import {
  ADD_USER_INFO,
  ADMIN_ROUTES,
  TAB_ISSUE_ATTACH_DETAILS,
  HOME_PATH,
  INFO,
  
} from "@Routes";
import { icons } from "@Assets";
import { AddUser, CompanyInfo, CreateBroadCast, CreateCompany, IssueCreate, CompanyDetails, IssueDetails, AddReferenceTicket } from "@Modules";
import { getDashboard } from "@Redux";
import { useDispatch } from "react-redux";

function AdminDashboard() {
  const [sideNavOpen, setSideNavOpen] = React.useState(true);
  const location = useLocation();
  const mainContentRef = React.useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getDashboard({
        params: {},
        onSuccess: () => () => {},
        onError: () => () => {},
      })
    );
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement!.scrollTop = 0;
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [location]);

  /**
   * toggles collapse between mini sidenav and normal
   **/

  const getRoutes = (routes: any) => {
    // console.log(JSON.stringify(routes));

    return routes.map((prop: any, key: any) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return <Route path={prop.path} element={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };

  const toggleSideNav = () => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
    }
    setSideNavOpen(!sideNavOpen);
  };

  return (
    <>
      <Sidebar 
        routes={ADMIN_ROUTES}
        toggleSideNav={toggleSideNav}
        sideNavOpen={sideNavOpen}
        logo={{
          innerLink: "/",
          imgSrc: icons.logo,
          imgAlt: "...",
        }}
      />

      <div className={"main-content"} ref={mainContentRef}>
        <Routes>
          {getRoutes(ADMIN_ROUTES)}
          <Route path={HOME_PATH.CREATE_COMPANY} element={<CreateCompany />} />
          <Route path={HOME_PATH.COMPANY_INFO} element={<CompanyDetails />} />
          <Route path={HOME_PATH.ADD_USER} element={<AddUser />} />
          <Route path={HOME_PATH.ISSUE_DETAILS} element={<IssueDetails />} />
          <Route path={HOME_PATH.ADD_REFERENCE_TICKET} element={<AddReferenceTicket />} />
          <Route path={HOME_PATH.CREATE_BROAD_CAST} element={<CreateBroadCast />} />
          <Route path={HOME_PATH.ISSUE_TICKET} element={<IssueCreate />} />
          {/* <Route path={TAB_ISSUE_ATTACH_DETAILS. TAB_ISSUE_USER_DETAILS} element={<TabIssueDetails />} /> */}
          {/* <Route path={CREATE_BROAD_CAST.BROAD_CAST} element={<CreateBroadCast/>} /> */}
          {/* <Route path="*" element={<Navigate to="/admin/issues" />} /> */}
        </Routes>
      </div>

      {sideNavOpen ? (
        <div className={"backdrop d-xl-none"} onClick={toggleSideNav} />
      ) : null}
    </>
  );
}

export { AdminDashboard };
