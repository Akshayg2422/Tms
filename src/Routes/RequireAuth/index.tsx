import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { ROUTES, HOME_ROUTES, HOME_EMPLOYEE_ROUTES } from '@Routes'
import { Sidebar } from '@Components'
import { icons } from '@Assets'
import { FCM_TOKEN, getDeviceInfo } from '@Utils'
import { addPushNotification } from '@Redux'
import { PushNotification } from "@Modules";

type RequireAuthProps = {
    children: React.ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
    const dispatch = useDispatch()
    const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);


    const [sideNavOpen, setSideNavOpen] = useState(false);
    const mainContentRef = React.useRef<HTMLDivElement | null>(null);
    const location = useLocation();


    const isAdmin = dashboardDetails?.permission_details?.is_admin
    const isSuperAdmin = dashboardDetails?.permission_details?.is_super_admin
    const showAction = isAdmin || isSuperAdmin

    // let homeRoutes = HOME_ROUTES.slice(5, 6)
    let HOME_ADMIN_ROUTES: any = []

    if (showAction) {
        HOME_ADMIN_ROUTES = HOME_ROUTES
    } else {
        HOME_ADMIN_ROUTES = HOME_EMPLOYEE_ROUTES
    }

    const fcmToken = localStorage.getItem(FCM_TOKEN)

    const { loginDetails, token } = useSelector(
        (state: any) => state.AppReducer
    );


    useEffect(() => {
        if (loginDetails && loginDetails.isLoggedIn && token) {
            getPushNotification()
        }
    }, [token])


    function getPushNotification() {
        const params = {
            device_model: getDeviceInfo()?.model,
            device_platform: getDeviceInfo()?.platform,
            device_brand: getDeviceInfo()?.brand,
            device_token: fcmToken
        }

        dispatch(addPushNotification({
            params,
            onSuccess: () => () => {
            },
            onError: () => () => {
            }
        }))
    }

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement!.scrollTop = 0;
        if (mainContentRef.current) {
            mainContentRef.current.scrollTop = 0;
        }
    }, [location]);



    if (!loginDetails?.isLoggedIn) {
        console.log('ppppp')
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
                routes={HOME_ADMIN_ROUTES}
                toggleSideNav={toggleSideNav}
                sideNavOpen={sideNavOpen}
                logo={{
                    innerLink: "/",
                    imgSrc: icons.logo,
                    imgAlt: "...",
                }}
            />
            <div className='main-content' ref={mainContentRef}>
                <PushNotification />
                {children}
            </div>


            {sideNavOpen ? (
                <div className={"backdrop d-xl-none"} onClick={toggleSideNav} />
            ) : null}
        </>
    )
}

export default RequireAuth;
