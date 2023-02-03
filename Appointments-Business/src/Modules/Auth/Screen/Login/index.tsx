import React from "react";
import { Card, Input, Button, H, Logo, Radio, showToast } from "@Components";
import { translate } from "@I18n";
import { LANGUAGES, BUSINESS, ERROR_MESSAGE_ALERT , validate, MOBILE_NUMBER_RULES, ifObjectExist} from "@Utils";
import { useInput, useModal, useNavigation } from "@Hooks";
import { useDispatch, useSelector } from "react-redux";
import { ValidateUserBusiness } from "@Services";
import { UserValidateBusinessModal } from "@Modules";
import {ROUTES} from  '@Routes'

import {
  validateUserBusiness,
  clearValidateUserBusiness,
  setRegisteredMobileNumber,
  setLanguage,
  validateRegisterUser,
} from "@Redux";

function Login() {

  const {goTo} = useNavigation()
  const mobileNumber = useInput("");
  const userRegisterBusinessModal = useModal(false);
  const dispatch = useDispatch();
  const { validateUserBusinessResponse, language } = useSelector(
    (state: any) => state.AuthReducer
  );

  const validateUserBusinessApiHandler = () => {
    const validation = validate(MOBILE_NUMBER_RULES, {
      mobileNumber: mobileNumber.value,
    });

    if (ifObjectExist(validation)) {
      const params = {
        mobile_number: mobileNumber.value,
        ln: language.value,
        app_user_type: BUSINESS,
      };

      dispatch(
        validateUserBusiness({
          params,
          onSuccess: () => {},
          onError: (error: ValidateUserBusiness) => {              
            if (error.message_duration === ERROR_MESSAGE_ALERT) {
              userRegisterBusinessModal.onChange(true);
            }
          },
        })
      );
    } else {
      showToast(validation.mobileNumber + "");
    }
  };

  const proceedValidateRegisterUser = () => {
    
    const params = {
      mobile_number: mobileNumber.value,
      ln: language.value,
      app_user_type: BUSINESS,
    };
    console.log(JSON.stringify(params));
    
    dispatch(
      validateRegisterUser({
        params,
        onSuccess: () => {
          goTo(ROUTES.AUTH.OTP)
          userRegisterBusinessModal.onChange(false);
        },
        onError: () => {},
      })
    );
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
      {userRegisterBusinessModal.visible && (
        <UserValidateBusinessModal
          text={
            validateUserBusinessResponse &&
            validateUserBusinessResponse.error_message
          }
          isOpen={userRegisterBusinessModal.visible}
          onClose={() => {
            userRegisterBusinessModal.onChange(false);
          }}
          primaryOnClick={() => {
            proceedValidateRegisterUser();
          }}
          secondaryOnClick={() => {
            userRegisterBusinessModal.onChange(false);
          }}
        />
      )}
    </div>
  );
}

export { Login };
