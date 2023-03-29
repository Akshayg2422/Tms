import React, { useRef } from "react";
import { Button, AuthContainer, showToast } from "@Components";
import { useInput, useTimer, useNavigation } from "@Hooks";
import { OTP_RESEND_DEFAULT_TIME, BUSINESS, validate, OTP_RULES, ifObjectExist, USER_TOKEN, getValidateError } from "@Utils";
import { useSelector, useDispatch } from "react-redux";
import { validateRegisterUser, otpLogin, userLoginDetails } from "@Redux";
import { AUTH_PATH } from '@Routes'
import OtpInput from "react-otp-input";

function Otp() {
  const dispatch = useDispatch();
  const { registeredMobileNumber, language } = useSelector(
    (state: any) => state.AuthReducer
  );

  const { goTo } = useNavigation()

  const { loginDetails } = useSelector((state: any) => state.AppReducer);
  const { seconds, setSeconds } = useTimer(OTP_RESEND_DEFAULT_TIME);
  const otp = useInput("");


  const proceedOtpResentApiHandler = () => {
    setSeconds(OTP_RESEND_DEFAULT_TIME);
    const params = {
      mobile_number: registeredMobileNumber,
      ln: language,
      app_user_type: BUSINESS,
    };
    dispatch(validateRegisterUser({
      params,
      onSuccess: response => () => { },
      onError: () => () => { }
    }));
  };

  const proceedOtpValidationApiHandler = () => {

    const params = {
      mobile_number: registeredMobileNumber,
      otp: otp.value,
    };

    const validation = validate(OTP_RULES, params);

    if (ifObjectExist(validation)) {
      dispatch(
        otpLogin({
          params,
          onSuccess: response => () => {
            dispatch(
              userLoginDetails({
                ...loginDetails,
                isLoggedIn: true,
                is_admin: response.details?.company?.type_is_provider,
              }),
            );
            localStorage.setItem(USER_TOKEN, response.details.token);
            goTo(AUTH_PATH.SPLASH)
          },
          onError: (error) => () => {
            showToast(error.error_message,'error')
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
            <Button
              block
              text={"VERIFY"}
              onClick={proceedOtpValidationApiHandler}
            />
          </div>
        </div>
      </div>
    </AuthContainer>
  );
}
export { Otp };
