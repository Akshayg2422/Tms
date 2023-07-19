import React from "react";
import { Input, Button, H, Logo, Radio, showToast, ComponentLoader } from "@Components";
import { translate } from "@I18n";
import { LANGUAGES, BUSINESS, validate, MOBILE_NUMBER_RULES, ifObjectExist, getValidateError } from "@Utils";
import { useInput, useNavigation, useLoader } from "@Hooks";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from '@Routes'

import {
  validateUserBusiness,
  setRegisteredMobileNumber,
  setLanguage,
} from "@Redux";

function Login() {

  const { goTo } = useNavigation()

  const mobileNumber = useInput("");
  const dispatch = useDispatch();

  const { language } = useSelector(
    (state: any) => state.AuthReducer
  );

  const loginLoader = useLoader(false);

  const validateUserBusinessApiHandler = () => {



    const params = {
      mobile_number: mobileNumber.value,
      ln: language.value,
      app_user_type: BUSINESS,
    };

    const validation = validate(MOBILE_NUMBER_RULES, params);

    if (ifObjectExist(validation)) {
      loginLoader.show()
      dispatch(
        validateUserBusiness({
          params,
          onSuccess: () => () => {
            loginLoader.hide()
            dispatch(setRegisteredMobileNumber(mobileNumber.value));
            goTo(ROUTES["auth-module"].otp)
          },
          onError: (error) => () => {
            loginLoader.hide()
            showToast(error.error_message, 'error');
          },
        })
      );
    } else {
      showToast(getValidateError(validation));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      validateUserBusinessApiHandler();
    }
  };

  return (
    <div className=" vh-100 d-flex justify-content-center align-items-center">
      <div className="col-sm-9 col-md-6 col-lg-4">
        <Logo />
        <div className="my-5">
          <Input
            heading={translate("auth.mobileNumber")}
            placeholder={"00000 00000"}
            type={"number"}
            onChange={mobileNumber.onChange}
            value={mobileNumber.value}
            maxLength={10}
            onKeyDown={handleKeyDown}
          />
          <H tag={"h5"} text={translate("auth.chooseLanguge")} />
          <Radio
            selected={language}
            selectItem={language}
            data={LANGUAGES}
            onRadioChange={(selected) => {
              if (selected) {
                dispatch(setLanguage(selected));
              }
            }}
          />
        </div>

        <Button
          loading={loginLoader.loader}
          block
          text={translate("common.submit")}
          onClick={() => {
            validateUserBusinessApiHandler();
          }}
        />
      </div>
    </div>
  );
}

export { Login };
