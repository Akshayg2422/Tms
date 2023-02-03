
import React, { useEffect } from 'react';
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import { Sidebar } from '@Components'
import { COMPANY_ROUTES } from '@Routes'
import { icons } from '@Assets'

function CompanyDashBoard() {

  const [sideNavOpen, setSideNavOpen] = React.useState(true);
  const location = useLocation();
  const mainContentRef = React.useRef<HTMLDivElement | null>(null);


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
      if (prop.layout === "/company") {
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
        routes={COMPANY_ROUTES}
        toggleSideNav={toggleSideNav}
        sideNavOpen={sideNavOpen}
        logo={{
          innerLink: '/',
          imgSrc: icons.logo,
          imgAlt: '...',
        }}
      />

      <div className={'main-content'} ref={mainContentRef}>
        <Routes>
          {getRoutes(COMPANY_ROUTES)}
          <Route path="*" element={<Navigate to="/company/opened" />} />
        </Routes>
      </div>

      {sideNavOpen ? (
        <div className={'backdrop d-xl-none'} onClick={toggleSideNav} />
      ) : null}

    </>
  );
}

export { CompanyDashBoard };
