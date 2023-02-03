
import React, { useEffect, useState } from 'react';
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import { Sidebar } from '@Components'
import { ROUTES, DASHBOARD_ROUTES, USER_ROUTES, ADMIN_ROUTES } from '@Routes'
import { icons } from '@Assets'
import { CodeEditor } from '../CodeEditor';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, fetchStudentCourses, settingCurrentCourse } from '@Redux';
import { AdminCourseSection, AddCourse, CourseSection } from '@Modules'
import { getImageUrl } from '@Utils';

function Dashboard() {

  const [sideNavOpen, setSideNavOpen] = React.useState(true);
  const location = useLocation();
  const dispatch = useDispatch();

  const mainContentRef = React.useRef<HTMLDivElement | null>(null);
  const [adminDashboardRoutes, setAdminDashboardRoutes] = useState(ADMIN_ROUTES)
  const [studentDashboardRoutes, setStudentDashboardRoutes] = useState(USER_ROUTES)

  const { loginDetails, userDetails } = useSelector((state: any) => state.AppReducer);
  const { registeredCourses, currentCourse, dashboardDetails, studentCourses } = useSelector(
    (state: any) => state.DashboardReducer
  );

  console.log("dashboardDetails----->", dashboardDetails);


  useEffect(() => {

    const params = {}
    dispatch(fetchCourses({
      params,
      onSuccess: (success: any) => {
        settingAdminSideNavbarPath(success)
      },
      onError: (error: string) => {
      },
    }))

    if (!dashboardDetails?.user_details?.is_faculty) {
      console.log("faculty falseeeeeee");
      const params = {}
      dispatch(fetchStudentCourses({
        params,
        onSuccess: (success) => {
          if (success && success?.details?.length > 0) {

            let updatedRoutes = [...USER_ROUTES]
            const apiRoutes = success?.details?.map((item: any) => {

              return {
                path: "/course-section",
                name: item?.course?.name,
                miniName: item?.course?.name.substring(0, 2).toUpperCase(),
                component: <CourseSection />,
                layout: "/dashboard",
              }
            })
            updatedRoutes[0].views = [...apiRoutes as never]
            console.log("updated routes -->",updatedRoutes);
            
            setStudentDashboardRoutes(updatedRoutes)
          }


        },
        onError: (error) => { }
      }))
    }

  }, [])


  const settingAdminSideNavbarPath = (data) => {
    console.log("666666666666666", data);

    // if (dashboardDetails?.user_details?.is_faculty) {
      if (data && data?.length > 0) {

        let updatedRoutes = [...ADMIN_ROUTES]
        const apiRoutes = data.map((item: any) => {
          return {
            path: "/admin-course-section",
            name: item.name,
            miniName: item.name.substring(0, 2).toUpperCase(),
            component: <AdminCourseSection />,
            layout: "/dashboard",
          }
        })
        updatedRoutes[0].views = [...apiRoutes, ...updatedRoutes[0]?.views as never]
        setAdminDashboardRoutes(updatedRoutes)
      }
    // }

  }

  const settingStudentSideNavbarPath = (data) => {}


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
    console.log(JSON.stringify(routes));

    return routes.map((prop: any, key: any) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/dashboard") {
        return (
          <Route
            path={prop.path}
            element={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getInternalRoutes = (routes: any) => {
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



  const toggleSideNav = () => {
    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned');
      document.body.classList.add('g-sidenav-hidden');
    } else {
      document.body.classList.add('g-sidenav-pinned');
      document.body.classList.remove('g-sidenav-hidden');
    }
    setSideNavOpen(!sideNavOpen);
  };
  return (
    <>
      <Sidebar
        routes={dashboardDetails?.user_details?.is_faculty ? adminDashboardRoutes : studentDashboardRoutes}
        toggleSideNav={toggleSideNav}
        sideNavOpen={sideNavOpen}
        logo={{
          innerLink: '/',
          imgSrc: dashboardDetails?.company_logo === null ? icons.logo : getImageUrl(dashboardDetails?.company_logo),
          imgAlt: '...',
          text: dashboardDetails?.company?.name
        }}
      />

      <div className={'main-content'} ref={mainContentRef}>
        <Routes>
          {getRoutes(dashboardDetails?.user_details?.is_faculty ? adminDashboardRoutes : studentDashboardRoutes)}
          {getInternalRoutes(DASHBOARD_ROUTES)}
          {/* <Route path={'/dashboard' + ROUTES.HOME.CODE_EDITOR} element={<CodeEditor />} />
          <Route path={'/dashboard' + ROUTES.HOME.QUESTION} element={<Question />} />
          <Route path={'/dashboard' + ROUTES.HOME.PROCEDURE} element={<Procedure />} />
          <Route path={'/dashboard' + ROUTES.HOME.FLOWDIAGRAM} element={<FlowDiagram />} />
          <Route path={'/dashboard' + ROUTES.HOME.LANDING} element={<Landing />} />
          <Route path={'/dashboard' + ROUTES.HOME.COURSE_SECTION} element={<CourseSection />} />
          <Route path={ ROUTES.HOME.TOPIC_SECTION} element={<TopicSection />} /> */}

          {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
        </Routes>
      </div>

      {sideNavOpen ? (
        <div className={'backdrop d-xl-none'} onClick={toggleSideNav} />
      ) : null}

    </>
  );
}

export { Dashboard };

