import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input, DropDown, Button, showToast,  Back, Card, ImagePicker
} from "@Components";
import {
  GENDER_LIST,
  ADD_USER_RULES,
  validate,
  ifObjectExist,
  getValidateError,
  getDropDownDisplayData
} from "@Utils";

import { useInput, useDropDown, useNavigation, useLoader } from "@Hooks";
import { translate } from "@I18n";
import { addEmployee, getDepartments, getDesignations, } from "@Redux";

function AddUser() {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const { selectedCompany, dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
  const { company_branch } = dashboardDetails || ''
 

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
  const   loginLoader =useLoader(false)

  useEffect(() => {

    const params = {
      branch_id: selectedCompany?.branch_id ? selectedCompany?.branch_id : company_branch?.id,
      ...(department?.value?.id &&{department_id:department?.value?.id}),
      per_page_count: -1,
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
  }, [department.value]);


  useEffect(() => {

    const params = {
      branch_id: selectedCompany?.branch_id ? selectedCompany?.branch_id : company_branch?.id,
      per_page_count: -1,
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



  const submitAddUserHandler = () => {

    const params = {
      branch_id: selectedCompany?.branch_id ? selectedCompany?.branch_id : company_branch?.id,
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
      loginLoader.show()

      console.log('came');

      dispatch(
        addEmployee({
          params,
          onSuccess: (response: any) => () => {
            console.log(response);
            if (response.success) {
              loginLoader.hide()
              showToast(response.message, "success");
              goBack();
            }
          },
          onError: (error) => () => {
            loginLoader.hide()
          },
        })
      );
    } else {

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
          heading={translate('auth.designation')}
          data={getDropDownDisplayData(designations)}
          selected={designation.value}
          value={designation.value}
          onChange={designation.onChange}
        />

      
      </div>
      <div className="mt--2">
             <ImagePicker
               
                 size='xl'
                 heading="photo"
                 noOfFileImagePickers={0}
                 onSelect={(image) => {
                     let file =image.toString().replace(/^data:(.*,)?/, "")
                     setPhoto(file)
                 }}
                 onSelectImagePicker={(el)=>{
                     

                 }}
             />
            
             </div>

      <div className="col mt-4">
        <Button
          text={translate("common.submit")}
          onClick={submitAddUserHandler}
          loading={ loginLoader.loader}
        />
      </div>
    </Card>
  );
}
export { AddUser };
