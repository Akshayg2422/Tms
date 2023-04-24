import React, { useEffect } from "react";
import { Logo } from "@Components";
import { ROUTES, HOME_PATH, } from "@Routes";
import { useNavigation } from "@Hooks";
import { useSelector, useDispatch } from 'react-redux'
import { addPushNotification, loginUser } from '@Redux'
import { FCM_TOKEN } from "@Utils";

function Splash() {
  const SPLASH_STAY_TIME_MILE_SECONDS = 1500;
  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const { loginDetails } = useSelector((state: any) => state.AppReducer);
  const { notification } = useSelector((state: any) => state.AuthReducer);
  const fcmTokenValue = localStorage.getItem(FCM_TOKEN)

  console.log("fcmToken ------------------>", fcmTokenValue)
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

  function getPushNotification() {
    const params = {
      device_model: notification?.model,
      device_platform: notification?.platform,
      device_brand: notification?.brand,
      device_token: fcmTokenValue
    }
    dispatch(addPushNotification({
      params,
      onSuccess: (success) => () => {
        console.log("successsssss----->", success)
        if (fcmTokenValue) {
          getPushNotification() // web app config api call
        }
      },
      onError: (error) => () => {

      }
    }))
  }
  return (
    <div className={"d-flex vh-100 custom-gradient justify-content-center align-items-center"}>
      <Logo />
    </div>
  );
}

export { Splash };
