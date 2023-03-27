import React, { useState } from "react";
import { translate } from "@I18n";
import { CreateCompanyProps } from "./interfaces";
import {
  HomeContainer,
  Input,
  DropDown,
  H,
  Divider,
  Button,
  showToast,
  Dropzone,
} from "@Components";
import {
  GENDER_LIST,
  DESIGNATION_LIST,
  validate,
  BUSINESS_FORM_RULES,
  USER_FORM_RULES,
  getValidateError,
  ifObjectExist,
} from "@Utils";
import { useDispatch, useSelector } from "react-redux";
import { registerCompany, registerAdmin, setIsSync } from "@Redux";
import { useInput, useDropDown, useNavigation } from "@Hooks";

function CreateCompany({}: CreateCompanyProps) {
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
  const pinCode = useInput("");
  const companyContactNumber = useInput("");

  const submitRegisteredAdminHandler = () => {
    const params = {
      first_name: fullName.value,
      mobile_number: contactNumber.value,
      email: email.value,
      gender: gender.value?.id,
      designation: "Management",
    }
console.log(params,'registeradmin');


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
      communication_address: address.value,
      pincode: pinCode.value,
      mobile_number1: contactNumber.value,
      mobile_number2: companyContactNumber.value,
      attachment_logo: photo,
    };
    const validation = validate(BUSINESS_FORM_RULES, params);

    if (ifObjectExist(validation)) {
      dispatch(
        registerCompany({
          params,
          onSuccess: (response: any) => () => {
            if (response.success) {
              showToast(response.message, "success");
              goBack();
            }
            dispatch(
              setIsSync({
                ...isSync,
                companies: false,
              })
            );
          },
          onError: (error: any) => () => {
            showToast(error.message,"error");
          },
        })
      );
    } else {
      showToast(getValidateError(validation));
    }
  };

  return (
    <HomeContainer isCard title={translate("common.addCompany")!}>
      <div className="col-md-9 col-lg-5">
        <H
          tag={"h3"}
          className="heading mb-3"
          text={translate("common.companyDetails")}
        />
        <label className={`form-control-label`}>{translate("auth.attach")}</label>
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
          heading={translate("auth.address")}
          value={address.value}
          onChange={address.onChange}
        />
        <Input
          type={"number"}
          heading={translate("common.PinCode")}
          maxLength={6}
          value={pinCode.value}
          onChange={pinCode.onChange}
        />
       
        <Input
          type={"number"}
          heading={translate("common.contactNumber")}
          maxLength={10}
          value={companyContactNumber.value}
          onChange={companyContactNumber.onChange}
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
    </HomeContainer>
  );
}

export { CreateCompany };
