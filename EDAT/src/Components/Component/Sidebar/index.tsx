import React from "react";
import { useLocation, NavLink as NavLinkRRD, Link } from "react-router-dom";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";

import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
} from "reactstrap";

import { SidebarProps } from './interfaces';
import { useDispatch, useSelector } from "react-redux";
import { otpLoginFailure, settingCurrentCourse, settingCurrentCourseSection } from "@Redux";


function Sidebar({ toggleSideNav, sideNavOpen = false, routes, logo, rtlActive = false }: SidebarProps) {

  const dispatch = useDispatch();

  const [state, setState] = React.useState<any>({});
  const location = useLocation();
  const { registeredCourses, studentCourses, dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  React.useEffect(() => {
    setState(getCollapseStates(routes));
  }, []);


  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  // makes the sidenav normal on hover (actually when mouse enters on it)
  const onMouseEnterSideNav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  };

  // makes the sidenav mini on hover (actually when mouse leaves from it)
  const onMouseLeaveSideNav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  };

  // this creates the intial state of this component based on the collapse routes
  // that it gets through routes
  const getCollapseStates = (routes: any) => {
    let initialState = {};
    routes.map((prop: any, key: any) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };


  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.js - route /admin/regular-forms
  const getCollapseInitialState = (routes: any) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (location.pathname.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  };
  // this is used on mobile devices, when a user navigates
  // the sidebar will autoclose
  const closeSideNav = () => {
    if (window.innerWidth < 1200) {
      if (toggleSideNav) {
        toggleSideNav();
      }
    }
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes: any) => {
    return routes.map((prop: any, key: any) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st: any = {};
        st[prop["state"] as keyof typeof st] = !state[prop.state];
        return (
          <NavItem key={key}>
            <NavLink
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={state[prop.state]}
              className={classnames({
                active: getCollapseInitialState(prop.views),
              })}
              onClick={(e) => {
                e.preventDefault();
                // console.log(JSON.stringify(prop)+"=====sas");

                setState(st);
              }}
            >
              {prop.icon ? (
                <>
                  <i className={prop.icon} />
                  <span className="nav-link-text">{prop.name}</span>
                </>
              ) : prop.miniName ? (
                <>
                  <span className="sidenav-mini-icon"> {prop.miniName} </span>
                  <span className="sidenav-normal"> {prop.name} </span>
                </>
              ) : null}
            </NavLink>
            <Collapse isOpen={state[prop.state]}>
              <Nav className="nav-sm flex-column" onClick={() => {

                // console.log('came'+"====="+ JSON.stringify(prop)+"===="+key);

              }}>
                {createLinks(prop.views)}
              </Nav>
            </Collapse>
          </NavItem>
        );
      }
      return (
        <NavItem className={activeRoute(prop.layout + prop.path)} key={key}>
          <NavLink
            to={prop.layout + prop.path}
            className=""
            onClick={closeSideNav}
            tag={NavLinkRRD}
          >
            {prop.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <span className="nav-link-text ml--2">{prop.name}</span>
              </>
            ) : prop.miniName !== undefined ? (
              <div className="col-12" onClick={() => {
                if (dashboardDetails?.user_details?.is_faculty) {

                  // dispatch(settingCurrentCourse(''))
                  // dispatch(settingCurrentCourseSection(""))
                  if (prop.name !== 'Add Course' && prop.name !== 'Assign Course') {
                    dispatch(settingCurrentCourseSection(""))
                    let currentCourse = registeredCourses.filter((item) => item.name === prop.name)
                    dispatch(settingCurrentCourse(currentCourse))
                  }

                }
                else {
                  let currentCourse = studentCourses.filter((item) => item.course.name === prop.name)
                  dispatch(settingCurrentCourse(currentCourse))
                }

              }}>
                <span className="sidenav-mini-icon"> {prop.miniName} </span>
                <span className={`sidenav-normal ${(prop.name === 'Add Course' || prop.name === 'Assign Course') ? 'text-secondary' : ''}`}> {prop.name} </span>
              </div>
            ) : (
              prop.name
            )}
          </NavLink>
        </NavItem>
      );
    });
  };

  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  const scrollBarInner = (
    <div className="scrollbar-inner">
      <div className="sidenav-header d-flex align-items-center">
        {logo ? (
          <NavbarBrand {...navbarBrandProps}>
            <div className="row">
              <div>
                <img
                  alt={logo.imgAlt}
                  className="navbar-brand-img"
                  src={logo.imgSrc}
                  height={logo.imgHeight}
                  width={logo.imgWidth}
                />
              </div>
              <div className="mt-2">
                <h5 className="ml-1">{logo.text}</h5>
              </div>
            </div>
          </NavbarBrand>
        ) : null}
        <div className="ml-auto">
          <div
            className={classnames("sidenav-toggler d-none d-xl-block", {
              active: sideNavOpen,
            })}
            onClick={toggleSideNav}
          >
            <div className="sidenav-toggler-inner">
              <i className="sidenav-toggler-line" />
              <i className="sidenav-toggler-line" />
              <i className="sidenav-toggler-line" />
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-inner">
        <Collapse navbar isOpen={true}>
          <Nav navbar>{createLinks(routes)}</Nav>
        </Collapse>
      </div>
    </div>
  );

  return (
    <Navbar
      className={
        "sidenav navbar-vertical navbar-expand-xs navbar-light bg-white " +
        (rtlActive ? "" : "fixed-left")
      }
      onMouseEnter={onMouseEnterSideNav}
      onMouseLeave={onMouseLeaveSideNav}

    >
      {navigator.platform.indexOf("Win") > -1 ? (
        <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar>
      ) : (
        scrollBarInner
      )}
      <div className="pl-1">
        <h6 className="text-muted mb--3 font-weight-light ">{'powered by '}<strong className="font-weight-bold">EDAT</strong></h6>
      </div>
    </Navbar>
  );
}
export { Sidebar };