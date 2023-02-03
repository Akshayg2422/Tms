import React from "react";
import { OtpInput, Button } from "@Components";
import { AuthContainer } from "@Modules";
import { useInput, useTimer } from "@Hooks";
import { OTP_RESEND_DEFAULT_TIME, BUSINESS } from "@Utils";
import { useSelector, useDispatch } from "react-redux";
import { otpRegister, validateRegisterUser, clearOtpRegister } from "@Redux";

function Otp() {
  const dispatch = useDispatch();
  const { registeredMobileNumber, language } = useSelector(
    (state: any) => state.AuthReducer
  );
  const { seconds, setSeconds } = useTimer(OTP_RESEND_DEFAULT_TIME);
  const otp1 = useInput("");
  const otp2 = useInput("");
  const otp3 = useInput("");
  const otp4 = useInput("");

  const proceedOtpResentApiHandler = () => {
    setSeconds(OTP_RESEND_DEFAULT_TIME);
    const params = {
      mobile_number: registeredMobileNumber,
      ln: language,
      app_user_type: BUSINESS,
    };
    dispatch(validateRegisterUser({ params }));
  };

  const proceedOtpValidationApiHandler = () => {
    const finalOtp = otp1.value + otp2.value + otp3.value + otp4.value;

    const params = {
      mobile_number: registeredMobileNumber,
      otp: finalOtp,
    };


    dispatch(
      otpRegister({
        params,
        onSuccess: (response: any) => {
          console.log(JSON.stringify(response));

        },
        onError: () => {
        },
      })
    );
  };

  return (
    <AuthContainer>
      <div className="text-center my-5">
        <div className="row justify-content-center align-items-center mb-0">
          <OtpInput value={otp1.value} onChange={otp1.onChange} />
          <OtpInput value={otp2.value} onChange={otp2.onChange} />
          <OtpInput value={otp3.value} onChange={otp3.onChange} />
          <OtpInput value={otp4.value} onChange={otp4.onChange} />
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
