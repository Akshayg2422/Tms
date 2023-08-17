import React, { useEffect } from "react";
import { Logo } from "@Components";
import { ROUTES } from "@Routes";
import { useNavigation } from "@Hooks";
import { useSelector, useDispatch } from 'react-redux'


function Splash() {

  const SPLASH_STAY_TIME_MILE_SECONDS = 2000;
  const { goTo } = useNavigation();
  const dispatch = useDispatch()

  const { loginDetails } = useSelector((state: any) => state.AppReducer);

  console.log('log11+++',JSON.stringify(loginDetails));
  

  useEffect(() => {

    setTimeout(() => {
      console.log('ihyutfygh')
      
      if (loginDetails?.isLoggedIn) {

        goTo(ROUTES["task-module"].tasks, true)
      }
      else {
        goTo(ROUTES["auth-module"].login, true);
      }
    }, 
    SPLASH_STAY_TIME_MILE_SECONDS);
  }, []);

  
  return (
    <div className={"d-flex vh-100  justify-content-center align-items-center"}>
      <Logo />
    </div>
  );
}

export { Splash };
