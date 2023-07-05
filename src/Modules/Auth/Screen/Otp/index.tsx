import React, { useEffect } from "react";
import { Button, AuthContainer, showToast, ComponentLoader } from "@Components";
import { useInput, useTimer, useNavigation, useLoader, useKeyPress } from "@Hooks";
import { OTP_RESEND_DEFAULT_TIME, BUSINESS, validate, OTP_RULES, ifObjectExist, USER_TOKEN, getValidateError } from "@Utils";
import { useSelector, useDispatch } from "react-redux";
import { validateRegisterUser, otpLogin, userLoginDetails, getDashboard, validateUserBusiness, setRegisteredMobileNumber, getReSendOtp } from "@Redux";
import { ROUTES } from '@Routes'
import OtpInput from "react-otp-input";

function Otp() {

  const dispatch = useDispatch();
  const { registeredMobileNumber, language } = useSelector(
    (state: any) => state.AuthReducer
  );

 
  const otpLoader = useLoader(false);
  const { goTo } = useNavigation()
  const { loginDetails } = useSelector((state: any) => state.AppReducer);
  const { seconds, setSeconds } = useTimer(OTP_RESEND_DEFAULT_TIME);
  const otp = useInput("");
  const isEnterPressed = useKeyPress("Enter");

  useEffect(() => {
    if (isEnterPressed) {
      proceedOtpValidationApiHandler()
    }
  }, [isEnterPressed]);


  const proceedOtpResentApiHandler = () => {
   

    setSeconds(OTP_RESEND_DEFAULT_TIME);

    const params = {
      mobile_number: registeredMobileNumber,
   
    };
    console.log(params,"pppppppppp")

      dispatch(
        getReSendOtp({
          params,
          onSuccess: () => () => {
        
         
          },
          onError: (error) => () => {
       
            showToast(error.error_message, 'error');
          },
        })
      );

  };
  // mobile_number: mobileNumber.value,
  // ln: language.value,
  // app_user_type: BUSINESS,


  function getDashboardDetails() {
    const params = {}
    dispatch(getDashboard({
      params,
      onSuccess: () => () => {
        goTo(ROUTES["auth-module"].splash)
      },
      onError: () => () => { }
    }));
  }


  const proceedOtpValidationApiHandler = () => {
  
    const params = {
      mobile_number: registeredMobileNumber,
      otp: otp.value,
    };

    const validation = validate(OTP_RULES, params);

    if (ifObjectExist(validation)) {
      otpLoader.show()
      dispatch(
        otpLogin({
          params,
          onSuccess: response => () => {
            otpLoader.hide()

            dispatch(
              userLoginDetails({
                ...loginDetails,
                isLoggedIn: true,
                is_admin: response.details?.company?.type_is_provider,
              }),
            );
           
            localStorage.setItem(USER_TOKEN, response.details.token);
            getDashboardDetails();

          },
          onError: (error) => () => {
            otpLoader.hide()
            showToast(error.error_message, 'error')
          },
        }),
      );
    } else {
      showToast(getValidateError(validation));
    }

  };


  return (
    <AuthContainer>
      <div className="text-center my-5">
        <div className="row justify-content-center align-items-center mb-0">
          <OtpInput
            value={otp.value}
            onChange={otp.set}
            numInputs={4}
            inputStyle={'otp-input'}
            shouldAutoFocus={true}
          />
        </div>
        <div className="mb-4">
          <small className="d-block">
            Have not received the Verification Code?
          </small>
          {seconds === 0 ? (
            <div onClick={proceedOtpResentApiHandler}>
              <span className="font-weight-600 pointer">{"Resend"}</span>
            </div>
          ) : (
            <span className="font-weight-600 ml-1">
              {"00:" + (seconds < 10 ? "0" + seconds : seconds)}
            </span>
          )}
        </div>

        <div className="d-flex justify-content-center">
          <div className="col-sm-8">
            <ComponentLoader loading={otpLoader.loader}>
              <Button
                block
                text={"VERIFY"}
                onClick={proceedOtpValidationApiHandler}
              />
            </ComponentLoader>
          </div>
        </div>

      </div>

    </AuthContainer >
  );
}
export { Otp };
