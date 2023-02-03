import React, { useEffect } from 'react';
import { Input, DropDown, Button, showToast } from '@Components';
import { translate } from '@I18n';
import { AuthContainer } from '@Modules'
import { useInput, useDropDown, useNavigation } from '@Hooks'
import {
  GENDER_LIST,
  DESIGNATION_LIST,
  validate,
  USER_FORM_RULES,
  ifObjectExist,
  getValidateError
} from '@Utils'
import { useDispatch, useSelector } from 'react-redux'
import { registerAdmin, getUserBusinessPlaces } from '@Redux'
import { UserBusinessPlace } from '@Services'
import { ROUTES } from '@Routes'



function RegisterUser() {

  const { goTo } = useNavigation()
  const { registeredMobileNumber } = useSelector(
    (state: any) => state.AuthReducer
  );

  const firstName = useInput('')
  const lastName = useInput('')
  const contactNumber = useInput('9629283677')
  const email = useInput('')
  const gender = useDropDown({})
  const designation = useDropDown({})
  const dispatch = useDispatch()

  useEffect(() => {
    getUserBusinessPlacesApiHandler(contactNumber.value)
  }, [])

  const submitRegisteredAdminHandler = () => {
    const params = {
      first_name: firstName.value,
      last_name: lastName.value,
      mobile_number: contactNumber.value,
      email: email.value,
      gender: gender?.value.id,
      designation: designation.value.id,
    };

    const validation = validate(USER_FORM_RULES, params);

    if (ifObjectExist(validation)) {

      console.log(JSON.stringify(params));

      dispatch(
        registerAdmin({
          params,
          onSuccess: (response: any) => {
            console.log(JSON.stringify(response));
            // getUserBusinessPlacesApiHandler(contactNumber.value)
          },
          onError: (error: any) => {
            console.log(JSON.stringify(error));

          },
        }),
      );
    } else {
      showToast(getValidateError(validation));
    }
  };


  function getUserBusinessPlacesApiHandler(mobileNumber: string) {
    const params = {
      q: mobileNumber,
      type: 'phone',
    };

    dispatch(
      getUserBusinessPlaces({
        params,
        onSuccess: (success: UserBusinessPlace) => {
          console.log(JSON.stringify(success));
          if (success.details.length > 0) {
            goTo(ROUTES.AUTH.VIEW_GOOGLE_BUSINESS)
          } else {

          }
        },
        onError: () => {

        },
      }),
    );
  }


  return (
    <AuthContainer title={'Register User'}>
      <div className='col col-sm-9'>
        <Input heading={translate('auth.firstName')} value={firstName.value} onChange={firstName.onChange} />
        <Input heading={translate('auth.lastName')} value={lastName.value} onChange={lastName.onChange} />
        <Input readOnly maxLength={10} heading={translate('auth.contactNumber')} value={contactNumber.value} onChange={contactNumber.onChange} />
        <Input type={'email'} heading={'E-mail'} value={email.value} onChange={email.onChange} />
        <DropDown heading={translate('auth.gender')} data={GENDER_LIST} value={gender.value} onChange={gender.onChange} />
        <DropDown heading={translate('auth.designation')} data={DESIGNATION_LIST} value={designation.value} onChange={designation.onChange} />
      </div>
      <div className='row justify-content-center align-items-center mx-2'>
        <div className='col-sm-6 mt-4'>
          <Button block text={'Submit'} onClick={submitRegisteredAdminHandler} />
        </div>
      </div>
    </AuthContainer>

  );
}

export { RegisterUser };
