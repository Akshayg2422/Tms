import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  HomeContainer,
  Input,
  DropDown,
  H,
  Button,
  showToast,
  AutoCompleteDropDown,
  Dropzone,
} from "@Components";

import {
  GENDER_LIST,
  ADD_USER_RULES,
  validate,
  ifObjectExist,
  getValidateError,
} from "@Utils";
import { useInput, useDropDown, useNavigation } from "@Hooks";
import { translate } from "@I18n";
import { addEmployee, getDesignationData, setIsSync } from "@Redux";

// import Autocomplete from "react-autocomplete";

function AddUser() {
  const { companyDetailsSelected, designationData } = useSelector(
    (state: any) => state.AdminReducer
  );
  
  
  const { isSync } = useSelector((state: any) => state.AppReducer);
  const [photo, setPhoto] = useState("");

  const dispatch = useDispatch();
  const firstName = useInput("");
  const contactNumber = useInput("");
  const email = useInput("");
  const gender = useDropDown(GENDER_LIST[0]);
  const [designationValue, setDesignationValue] = useState("");
  const { goBack } = useNavigation();
  let attach=photo.slice(-1,4)

  useEffect(() => {
    const params = {
      branch_id: companyDetailsSelected?.branch_id,
    };
    dispatch(
      getDesignationData({
        params,
        onSuccess: () => () => { },
        onError: () => () => { },
      })
    );
  }, []);

  const submitAddUserHandler = () => {
    if (designationData[0].name !== designationValue) {
      const params = {
        branch_id: companyDetailsSelected?.branch_id,
        first_name: firstName.value,
        mobile_number: contactNumber.value,
        email: email.value,
        gender: gender.value?.id,
        designation_name: designationValue,
        profile_image:attach,
      };

      const validation = validate(ADD_USER_RULES, {
        branch_id: companyDetailsSelected?.branch_id,
        first_name: firstName.value,
        mobile_number: contactNumber.value,
        ...(email.value && { email: email.value }),
        gender: gender.value?.id,
        designation_name: designationValue,
        profile_image:photo,
      });
      if (ifObjectExist(validation)) {
        dispatch(
          addEmployee({
            params,
            onSuccess: (response: any) => () => {
              if (response.success) {
                showToast(response.message, "success");
                goBack();
              }
              dispatch(
                setIsSync({
                  ...isSync,
                  issues: false,
                })
              );
            },
            onError: (error) => () => {
              showToast(error.error_message);
            },
          })
        );
      } else {
        showToast(getValidateError(validation));
      }
    } else {
      const params = {
        branch_id: companyDetailsSelected?.branch_id,
        first_name: firstName.value,
        mobile_number: contactNumber.value,
        email: email.value,
        gender: gender.value.id,
        designation_name: designationData[0]?.id,
        profile_image:photo
      };
     
    
      
      const validation = validate(ADD_USER_RULES, {
        branch_id: companyDetailsSelected?.branch_id,
        first_name: firstName.value,
        mobile_number: contactNumber.value,
        ...(email.value && { email: email.value }),
        gender: gender.value.id,
        designation_name: designationData[0]?.id,
        profile_image:photo,
      });

      if (ifObjectExist(validation)) {
        dispatch(
          addEmployee({
            params,
            onSuccess: (response: any) => () => {
              if (response.success) {
                showToast(response.message, "success");
                goBack();
              }
              dispatch(
                setIsSync({
                  ...isSync,
                  issues: false,
                })
              );
            },
            onError: (error) => () => { },
          })
        );
      } else {
        showToast(getValidateError(validation));
      }
    }
  };

  return (
    <>
      <HomeContainer isCard title={translate("common.addUser")!}>
        <div className="col-md-6">
          <Input
            heading={translate("common.name")}
            value={firstName.value}
            onChange={firstName?.onChange}
          />
          <Input
            type={"number"}
            heading={translate("auth.contactNumber")}
            maxLength={10}
            value={contactNumber.value}
            onChange={contactNumber.onChange}
          />
          <Input
            heading={translate("auth.email")}
            value={email.value}
            onChange={email?.onChange}
          />
          <DropDown
            heading={translate("auth.gender")}
            data={GENDER_LIST}
            selected={gender.value}
            value={gender.value}
            onChange={gender.onChange}
          />

          <div>
            {designationData && (
              <AutoCompleteDropDown
                heading={"Designation"}
                value={designationValue}
                item={designationData}
                onChange={(event, value) => setDesignationValue(value)}
                onSelect={(value) => {
                  setDesignationValue(value);
                }}
              />
            )}
          </div>
          <div >
          <label className={`form-control-label`}>
          {translate("auth.attach")}
          </label>
        </div>
          <div className=" pb-2 pt-1">
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
        </div>

        <div className="col mt-4">
          <Button
            text={translate("common.submit")}
            onClick={submitAddUserHandler}
          />
        </div>
      </HomeContainer>
    </>
  );
}
export { AddUser };
