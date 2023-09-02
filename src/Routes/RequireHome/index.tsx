import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { ScreenWrapper } from '@Components'
import { ROUTES } from '@Routes'
import { setUserSuccess } from '@Redux';



type RequireHomeProps = {
    children: React.ReactNode;
}

export const RequireHome = ({ children }: RequireHomeProps) => {
const dispatch=useDispatch()

    const{selectedUserId}=useSelector((state:any)=>state.AuthReducer)
    console.log(selectedUserId,"selectedUserId====>")
    
    const location = useLocation()

    const { loginDetails } = useSelector(
        (state: any) => state.AppReducer
    );
    // && selectedAuthId

    if (loginDetails?.isLoggedIn && selectedUserId ) {
        console.log(selectedUserId,"selectedUserId====>1")
        return <Navigate to={ROUTES['auth-module'].splash} state={{ path: location.pathname }} />
    }
    else if(loginDetails?.isLoggedIn){
        console.log(selectedUserId,"selectedUserId====>2")
        return <Navigate to={ROUTES['task-module'].tasks} state={{ path: location.pathname }} />
    }
    return (
        <ScreenWrapper>
            {children}
        </ScreenWrapper>
    )
}

export default RequireHome;
