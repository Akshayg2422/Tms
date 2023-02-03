import React from "react";
import { Card, Input, Button, H, Logo, Radio } from "@Components";
import { translate } from "@I18n";
import { LANGUAGES, BUSINESS, ERROR_MESSAGE_ALERT, validate, MOBILE_NUMBER_RULES, ifObjectExist } from "@Utils";
import { useInput, useModal, useNavigation } from "@Hooks";
import { useDispatch, useSelector } from "react-redux";
import { ValidateUserBusiness } from "@Services";
import { UserValidateBusinessModal } from "@Modules";
import { AUTH_PATH } from '@Routes'
import { showToast } from '@Utils'

import {
  validateUserBusiness,
  clearValidateUserBusiness,
  setRegisteredMobileNumber,
  setLanguage,
  validateRegisterUser,
} from "@Redux";

function Login() {

  const { goTo } = useNavigation()
  const mobileNumber = useInput("");
  const dispatch = useDispatch();

  const { validateUserBusinessResponse, language } = useSelector(
    (state: any) => state.AuthReducer
  );

  const validateUserBusinessApiHandler = () => {


    const params = {
      mobile_number: mobileNumber.value,
      ln: language.value,
      app_user_type: BUSINESS,
    };

    const validation = validate(MOBILE_NUMBER_RULES, params);

    if (ifObjectExist(validation)) {
      dispatch(
        validateUserBusiness({
          params,
          onSuccess: (success) => {
            dispatch(setRegisteredMobileNumber(mobileNumber.value));
            goTo(AUTH_PATH.OTP, false)
          },
          onError: (error) => {
            showToast('error', error.error_message)
            dispatch(setRegisteredMobileNumber(mobileNumber.value));
            // goTo(AUTH_PATH.OTP, false)
          },
        })
      );
    } else {
      showToast("info", validation.mobileNumber + "");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center pt-5 ">
        <div className="col-sm-9 col-md-7 ">
          <Card className="pb-4">
            <Logo />
            <div className="my-5 mx-sm-3">
              <Input
                heading={translate("auth.mobileNumber")}
                placeholder={"00000 00000"}
                type={"number"}
                onChange={mobileNumber.onChange}
                value={mobileNumber.value}
                maxLength={10}
              />
              <H tag={"h5"} text={translate("auth.chooseLanguge")} />
              <Radio
                selected={language}
                data={LANGUAGES}
                onRadioChange={(selected) => {
                  if (selected) {
                    dispatch(setLanguage(selected));
                  }
                }}
              />
            </div>
            <div className="">
              <Button
              block
                size={'md'}
                text={translate("common.submit")}
                onClick={() => {
                  validateUserBusinessApiHandler();
                }}
              />
            </div>
            {/* <div className="text-center">
              <small className="pointer p-1" onClick={()=> goTo(AUTH_PATH.REGISTER_ADMIN)}>{translate("common.register")}</small>
            </div> */}
          </Card>
        </div>
      </div>
    </div>
  );
}

export { Login };
