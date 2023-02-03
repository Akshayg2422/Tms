import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import { ScreenWrapper } from '@Components'
import { ROUTES } from '@Routes'



type RequireHomeProps = {
    children: React.ReactNode;
}

export const RequireHome = ({ children }: RequireHomeProps) => {

    const location = useLocation()

    const { userLoggedIn } = useSelector(
        (state: any) => state.AppReducer
    );

    if (userLoggedIn) {
        return <Navigate to={ROUTES.HOME.DASHBOARD} state={{ path: location.pathname }} />
    }

    return (
        <ScreenWrapper>
            {children}
        </ScreenWrapper>
    )
}

export default RequireHome;
