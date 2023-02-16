import React from "react";
import { Card, Input, Button, H, Logo, Radio, showToast } from "@Components";
import { translate } from "@I18n";
import { LANGUAGES, BUSINESS, validate, MOBILE_NUMBER_RULES, ifObjectExist } from "@Utils";
import { useInput, useNavigation } from "@Hooks";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_PATH } from '@Routes'

import {
  validateUserBusiness,
  setRegisteredMobileNumber,
  setLanguage,
} from "@Redux";

function Login() {

  const { goTo } = useNavigation()
  const mobileNumber = useInput("");
  const dispatch = useDispatch();

  const {language } = useSelector(
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
          onSuccess: () =>()=> {
            dispatch(setRegisteredMobileNumber(mobileNumber.value));
            goTo(AUTH_PATH.OTP)
          },
          onError: () =>()=> {
            dispatch(setRegisteredMobileNumber(mobileNumber.value));
            goTo(AUTH_PATH.OTP)
          },
        })
      );
    } else {
      showToast(validation.mobileNumber + "");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <Card className="col-sm-9 col-md-7">
        <Logo />
        <div className="my-5">
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

        <Button
          block
          text={translate("common.submit")}
          onClick={() => {
            validateUserBusinessApiHandler();
          }}
        />
        <div className="text-center">
          <small className="pointer p-1">{translate("common.register")}</small>
        </div>
      </Card>
    </div>
  );
}

export { Login };
