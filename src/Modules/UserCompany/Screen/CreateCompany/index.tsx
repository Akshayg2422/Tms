import React, { useState } from "react";
import { translate } from "@I18n";
import { CreateCompanyProps } from "./interfaces";
import {
  Card,
  Input,
  DropDown,
  H,
  Divider,
  Button,
  showToast,
  Dropzone,
  Back
} from "@Components";
import {
  GENDER_LIST,
  validate,
  BUSINESS_FORM_RULES,
  USER_FORM_RULES,
  getValidateError,
  ifObjectExist,
} from "@Utils";

import { useDispatch, useSelector } from "react-redux";
import { registerCompany, registerAdmin } from "@Redux";
import { useInput, useDropDown, useNavigation } from "@Hooks";

function CreateCompany({ }: CreateCompanyProps) {
  const { isSync } = useSelector((state: any) => state.AppReducer);

  const [photo, setPhoto] = useState("");
  const { goBack } = useNavigation();
  const dispatch = useDispatch();
  const fullName = useInput("");
  const contactNumber = useInput("");
  const email = useInput("");
  const gender = useDropDown(GENDER_LIST[0]);
  const name = useInput("");
  const address = useInput("");
  const city = useInput("");
  const pinCode = useInput("");
  const companyContactNumber = useInput("");
  let attach = [photo]
  let PhotoAttach = attach.slice(-1, 4)

  const submitRegisteredAdminHandler = () => {
    const params = {
      first_name: fullName.value,
      mobile_number: contactNumber.value,
      email: email.value,
      gender: gender.value?.id,
      designation: "Management",
    }

    const validation = validate(USER_FORM_RULES, {
      first_name: fullName.value,
      mobile_number: contactNumber.value,
      ...(email.value && { email: email.value }),
      gender: gender.value?.id,
      designation: "Management",
    });
    if (ifObjectExist(validation)) {
      dispatch(
        registerAdmin({
          params,
          onSuccess: (response: any) => () => {
            onRegisterCompany();
            if (response.success) {
              showToast(response.message, "success");
            }
          },
          onError: (error) => {
            showToast(error.error_message);
          },
        })
      );
    } else {
      showToast(getValidateError(validation));
    }
  };

  const onRegisterCompany = () => {
    const params = {
      registered_name: name.value,
      city: city.value,
      communication_address: address.value,
      pincode: pinCode.value,
      mobile_number1: contactNumber.value,
      mobile_number2: companyContactNumber.value,
      attachment_logo: PhotoAttach[0],
    };

    const validation = validate(BUSINESS_FORM_RULES, params);
    console.log("++++", ifObjectExist(validation))
    if (ifObjectExist(validation)) {
      dispatch(
        registerCompany({
          params,
          onSuccess: (response: any) => () => {
            if (response.success) {
              showToast(response.message, "success");
              goBack();
            }
          },
          onError: (error: any) => () => {
            showToast(error.message, "error");
          },
        })
      );
    } else {
      showToast(getValidateError(validation));
    }
  };

  return (
    <Card className="m-3">
      <div className='col'>
        <div className="row">
          <Back />
          <h3 className="ml-3">{translate("common.addCompany")!}</h3>
        </div>

      </div>
      <hr className='mt-3'></hr>
      <div className="col-md-9 col-lg-5">
        <H
          tag={"h3"}
          className="heading mb-3"
          text={translate("common.companyDetails")}
        />
        <label className={`form-control-label`}>{translate("auth.logo")}</label>
      </div>
      <div className="col-md-9 col-lg-7 pb-4 pt-3">
        <Dropzone
          variant="ICON"
          icon={photo}
          size="xl"
          onSelect={(image) => {
            let encoded = image.toString().replace(/^data:(.*,)?/, "");
            setPhoto(encoded);
          }}
        />
      </div>
      <div className="col-md-9 col-lg-5">
        <Input
          heading={translate("common.name")}
          value={name.value}
          onChange={name.onChange}
        />

        <Input
          type={"number"}
          heading={translate("common.contactNumber")}
          maxLength={10}
          value={companyContactNumber.value}
          onChange={companyContactNumber.onChange}
        />

        <Input
          heading={translate("auth.address")}
          value={address.value}
          onChange={address.onChange}
        />

        <Input
          type={'text'}
          heading={translate("auth.city")}
          value={city.value}
          onChange={city.onChange}
        />

        <Input
          type={"number"}
          heading={translate("common.PinCode")}
          maxLength={6}
          value={pinCode.value}
          onChange={pinCode.onChange}
        />

      </div>

      <Divider />

      <div className="col-md-9 col-lg-5">
        <H
          tag={"h3"}
          className="heading mb-3"
          text={translate("common.primaryContactPerson")}
        />
        <Input
          heading={translate("auth.fullName")}
          value={fullName.value}
          onChange={fullName.onChange}
        />
        <Input
          type={"number"}
          heading={translate("auth.contactNumber")}
          maxLength={10}
          value={contactNumber.value}
          onChange={contactNumber.onChange}
        />
        <Input
          heading={translate("auth.emailOptional")}
          value={email.value}
          onChange={email?.onChange}
        />
        <DropDown
          heading={translate("auth.gender")}
          selected={gender.value}
          data={GENDER_LIST}
          value={gender.value}
          onChange={gender.onChange}
        />
      </div>

      <div className="col">
        <Button
          text={translate("common.submit")}
          onClick={() => {
            submitRegisteredAdminHandler();
          }}
        />
      </div>
    </Card >
  );
}

export { CreateCompany };
