import React, { useState } from "react";
import { translate } from "@I18n";
import { RegisterProps } from "./interfaces";
import {
  Card,
  Input,
  DropDown,
  H,
  Divider,
  Button,
  showToast,
  Dropzone,
  Back,
  ImagePicker
} from "@Components";
import {
  GENDER_LIST,
  validate,
  getValidateError,
  ifObjectExist,
  USER_TOKEN,
} from "@Utils";

import { useDispatch, useSelector } from "react-redux";
import { registerCompany, registerAdmin,getDashboard, userLoginDetails } from "@Redux";
import { useInput, useDropDown, useNavigation, useLoader } from "@Hooks";
import { ROUTES } from "@Routes";
import { USER_FORM_RULES } from "@Utils//Validate/Rules";


function Register() {

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
  const loginLoader = useLoader(false)
  const { loginDetails } = useSelector((state: any) => state.AppReducer);
  const { goTo } = useNavigation()
  

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
      registered_name: name.value,
      city: city.value,
      communication_address: address.value,
      pincode: pinCode.value,
      mobile_number1: contactNumber.value,
      mobile_number2: companyContactNumber.value,
      attachment_logo: photo,
    });

    // console.log("validation==========>>>", validation)

    if (ifObjectExist(validation)) {

      loginLoader.show()
      dispatch(
        registerAdmin({
          params,
          onSuccess: (response: any) => () => {

            localStorage.setItem(USER_TOKEN, response.details.token);
            // console.log("response.details.token===>",response.details.token)

            onRegisterCompany();
            loginLoader.hide()
        
          },
          onError: (error) => {
            showToast(error.error_message, "info");
            loginLoader.hide()
          },
        })
      );
    } else {
      showToast(getValidateError(validation));
    }
  };


  function getDashboardDetails() {
    const params = {}
    dispatch(getDashboard({
      params,
      onSuccess: response => () => {
        // console.log('log1======>',response);
        
        goTo(ROUTES["auth-module"].splash)
      },
      onError: () => () => { }
    }));
  }

  
  const onRegisterCompany = () => {
    const params = {
      registered_name: name.value,
      city: city.value,
      communication_address: address.value,
      pincode: pinCode.value,
      mobile_number1: contactNumber.value,
      mobile_number2: companyContactNumber.value,
      attachment_logo: photo,
    };
    loginLoader.show()
    loginLoader.hide()

    dispatch(
      registerCompany({
        params,
        onSuccess: (response: any) => () => {
          getDashboardDetails();
          if (response.success) {
            loginLoader.hide()
            showToast(response.message, "success");
            // console.log('log2=========>>>',response);
          
            // goBack();
          }
         
          // goTo(ROUTES["auth-module"].login)

          dispatch(
            userLoginDetails({  
              ...loginDetails,
              isLoggedIn: true,
              is_admin: response.details?.company?.type_is_provider,
            }),
          );

        },
        onError: (error: any) => () => {
          loginLoader.hide()
          showToast(error.message, "error");
        },
      })
    );
  }


  return (
    <div className="container">    
      <Card className="m-3">

      <div className='col'>
        <div className="row">
          <Back />
          <h3 className="ml-3">{translate("common.RegisterCompany")!}</h3>
        </div>

      </div>
      <hr className='mt-3'></hr>
      <div className="col-md-9 col-lg-5">
        <H
          tag={"h3"}
          className="heading mb-3"
          text={translate("common.companyDetails")}
        />
        {/* <label className={`form-control-label`}>{translate("auth.logo")}</label> */}
      </div>
     
      <div className="col-auto pb-2">
        <div className="row">
          <ImagePicker
            // icon={image}
            size='xl'
            heading={translate("auth.logo")!}
            noOfFileImagePickers={0}
            onSelect={(image) => {
              let file = image.toString().replace(/^data:(.*,)?/, "")
              setPhoto(file);


            }}
            onSelectImagePicker={(el) => {


            }}
          />

        </div>


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
          loading={loginLoader.loader}
          text={translate("common.submit")}
          onClick={() => {
            submitRegisteredAdminHandler();
          }}
        />
      </div>
    </Card >
    </div>

  );
}

export { Register };
