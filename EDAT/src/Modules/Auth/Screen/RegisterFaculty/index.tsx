import React, { useEffect, useState } from 'react';
import { Card, Input, Button, Back, DateTimePicker, Dropzone, Spinner } from '@Components';
import { ButtonGroup, Form, FormGroup } from 'reactstrap';
import { translate } from '@I18n';
import DropDown from '@Components//Core/DropDown';
import { useSelector, useDispatch } from "react-redux";
import { postAddFaculty, getDepartmentData, getDesignationData, postGenericCrudDetails, fetchFacultiesList, fetchStudentDetails, fetchFacultyDetails } from "@Redux";
import { useDropDown, useInput, useLoader, useNavigation } from '@Hooks';
import { convertToUpperCase, getImageUrl, getObjectFromArrayByKey, getValidateError, showToast, USER_FORM_RULES, } from '@Utils'
import { validate, ifObjectExist } from '@Utils';

const GENDER_LIST = [
  { id: 'M', name: 'Male', value: 'M' },
  { id: 'F', name: 'Female', value: 'F' },
  { id: 'O', name: 'Other', value: 'O' },
];

function RegisterFaculty() {

  const dispatch = useDispatch();
  const { goBack } = useNavigation()
  const { departmentData, designationData, selectedFacultyId } = useSelector(
    (state: any) => state.DashboardReducer
  );

  console.log("selectedFacultyIdselectedFacultyId", selectedFacultyId);


  const P2 = 'p2'
  const UE = 'ue'
  const UG = 'ug'
  const PG = 'pg'
  const DP = 'dp'

  const loader = useLoader(false)

  const [isActive, setIsActive] = useState(UG)
  const [gender, setGender] = useState<any>()
  const [departmentId, setDepartmentId] = useState('')
  const [designationId, setDesignationId] = useState("f6de4872-bdc9-4aab-9ab5-56edd9f345ad")
  const [yearOfPassing, setYearOfPassing] = useState<any>('')
  const [image, setImage] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState<any>()
  const [educationalDetailId, setEducationalDetailId] = useState('')
  // const [roleId, setRoleId] =useState("f78b97b8-d0e2-44a0-9f14-89f458be3c28")


  const firstName = useInput('')
  const lastName = useInput('')
  const contactNumber = useInput('')
  const email = useInput('')
  const aadhar = useInput('')
  const qualificationDetails = useInput('')
  const institution = useInput('')
  const address = useInput('')
  const pincode = useInput('')
  // const gender = useDropDown({})

  useEffect(() => {
    if (!departmentData) {
      dispatch(getDepartmentData({}));
    }

    if (!designationData) {
      dispatch(getDesignationData({}));
    }
    if (selectedFacultyId) {
      getFacultyDetails()
    }
  }, [])

  const submitRegisteredAdminHandler = () => {
    const params = {
      ...(selectedFacultyId && { id: selectedFacultyId }),
      first_name: convertToUpperCase(firstName.value),
      last_name: lastName.value,
      mobile_number: contactNumber.value,
      email: email.value,
      aadhar_number: aadhar.value,
      course_id: departmentId,
      role_id: designationId,
      gender: gender,
      address: address.value,
      pincode: pincode.value,
      dob: dateOfBirth,
    };
    console.log("paramsssssssssss0000000---->", params);

    const carrierParams = {
      graduation: isActive,
      institution: institution.value,
      details: qualificationDetails.value,
      year_of_passing: yearOfPassing
    }

    const photoParams = {
      photo: image
    }

    let validParams = { ...params, ...carrierParams, ...photoParams }


    const validation = validate(USER_FORM_RULES, validParams)

    if (ifObjectExist(validation)) {
      // loader.showLoader()
      dispatch(
        postAddFaculty({
          params,
          onSuccess: (response: any) => {
            onAddFacultyEducationalData(selectedFacultyId ? selectedFacultyId : response.details.id)
          },
          onError: (error: any) => {
            showToast('error', error.error_message)
          },
        }),
      )
    } else {
      showToast("error", getValidateError(validation))
    }
  };

  const onAddFacultyEducationalData = (facultyId) => {

    const params = {
      mq: "student__EducationalItem",
      data: {
        graduation: isActive,
        employee_company_id: facultyId,
        institution: institution.value,
        details: qualificationDetails.value,
        year_of_passing: yearOfPassing,
        ...(selectedFacultyId && { id: educationalDetailId })
      }
    }

    dispatch(postGenericCrudDetails({
      params,
      onSuccess: (success: any) => {
        addFacultyProfilePicture(selectedFacultyId ? selectedFacultyId : facultyId)
      },
      onError: (error: string) => {
        console.log("erroororor-->", error);
      },
    }))
  }

  const addFacultyProfilePicture = (facultyId) => {
    const params = {
      mq: "employee__EmployeeCompanyInfo",
      data: {
        id: facultyId,
        photo: image
      }
    }
    dispatch(postGenericCrudDetails({
      params,
      onSuccess: (success: any) => {
        showToast('success', success.message)
        dispatch(fetchFacultiesList({}))
        goBack()
      },
      onError: (error: string) => {
      },
    }))
  }




  const getFacultyDetails = () => {

    const params = {
      faculty_id: selectedFacultyId
    }
    dispatch(fetchFacultyDetails({
      params,
      onSuccess: (success) => {
        console.log("success----lll", success)
        prefillFacultyDetails(success.details)

      },
      onError: () => { }
    }))
  }

  const prefillFacultyDetails = (facultyDetails) => {

    console.log(facultyDetails, "====");


    firstName.set(facultyDetails.faculty_personal_info[0].first_name)
    lastName.set(facultyDetails.faculty_personal_info[0].last_name)
    contactNumber.set(facultyDetails.faculty_personal_info[0].mobile_number)
    email.set(facultyDetails.faculty_personal_info[0].email)
    aadhar.set(facultyDetails.faculty_personal_info[0].aadhar)
    qualificationDetails.set(facultyDetails.faculty_educational_items[0].details)
    institution.set(facultyDetails.faculty_educational_items[0].institution)
    address.set(facultyDetails.faculty_personal_info[0].address)
    pincode.set(facultyDetails.faculty_personal_info[0].pincode)
    setDateOfBirth(facultyDetails.faculty_personal_info[0].dob)
    setGender(facultyDetails.faculty_personal_info[0].gender)
    setIsActive(facultyDetails.faculty_educational_items[0].graduation)
    setYearOfPassing(facultyDetails.faculty_educational_items[0].year_of_passing)
    setImage(getImageUrl(facultyDetails.photo))
    setEducationalDetailId(facultyDetails.faculty_educational_items[0]?.id)

  }


  return (
    <div>
      <div className='container-fluid'>
        <Back text={selectedFacultyId ? "Edit faculty" : 'Add Faculty'} />
        {!loader && <Spinner />}
        {loader && (
          <Card>
            <Form >
              <div className='row'>
                <div className='col-sm-6 '>
                  <Input
                    id={'FirstName'}
                    heading={translate('auth.firstName')}
                    placeholder={translate('auth.firstName')!}
                    type={'text'}
                    value={firstName.value}
                    onChange={firstName.onChange}
                  />
                </div>
                <div className='col-sm-6 '>
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
                <div className='col-sm-6 '>
                  <Input
                    id={'ContactNumber'}
                    heading={translate('auth.contactNumber')}
                    type={'number'}
                    value={contactNumber.value}
                    placeholder={translate('auth.contactNumber')!}
                    onChange={contactNumber.onChange}
                    maxLength={10}
                  />
                </div>
                <div className='col-sm-6 '>
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
                <div className='col-sm-6 mb-4'>
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
                <div className='col-sm-6'>
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
                <div className='col-sm-6 mb-4'>
                  <DropDown
                    heading={'Stack'}
                    placeholder={'Stack'}
                    data={departmentData}
                    onChange={(e) => { setDepartmentId(e.target.value) }}
                  />
                </div>

                <div className='col-sm-6'>
                  <DropDown
                    heading={translate('course.facultyRole')!}
                    placeholder={translate('course.facultyRole')!}
                    data={designationData}
                    onChange={(e) => { setDesignationId(e.target.value) }}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-6'>
                  <DateTimePicker
                    heading={translate('course.yearOfPassing')!}
                    placeholder={translate('course.yearOfPassing')!}
                    value={yearOfPassing}
                    onChange={(e) => { setYearOfPassing(e) }}
                  />
                </div>
                <div className='col-sm-6'>
                  <DateTimePicker
                    heading={'Date of Birth'}
                    placeholder={'Date of Birth'}
                    value={dateOfBirth}
                    onChange={(e) => { setDateOfBirth(e) }}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-6 '>
                  <Input
                    id={'address'}
                    heading={'Address'}
                    value={address.value}
                    placeholder={translate('auth.address')!}
                    onChange={address.onChange}
                  />
                </div>
                <div className='col-sm-6'>

                  <Input
                    id={'pincode'}
                    heading={'Pincode'}
                    type={'number'}
                    value={pincode.value}
                    placeholder={'Pincode'}
                    onChange={pincode.onChange}
                    maxLength={6}
                  />
                </div>
              </div>

              <label className={`form-control-label`}>{translate('auth.highestQualification')!}</label>

              <div className='mb-4'>
                <ButtonGroup className="btn-group-toggle" data-toggle="buttons">
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
                  <Button className={`${isActive === UE && 'active'}`} color="secondary" onClick={() => setIsActive(UE)} text={'UE'}>
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
                  icon={image}
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
        )}
      </div>
    </div>
  );
}

export { RegisterFaculty };
