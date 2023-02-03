import React, { useEffect } from "react";
import { Logo } from "@Components";
import { ROUTES } from "@Routes";
import { useNavigation } from "@Hooks";
import { useDispatch, useSelector } from 'react-redux'
import { fetchDashboardDetails } from '@Redux'


function Splash() {
  const SPLASH_STAY_TIME_MILE_SECONDS = 3000;
  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const { loginDetails } = useSelector((state: any) => state.AppReducer);


  useEffect(() => {
    setTimeout(() => {
      if (loginDetails?.isLoggedIn) {
        getDashboardDetails()
        goTo(ROUTES.HOME.DASHBOARD, true)
      } else {
        goTo(ROUTES.AUTH.LOGIN, true);
      }
    }, SPLASH_STAY_TIME_MILE_SECONDS);
  });

  const getDashboardDetails = () => {
    const params= {}
    dispatch(fetchDashboardDetails({
      params,
      onSuccess:(success)=>{
        console.log("dashboardDetails success--->", success);

      },
      onError:()=>{

      }
    }))
  }

  return (
    <div className={"d-flex h-100 justify-content-center align-items-center"}>
      <Logo />
    </div>
  );
}

export { Splash };
