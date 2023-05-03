import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input, DropDown, Button, showToast, AutoCompleteDropDown, Dropzone, Back, Card
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
import { addEmployee, getDepartments, getDesignations, } from "@Redux";


// import Autocomplete from "react-autocomplete";

function AddUser() {


  const dispatch = useDispatch();
  const { goBack } = useNavigation();


  const { selectedCompany } = useSelector((state: any) => state.UserCompanyReducer);

  const { designations, departments } = useSelector(
    (state: any) => state.UserCompanyReducer
  );


  const firstName = useInput("");
  const contactNumber = useInput("");
  const email = useInput("");
  const gender = useDropDown(GENDER_LIST[0]);
  const department = useDropDown({})
  const designation = useDropDown({})
  const [photo, setPhoto] = useState("");

  useEffect(() => {

    const params = {
      branch_id: selectedCompany?.branch_id,
    };

    dispatch(
      getDesignations({
        params,
        onSuccess: (response: any) => () => {
        },
        onError: () => () => {
        },
      })
    );
  }, []);


  useEffect(() => {

    const params = {
      branch_id: selectedCompany?.branch_id,
    };

    dispatch(
      getDepartments({
        params,
        onSuccess: () => () => {
        },
        onError: () => () => {
        },
      })
    );
  }, []);


  function getDropDownDisplayData(data: any) {
    return data && data?.map((item: any) => {
      return {
        ...item,
        text: item.name
      }
    })
  }


  const submitAddUserHandler = () => {

    const params = {
      branch_id: selectedCompany?.branch_id,
      first_name: firstName.value,
      mobile_number: contactNumber.value,
      email: email.value,
      gender: gender.value?.id,
      department_id: department?.value?.id,
      designation_id: designation?.value?.id,
      profile_image: photo,
    };






    const validation = validate(ADD_USER_RULES, params);

    console.log(JSON.stringify(validation) + '======' + ifObjectExist(validation));


    if (ifObjectExist(validation)) {

      console.log('came');

      dispatch(
        addEmployee({
          params,
          onSuccess: (response: any) => () => {
            console.log(response);
            if (response.success) {
              showToast(response.message, "success");
              goBack();
            }
          },
          onError: (error) => () => {


          },
        })
      );
    } else {
      console.log(JSON.stringify(validation));

      showToast(getValidateError(validation));
    }
  }
  return (
    <Card className="m-3">
      <div className='col'>
        <div className="row">
          <Back />
          <h3 className="ml-3">{translate("common.addUser")!}</h3>
        </div>
      </div>
      <hr className='mt-3'></hr>
      <div className="col-md-6">
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
          onChange={email?.onChange}
        />
        <DropDown
          heading={translate("auth.gender")}
          data={GENDER_LIST}
          selected={gender.value}
          value={gender.value}
          onChange={gender.onChange}
        />

        <DropDown
          heading={translate("common.department")}
          data={getDropDownDisplayData(departments)}
          selected={department.value}
          value={department.value}
          onChange={department.onChange}
        />

        <DropDown
          heading={'Designation'}
          data={getDropDownDisplayData(designations)}
          selected={designation.value}
          value={designation.value}
          onChange={designation.onChange}
        />

        <div >
          <label className={`form-control-label`}>
            {'Photo'}
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
    </Card>
  );
}
export { AddUser };
