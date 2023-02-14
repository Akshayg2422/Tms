import React, {
  useState
} from 'react'
import { translate } from "@I18n";
import { CreateCompanyProps } from './interfaces'
import {
  HomeContainer,
  Input,
  DropDown,
  H,
  Divider,
  Button,
  showToast
} from '@Components'
import {
  GENDER_LIST,
  DESIGNATION_LIST,
  validate,
  BUSINESS_FORM_RULES,
  USER_FORM_RULES,
  getValidateError,
  ifObjectExist
} from '@Utils';
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  registerCompany,
  registerAdmin,
} from '@Redux';
import {
  useInput,
  useDropDown,
  useNavigation
} from '@Hooks'
import {
  Dropzone
} from '@Components';
import { Navigate } from 'react-router-dom';

function CreateCompany({ }: CreateCompanyProps) {

  // const designation = useDropDown({})
  const [photo, setPhoto] = useState('')
  const { goBack } = useNavigation()
  const dispatch = useDispatch()
  const fullName = useInput('')
  const contactNumber = useInput('')
  const email = useInput('')
  const gender = useDropDown(GENDER_LIST[0])
  const name = useInput('')
  const address = useInput('')
  const pinCode = useInput('')
  const companyContactNumber = useInput('')
  const { dashboardDetails } = useSelector((state: any) => state.AdminReducer);



  const submitRegisteredAdminHandler = () => {
    const params = {
      first_name: fullName.value,
      mobile_number: contactNumber.value,
      email: email.value,
      gender: gender.value?.id,
      designation: 'Management',
    };

    const validation = validate(USER_FORM_RULES, {
      first_name: fullName.value,
      mobile_number: contactNumber.value,
      ...(email.value && { email: email.value }),
      gender: gender.value?.id,
      designation: 'Management',
    });

 

    if (ifObjectExist(validation)) {
  
      dispatch(
        registerAdmin({
          params,
          onSuccess: (response: any) => {
            onRegisterCompany();
          },
          onError: () => { },
        }),
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
      attachment_logo: photo

    };
   

    const validation = validate(BUSINESS_FORM_RULES, params);
    if (ifObjectExist(validation)) {
     
      dispatch(
        registerCompany({
          params,
          onSuccess: (response: any) => () => {
            if (response.success) {
              showToast(response.message, 'success')
              goBack()
            }
          },
          onError: (error: any) => () => {
            showToast('')
          },
        }),
      );
    } else {
      showToast(getValidateError(validation))
    }
  };

  return (

    <HomeContainer isCard title={translate('common.addCompany')!} >
      <div className='col-md-9 col-lg-7'>
        <H tag={'h3'} className="heading  mb-3"
text={translate('common.companyDetails')} />
        <label className={`form-control-label`}>{translate('auth.logo')}</label>
      </div>
      <div className='col-md-9 col-lg-7 pb-4 pt-3'>
        <Dropzone variant='ICON'
          icon={photo}
          size='xl'
          onSelect={(image) => {
            let encoded = image.toString().replace(/^data:(.*,)?/, '');
            setPhoto(encoded)
          }}
        />
      </div>
      <div className='col-md-9 col-lg-7'>
        <Input heading={translate('common.name')} value={name.value}
onChange={name.onChange} />
        <Input heading={translate('auth.address')}
value={address.value} onChange={address.onChange} />
        <Input type={'number'} heading={translate('common.PinCode')}
maxLength={6} value={pinCode.value} onChange={pinCode.onChange} />
        {/* <Input disabled heading={translate('auth.mobileNumber')}
value={contactNumber.value} /> */}
        <Input type={'number'}
heading={translate('common.contactNumber')} maxLength={10}
value={companyContactNumber.value}
onChange={companyContactNumber.onChange} />
      </div>

      <Divider />

      <div className='col-md-9 col-lg-7'>
        <H tag={'h3'} className="heading mb-3"
text={translate('common.primaryContactPerson')} />
        <Input heading={translate('auth.fullName')}
value={fullName.value} onChange={fullName.onChange} />
        <Input type={'number'}
heading={translate('auth.contactNumber')} maxLength={10}
value={contactNumber.value} onChange={contactNumber.onChange} />
        <Input heading={translate('auth.emailOptional')}
value={email.value} onChange={email?.onChange} />
        <DropDown heading={translate('auth.gender')}
data={GENDER_LIST} value={gender.value} onChange={gender.onChange} />

      </div>
      <div className='row justify-content-end'>
        <div className='col-md-6 col-lg-4  my-4'>
          <Button
            block text={translate('common.submit')}
            onClick={() =>
              submitRegisteredAdminHandler()
            }
          />
        </div>
      </div>

    </HomeContainer>
  )
}

export { CreateCompany }