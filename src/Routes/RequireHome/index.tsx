import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import { ScreenWrapper } from '@Components'
import { ROUTES } from '@Routes'



type RequireHomeProps = {
    children: React.ReactNode;
}

export const RequireHome = ({ children }: RequireHomeProps) => {

    const {selectedAuthId}=useSelector((state:any)=>state.AuthReducer)

    const location = useLocation()

    const { loginDetails } = useSelector(
        (state: any) => state.AppReducer
    );
    // && selectedAuthId

    if (loginDetails?.isLoggedIn) {
        
        return <Navigate to={ROUTES['auth-module'].splash} state={{ path: location.pathname }} />
    }

    return (
        <ScreenWrapper>
            {children}
        </ScreenWrapper>
    )
}

export default RequireHome;
