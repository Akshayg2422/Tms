import React, { useEffect } from "react";
import { useLocation, Route } from "react-router-dom";
import { Sidebar } from "@Components";
import { ADMIN_ROUTES, } from "@Routes";
import { icons } from "@Assets";
import { getDashboard, setIsSync, autoCompleteDropDown } from "@Redux";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [sideNavOpen, setSideNavOpen] = React.useState(false);
  const location = useLocation();
  const mainContentRef = React.useRef<HTMLDivElement | null>(null);
  const { isSync } = useSelector(
    (state: any) => state.AppReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isSync.dashboardDetails) {
      dispatch(
        getDashboard({
          params: {},
          onSuccess: () => () => {

          },
          onError: () => () => { },
        })
      );
    }
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

      dispatch(
        autoCompleteDropDown(false)
      )

    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");

      dispatch(
        autoCompleteDropDown(true)
      )
    }
    setSideNavOpen(!sideNavOpen);
  };

  return (
    <>
      <Sidebar
        routes={ADMIN_ROUTES}
        toggleSideNav={toggleSideNav}
        sideNavOpen={sideNavOpen}
        rtlActive={false}
        logo={{
          innerLink: "/",
          imgSrc: icons.tmsLogo,
          imgAlt: "...",
        }}
      />

      {sideNavOpen ? (
        <div className={""} onClick={toggleSideNav} />
      ) : null}
    </>
  );
}

export { AdminDashboard };
