import React, { useEffect } from 'react'
import { CreateCompanyProps } from './interfaces'
import { HomeContainer, Input, DropDown, H, Divider, Button,showToast} from '@Components'
import {
    GENDER_LIST,
    DESIGNATION_LIST,
    changeDropDownDataKey,
    validate,
    BUSINESS_FORM_RULES,
    USER_FORM_RULES,
    getValidateError,
    ifObjectExist
} from '@Utils';
import { useDispatch, useSelector } from 'react-redux'
import {
    brandSectors,
    sectorServiceTypes,
    registerCompany,
    registerAdmin,
} from '@Redux';

import { useInput, useDropDown } from '@Hooks'


function CreateCompany({ }: CreateCompanyProps) {

    const dispatch = useDispatch()

    const firstName = useInput('')
    const lastName = useInput('')
    const contactNumber = useInput('')
    const email = useInput('')
    const gender = useDropDown({})
    const designation = useDropDown({})
    const businessName = useInput('')
    const businessAddress = useInput('')
    const pinCode = useInput('')
    const alternativeMobileNumber = useInput('')
    const businessSector = useDropDown({})


    const { businessServiceTypesDropdownData, businessSectorDropdownData } =
        useSelector((state: any) => state.AuthReducer);

        const {dashboardDetails} = useSelector((state: any) => state.AdminReducer);


    console.log(JSON.stringify(dashboardDetails) + "==== pammmmm");



    useEffect(() => {
        dispatch(brandSectors({ q: '' }));
        dispatch(sectorServiceTypes({ q: '' }));
    }, []);



    const submitRegisteredAdminHandler = () => {
        const params = {
          first_name: firstName.value,
          last_name: lastName.value,
          mobile_number: contactNumber.value,
          email: email.value,
          gender: gender.value?.id,
          designation: designation.value?.id,
        };
    

        console.log(JSON.stringify(params));
        
        const validation = validate(USER_FORM_RULES, params);
    
        if (ifObjectExist(validation)) {
          dispatch(
            registerAdmin({
              params,
              onSuccess: (success) => {
                onRegisterCompany();
                console.log('registerAdmin----->',success)
              },
              onError: (error) => {console.log('errrrr----->',error)},
            }),
          );
        } else {
  showToast(getValidateError(validation));

        }
      };

      const onRegisterCompany = () => {
        console.log('onregistreeee------>')
        const params = {
          brand_name: businessName.value,
          communication_address: businessAddress.value,
          pincode: pinCode.value,
          mobile_number1: contactNumber.value,
          mobile_number2: alternativeMobileNumber.value,
          brand_sector_id: businessSector.value?.id,
          brand_service_type_id: '8647e16d-40df-44e2-b05b-32cb28cd3368',
          isp: false,
          referral_id: '',
          registered_name: businessName,
        //   provider_company_branch_id: dashboardDetails.permission_details.branch_id,
        };
    
        const validation = validate(BUSINESS_FORM_RULES, params);
        if (ifObjectExist(validation)) {
          console.log("validatesuccessss")
          dispatch(
            registerCompany({
              params,
              onSuccess: (response: any) => {

                console.log(JSON.stringify(response)+"+====Sucessssssssssssssssssssss==");
                
              },
              onError: (error) => {console.log('errrror---company--->',error)},
            }),
          );
        } else {
          showToast(getValidateError(validation))
        }
      };
    

    return (
        <HomeContainer isCard title={'Create Company'} >
            <div className='col-md-9 col-lg-7'>
                <H tag={'h3'} className="heading mb-3" text={'ADMIN DETAILS'} />
                <Input heading={'First Name'} value={firstName.value} onChange={firstName.onChange} />
                <Input heading={'Last Name'} value={lastName.value} onChange={lastName.onChange} />
                <Input type={'number'} heading={'Contact Number'} maxLength={10}  value={contactNumber.value} onChange={contactNumber.onChange} />
                <Input heading={'Email'} value={email.value} onChange={email.onChange} />
                <DropDown heading={'Gender'} data={GENDER_LIST} value={gender.value} onChange={gender.onChange} />
                <DropDown heading={'Designation'} data={DESIGNATION_LIST} value={designation.value} onChange={designation.onChange} />
            </div>

            <Divider />

            <div className='col-md-9 col-lg-7'>
                <H tag={'h3'} className="heading  mb-3" text={'COMPANY DETAILS'} />
                <Input heading={'Business Name'} value={businessName.value} onChange={businessName.onChange} />
                <Input heading={'Business Address'} value={businessAddress.value} onChange={businessAddress.onChange}/>
                <Input  type={'number'} heading={'Pin code'} maxLength={6} value={pinCode.value} onChange={pinCode.onChange} />
                <Input disabled heading={'Mobile Number'} value={contactNumber.value} />
                <Input type={'number'} heading={'Alternative Mobile Number'} maxLength={10}   value={alternativeMobileNumber.value} onChange={alternativeMobileNumber.onChange} />
                {businessSectorDropdownData && businessSectorDropdownData.length > 0 &&
                    <DropDown
                        heading={'Business Sector'}
                        data={changeDropDownDataKey(businessSectorDropdownData)}
                        value={businessSector.value}
                        onChange={businessSector.onChange}

                    />
                }
            </div>

            <div className='row justify-content-end'>
                <div className='col-md-6 col-lg-4  my-4'>
                    <Button
                        block text={'Submit'}
                        onClick={
                            submitRegisteredAdminHandler
                            
                            
                        }
                    />
                </div>
            </div>

        </HomeContainer>
    )
}

export { CreateCompany }