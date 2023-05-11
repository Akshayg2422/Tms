import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import { ROUTES, HOME_ROUTES } from '@Routes'
import { Sidebar } from '@Components'
import { icons } from '@Assets'



type RequireAuthProps = {
    children: React.ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {


    const [sideNavOpen, setSideNavOpen] = useState(true);
    const mainContentRef = React.useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement!.scrollTop = 0;
        if (mainContentRef.current) {
            mainContentRef.current.scrollTop = 0;
        }
    }, [location]);

    const { loginDetails } = useSelector(
        (state: any) => state.AppReducer
    );

    if (!loginDetails?.isLoggedIn) {
        return <Navigate to={ROUTES['auth-module'].login} state={{ path: location.pathname }} />
    }


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
                routes={HOME_ROUTES}
                toggleSideNav={toggleSideNav}
                sideNavOpen={sideNavOpen}
                logo={{
                    innerLink: "/",
                    imgSrc: icons.logo,
                    imgAlt: "...",
                }}
            />
            <div className='main-content' ref={mainContentRef}>
                {children}
            </div>


            {sideNavOpen ? (
                <div className={"backdrop d-xl-none"} onClick={toggleSideNav} />
            ) : null}
        </>
    )
}

export default RequireAuth;
