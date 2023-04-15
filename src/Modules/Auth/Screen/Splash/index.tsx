import React, { useEffect } from "react";
import { Logo } from "@Components";
import { ROUTES, HOME_PATH, } from "@Routes";
import { useNavigation } from "@Hooks";
import { useSelector ,useDispatch} from 'react-redux'
import {loginUser} from '@Redux'

function Splash() {
  const SPLASH_STAY_TIME_MILE_SECONDS = 1500;
  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const { loginDetails } = useSelector((state: any) => state.AppReducer);
  useEffect(() => {
    setTimeout(() => {
      if (loginDetails?.isLoggedIn) {
        goTo(HOME_PATH.DASHBOARD, true)
        dispatch(
          loginUser(true)

        )
      }
      else {
        goTo(ROUTES.AUTH.LOGIN, true);
      }
    }, SPLASH_STAY_TIME_MILE_SECONDS);
  }, []);
  return (
    <div className={"d-flex vh-100 custom-gradient justify-content-center align-items-center"}>
      <Logo />
    </div>
  );
}

export { Splash };
