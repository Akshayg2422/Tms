import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  HomeContainer,
  Input,
  DropDown,
  H,
  Button,
  showToast,
  InputHeading,
} from "@Components";

import {
  GENDER_LIST,
  ADD_USER_RULES,
  validate,
  ifObjectExist,
  getValidateError,
  //
  matchStateToTerm,
} from "@Utils";
import { useInput, useDropDown, useNavigation } from "@Hooks";
import { translate } from "@I18n";
import { addEmployee, getDesignationData } from "@Redux";

import Autocomplete from "react-autocomplete";

function AddUser() {
  const { companyDetailsSelected, designationData } = useSelector(
    (state: any) => state.AdminReducer
  );

  const dispatch = useDispatch();
  const firstName = useInput("");
  const contactNumber = useInput("");
  const email = useInput("");
  const gender = useDropDown(GENDER_LIST[0]);
  const [designationValue, setDesignationValue] = useState("");
  const { goBack } = useNavigation();
  console.log(designationValue, "designationValue");

  useEffect(() => {
    const params = {
      brach_id: companyDetailsSelected.branch_id,
    };
    dispatch(
      getDesignationData({
        params,
        onSuccess: () =>()=> {},
        onError: () =>()=> {},
      })
    );
  }, []);

  const submitAddUserHandler = () => {
    if (designationData.data.name !== designationValue) {
      const params = {
        branch_id: companyDetailsSelected.branch_id,
        first_name: firstName.value,
        mobile_number: contactNumber.value,
        email: email.value,
        gender: gender.value?.id, 
        designation_name: designationValue,
      };

      const validation = validate(ADD_USER_RULES, {
        branch_id: companyDetailsSelected.branch_id,
        first_name: firstName.value,
        mobile_number: contactNumber.value,
        ...(email.value && { email: email.value }),
        gender: gender.value?.id,
        designation_name: designationValue,
      });
      if (ifObjectExist(validation)) {
        dispatch(
          addEmployee({
            params,
            onSuccess: () =>()=> {
              goBack();
            },
            onError: (error) =>()=> {
              console.log(error, "------------------------->if error");
            },
          })
        );
      } else {
        showToast(getValidateError(validation));
      }
    } else {
      const params = {
        branch_id: companyDetailsSelected.branch_id,
        first_name: firstName.value,
        mobile_number: contactNumber.value,
        email: email.value,
        gender: gender.value?.id,
        designation_name: designationData.data.id,
      };

      const validation = validate(ADD_USER_RULES, {
        branch_id: companyDetailsSelected.branch_id,
        first_name: firstName.value,
        mobile_number: contactNumber.value,
        ...(email.value && { email: email.value }),
        gender: gender.value?.id,
        designation_name: designationData.data.id,
      });
      if (ifObjectExist(validation)) {
        dispatch(
          addEmployee({
            params,
            onSuccess: () => ()=>{
              goBack();
            },
            onError: (error) =>()=> {
              console.log(error, "------------------------->else error");
            },
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
        <div className="row mt--3">
          <div className="col-md-9 col-lg-7">
            <Input
              heading={translate("common.name")}
              value={firstName.value}
              onChange={firstName.onChange}
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
              onChange={email.onChange}
            />
            <DropDown
              heading={translate("auth.gender")}
              data={GENDER_LIST}
              value={gender.value}
              onChange={gender.onChange}
            />

            <div>
              {" "}
              <InputHeading heading={"Designation"} />
            </div>
            <div className="">
              <Autocomplete
              
                renderInput={(props) => (
                  <input
                    className={"designation-input form-control "}
                    {...props}
                  />
                )}
                value={designationValue}
                wrapperStyle={{ position: "relative", display: "inline-block"}}
                items={designationData.data}
                getItemValue={(item) => item.name}
                shouldItemRender={matchStateToTerm}
                onChange={(event, value) => setDesignationValue(value)}
                onSelect={(value) => {
                  setDesignationValue(value);
                }}
                renderMenu={(children) => (
                  <div className="menu designation-scroll-bar" >{children}</div>
                )}
                renderItem={(item, isHighlighted) => (
                  <div
                    style={{
                      background: isHighlighted ? "lightgray" : "white",
                    }}
                    key={item.id}
                  >
                    {item.name}
                  </div>
                )}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col-md-6 col-lg-4  my-4">
            <Button
              block
              text={translate("common.submit")}
              onClick={submitAddUserHandler}
            />
          </div>
        </div>
      </HomeContainer>
    </>
  );
}
export { AddUser };
