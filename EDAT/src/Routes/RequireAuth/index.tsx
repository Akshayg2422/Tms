import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import { ScreenWrapper } from '@Components'
import { ROUTES } from '@Routes'



type RequireAuthProps = {
    children: React.ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {

    const location = useLocation()




    const { userLoggedIn } = useSelector(
        (state: any) => state.AppReducer
    );

    if (!userLoggedIn) {
        return <Navigate to={ROUTES.AUTH.SPLASH} state={{ path: location.pathname }} />
    }

    return (
        <ScreenWrapper>
            {children}
        </ScreenWrapper>
    )
}

export default RequireAuth;
