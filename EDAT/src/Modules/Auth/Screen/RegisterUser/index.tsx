import React, { useEffect, useState } from 'react';
import { Card, Input, Button, Back, DateTimePicker, Dropzone } from '@Components';
import { ButtonGroup, Form, FormGroup } from 'reactstrap';
import { translate } from '@I18n';
import DropDown from '@Components//Core/DropDown';
import { useSelector, useDispatch } from "react-redux";
import { postAddStudent, getDepartmentData, postGenericCrudDetails, fetchStudentsList, fetchStudentDetails, editUserRegister } from "@Redux";
import { useDropDown, useInput, useNavigation } from '@Hooks';
import { getValidateError, ifObjectExist, showToast, validate, STUDENT_FORM_RULES, convertToUpperCase, getImageUrl } from '@Utils'

const GENDER_LIST = [
  { id: '1', name: 'Male', value: 'M' },
  { id: '2', name: 'Female', value: 'f' },
  { id: '3', name: 'Others', value: 'O' },
];

function RegisterUser() {
  const dispatch = useDispatch();
  const { goBack } = useNavigation()

  const { departmentData, editUserDetails, studentDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const P2 = 'p2'
  const UE = 'ue'
  const UG = 'ug'
  const PG = 'pg'
  const DP = 'dp'

  console.log("studentDetails222-->", studentDetails);


  const [isActive, setIsActive] = useState( UE)
  const [gender, setGender] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [yearOfPassing, setYearOfPassing] = useState<any>('')
  const [image, setImage] = useState(editUserDetails ? studentDetails?.photo : '')

  const [dateOfBirth, setDateOfBirth] = useState<any>('')

  const firstName = useInput('')
  const lastName = useInput('')
  const contactNumber = useInput('')
  const email = useInput('')
  const aadhar = useInput('')
  const qualificationDetails = useInput('')
  const institution = useInput('')
  const address = useInput('')
  const pincode = useInput('')

  const [educationalDetailId, setEducationalDetailId] = useState("")

  // const gender = useDropDown({})

  const getObjectFromArrayByKey = (array: any, key: string, value: any) => {
    return array.find((item: any) => {
      return item[key] === value;
    });
  };

  useEffect(() => {
    const params = {
      student_id: editUserDetails?.id
    }
    if (editUserDetails) {
      dispatch(fetchStudentDetails({
        params,
        onSuccess: (success) => {
          prefillFacultyDetails(success)
        },
        onError: (err) => {
          console.log("errrr-->", err)
        }
      }))
    }
  }, [])

  const prefillFacultyDetails = (studentDetails) => {

    firstName.set(studentDetails.details.student_personal_info[0].first_name)
    lastName.set(studentDetails.details.student_personal_info[0].last_name)
    contactNumber.set(studentDetails.details.student_personal_info[0].mobile_number)
    email.set(studentDetails.details.student_personal_info[0].email)
    aadhar.set(studentDetails.details.student_personal_info[0].aadhar)
    qualificationDetails.set(studentDetails.details.student_educational_items[0].details)
    institution.set(studentDetails.details.student_educational_items[0].institution)
    address.set(studentDetails.details.student_personal_info[0].address)
    pincode.set(studentDetails.details.student_personal_info[0].pincode)
    setDateOfBirth(studentDetails.details.student_personal_info[0].dob)
    setGender(studentDetails.details.student_personal_info[0].gender)
    setIsActive(studentDetails.details.student_educational_items[0].graduation)
    setYearOfPassing(studentDetails.details.student_educational_items[0].year_of_passing)
    setImage(getImageUrl(studentDetails.photo))
    setEducationalDetailId(studentDetails.details.student_educational_items[0]?.id)


  }
  console.log(yearOfPassing, "=ttt===");

  const submitRegisteredAdminHandler = () => {

    const params = {
      first_name: convertToUpperCase(firstName.value),
      last_name: lastName.value,
      mobile_number: contactNumber.value,
      email: email.value,
      aadhar_number: aadhar.value,
      department_id: departmentId,
      gender: gender,
      ...(editUserDetails && { id: editUserDetails.id }),
      address: address.value,
      pincode: pincode.value
    };

    /**
     * getting all the params with the same key as payload values
     * passing those values into validate function as 2nd argument
     * STUDENT_FORM_RULES has some validation based on type of inputs
     * ifObjectExist(validation) ---> if it is false, then should not dispatch postAddStudent
     */
    const validParams = {
      first_name: firstName.value,
      last_name: lastName.value,
      mobile_number: contactNumber.value,
      email: email.value,
      gender: gender,
      aadhar_number: aadhar.value,
      department_id: departmentId,
      year_of_passing: yearOfPassing,
      graduation: isActive,
      details: qualificationDetails.value,
      institution: institution.value,
      photo: image,
      dob: dateOfBirth,
      address: address,
      pincode: pincode
    }

    console.log("paramsss-->", JSON.stringify(params));

    const validation = validate(STUDENT_FORM_RULES, validParams)

    if (ifObjectExist(validation)) {

      dispatch(
        postAddStudent({
          params,
          onSuccess: (response: any) => {
            addStudentEducationalDetails(editUserDetails ? editUserDetails?.id : response?.details?.id)
          },
          onError: (error: any) => {
            showToast('error', error.error_message)
          },
        }),
      );
    } else {
      showToast("error", getValidateError(validation))
    }
  };



  const addStudentEducationalDetails = (studentId: any) => {

    const params = {
      mq: "student__EducationalItem",
      data: {
        graduation: isActive,
        employee_company_id: studentId,
        institution: institution.value,
        details: qualificationDetails.value,
        year_of_passing: yearOfPassing,
        ...(editUserDetails && { id: educationalDetailId })  
      }
    }

    dispatch(postGenericCrudDetails({
      params,
      onSuccess: (success: any) => {

        addStudentProfilePicture(editUserDetails ? editUserDetails?.id : studentId)
      },
      onError: (error: string) => {
      },
    }))
  }

  const addStudentProfilePicture = (studentId: any) => {

    const params = {
      mq: "employee__EmployeeCompanyInfo",
      data: {
        id: studentId,
        photo: image,
        ...(editUserDetails && { id: editUserDetails.id }) 
      }
    }

    dispatch(postGenericCrudDetails({
      params,
      onSuccess: (success: any) => {
        showToast('success', success.message)
        dispatch(fetchStudentsList({}))
        dispatch(editUserRegister(''))
        goBack()
      },
      onError: (error: string) => {
      },
    }))
  }

  useEffect(() => {
    dispatch(getDepartmentData({}));
  }, [])



  return (
    <div>
      <div className='container-fluid'>
        <Back text={`${editUserDetails ? 'Edit' : 'Add'} Student`} />
        <Card>
          <Form >
            <div className='row'>
              <div className='col-6 sm-3'>
                <Input
                  id={'FirstName'}
                  heading={translate('auth.firstName')!}
                  placeholder={translate('auth.firstName')!}
                  type={'text'}
                  value={firstName.value}
                  onChange={firstName.onChange}
                />
              </div>
              <div className='col-6 sm-3'>
                <Input
                  id={'LastName'}
                  heading={translate('auth.lastName')}
                  placeholder={translate('auth.lastName')!}
                  type={'text'}
                  value={lastName.value}
                  onChange={lastName.onChange}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-6 sm-3'>
                <Input
                  id={'ContactNumber'}
                  heading={translate('auth.contactNumber')!}
                  type={'number'}
                  value={contactNumber.value}
                  placeholder={translate('auth.contactNumber')!}
                  onChange={contactNumber.onChange}
                  maxLength={10}
                />
              </div>
              <div className='col-6 sm-3'>
                <Input
                  id={'E-mail'}
                  heading={'E-mail'}
                  type={'email'}
                  value={email.value}
                  placeholder={translate('auth.email')!}
                  onChange={email.onChange}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-6 mb-4'>
                <DropDown
                  heading={translate('auth.gender')}
                  placeholder={translate('auth.gender')!}
                  data={GENDER_LIST}
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value)

                  }}
                />

              </div>
              <div className='col-6'>
                <Input
                  id={'Aadhar'}
                  heading={translate('auth.aadhar')!}
                  type={'number'}
                  value={aadhar.value}
                  placeholder={translate('auth.aadhar')!}
                  onChange={aadhar.onChange}
                  maxLength={12}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
                <DropDown
                  heading={'Stack'}
                  placeholder={'Stack'}
                  data={departmentData}
                  onChange={(e) => {
                    setDepartmentId(e.target.value)
                  }}
                />
              </div>

              <div className='col-6'>
                <DateTimePicker
                  heading={translate('course.yearOfPassing')!}
                  placeholder={translate('course.yearOfPassing')!}
                  onChange={(e) => { setYearOfPassing(e) }}
                  value={yearOfPassing}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-6 sm-3'>
                <DateTimePicker
                  heading={'Date of Birth'}
                  placeholder={'Date of Birth'}
                  onChange={(e) => { setDateOfBirth(e) }}
                  value={dateOfBirth}
                />
              </div>
              <div className='col-6 sm-3'>
                <Input
                  id={'address'}
                  heading={'Address'}
                  value={address.value}
                  placeholder={translate('auth.address')!}
                  onChange={address.onChange}
                />
              </div>
            </div>
            <Input
              id={'pincode'}
              heading={'Pincode'}
              type={'number'}
              maxLength={6}
              value={pincode.value}
              placeholder={'Pincode'}
              onChange={pincode.onChange}
            />
            <label className={`form-control-label`}>{translate('auth.highestQualification')!}</label>

            <div className='mb-4'>
              <ButtonGroup className="btn-group-toggle" data-toggle="buttons">

                <Button className={`${isActive === UE && 'active'}`} color="secondary" onClick={() => {
                  setIsActive(UE)
                }} text={'UE'}>
                  <input
                    autoComplete="off"
                    name="options"
                    type="radio"
                    value={isActive}
                  />
                </Button>
                <Button className={`${isActive === P2 && 'active'}`} color="secondary" onClick={() => setIsActive(P2)} text={'P2'}>
                  <input
                    autoComplete="off"
                    name="options"
                    type="radio"
                    value={isActive}
                  />
                </Button>
                <Button className={`${isActive === DP && 'active'}`} color="secondary" onClick={() => setIsActive(DP)} text={'DP'}>
                  <input
                    autoComplete="off"
                    name="options"
                    type="radio"
                    value={isActive}
                  />
                </Button>
                <Button className={`${isActive === UG && 'active'}`} color="secondary" onClick={() => setIsActive(UG)} text={'UG'}>
                  <input
                    autoComplete="off"
                    name="options"
                    type="radio"
                    value={isActive}
                  />
                </Button>
                <Button className={`${isActive === PG && 'active'}`} color="secondary" onClick={() => setIsActive(PG)} text={'PG'}>
                  <input
                    autoComplete="off"
                    name="options"
                    type="radio"
                    value={isActive}
                  />
                </Button>
              </ButtonGroup>
            </div>
            <Input
              id={'QualificationDetails'}
              heading={translate('auth.qualificationDetails')!}
              value={qualificationDetails.value}
              placeholder={translate('auth.qualificationDetails')!}
              onChange={qualificationDetails.onChange}
            />

            <Input
              id={'Institution'}
              heading={translate('auth.institution')!}
              value={institution.value}
              placeholder={translate('auth.institution')!}
              onChange={institution.onChange}
            />

            <label className={`form-control-label`}>{'Select Image'}</label>
            <div>
              <Dropzone variant='ICON'
                onSelect={(image) => {
                  let encoded = image.toString().replace(/^data:(.*,)?/, '');
                  setImage(encoded)
                }}
                size={'xl'}
              />
            </div>

            <div className='text-right mt-3'>
              <Button
                text={translate('common.submit')}
                size={'md'}
                onClick={() => submitRegisteredAdminHandler()}
              />
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export { RegisterUser };