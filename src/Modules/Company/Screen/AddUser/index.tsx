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
  Image
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
import { addEmployee, getDepartmentData, getDesignationData, setIsSync } from "@Redux";
import { icons } from "@Assets";

// import Autocomplete from "react-autocomplete";

function AddUser() {
  const { companyDetailsSelected,  } = useSelector(
    (state: any) => state.AdminReducer
  );
  const { designationData,departmentData } = useSelector(
    (state: any) => state.UserCompanyReducer
  );

  
  const { isSync } = useSelector((state: any) => state.AppReducer);
  const [photo, setPhoto] = useState("");
  const departmentDropDown = useDropDown([0])
  const [departmentDatalist, setDepartmentDatalist] = useState<any>()
  const dispatch = useDispatch();
  const firstName = useInput("");
  const contactNumber = useInput("");
  const email = useInput("");
  const gender = useDropDown(GENDER_LIST[0]);
  const [designationValue, setDesignationValue] = useState("");
  const { goBack } = useNavigation();
  let attach=[photo]
  let photoAttach=attach.slice(-1,4)


  console.log(departmentData,"==========>")
  useEffect(() => {
    const params = {
      branch_id: companyDetailsSelected?.branch_id,
    };
   
    dispatch(
      getDesignationData({
        params,
        onSuccess: (response:any) => () => { 

         
        },
        onError: () => () => { 
          setDepartmentDatalist([])
        },
      })
    );
  }, []);


  useEffect(() => {
    const params = {
      branch_id: companyDetailsSelected?.branch_id,
    };
   
    dispatch(
      getDepartmentData({
        params,
        onSuccess: (response:any) => () => {
          let departmentDetails: any = [];
          response?.details?.data?.forEach((item) => {
            departmentDetails = [...departmentDetails, { ...item, text: item.name }]
          })
        
          setDepartmentDatalist(departmentDetails)
         },
        onError: () => () => {
          setDepartmentDatalist([])
         },
      })
    );
  }, []);
  console.log(departmentDropDown[0]?.id,"pppppppp")
  console.log(departmentDropDown?.value?.id,"ooooooooooo")

  const submitAddUserHandler = () => {
    if (designationData[0]?.name !== designationValue) {
      const params = {
        branch_id: companyDetailsSelected?.branch_id,
        first_name: firstName.value,
        mobile_number: contactNumber.value,
        email: email.value,
        gender: gender.value?.id,
        designation_name: designationValue,
        department_id:departmentDropDown?.value?.id,
        profile_image:photoAttach[0],
      };
console.log(params,"pppppppp")
      const validation = validate(ADD_USER_RULES, {
        branch_id: companyDetailsSelected?.branch_id,
        first_name: firstName.value,
        mobile_number: contactNumber.value,
        ...(email.value && { email: email.value }),
        gender: gender.value?.id,
        designation_name: designationValue,
        department_id:departmentDropDown?.value?.id,
        profile_image:photoAttach[0],
      });
      if (ifObjectExist(validation)) {
        dispatch(
          addEmployee({
            params,
            onSuccess: (response: any) => () => {
              if (response.success) {
                showToast(response.message, "success");
                goBack();
                console.log('ooooooooo')
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
        department_id:departmentDropDown?.value?.id,
        profile_image:photoAttach[0]
      };
   
      const validation = validate(ADD_USER_RULES, {
        branch_id: companyDetailsSelected?.branch_id,
        first_name: firstName.value,
        mobile_number: contactNumber.value,
        ...(email.value && { email: email.value }),
        gender: gender.value.id,
        designation_name: designationData[0]?.id,
        department_id:departmentDropDown?.value?.id,
        profile_image:photoAttach[0],
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
      <HomeContainer isCard >

      <div className='row col '>
          <div
          onClick={()=>goBack()} 
          ><Image  
                    size={'sm'}
                    variant='rounded'
                    className='bg-white mt--1  pl-2'
                    src={icons.backArrow}   /></div>
      <div className='pl-2'>  <h3>{translate("common.addUser")!}</h3>
      </div>
        </div>
        <hr className='mt-3'></hr>
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
        
            <DropDown
              heading={translate("common.department")}
               data={departmentDatalist}
               selected={departmentDropDown.value}
               value={departmentDropDown.value}
              onChange={(item) => {
                departmentDropDown.onChange(item)
               
              }}
            />
         
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
