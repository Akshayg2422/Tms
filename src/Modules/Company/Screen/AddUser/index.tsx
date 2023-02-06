import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { HomeContainer, Input, DropDown, H, Button, showToast } from '@Components'
import { GENDER_LIST, ADD_USER_RULES, validate, ifObjectExist, getValidateError } from '@Utils';
import { useInput, useDropDown } from '@Hooks';
import { addEmployee } from '@Redux'
function AddUser() {
    const dispatch = useDispatch()
    const firstName = useInput('')
    const lastName = useInput('')
    const contactNumber = useInput('')
    const email = useInput('')
    const gender = useDropDown({})
    const designation = useInput('')
    useEffect(() => {

    }, []);
    const submitAddUserHandler = () => {
        const params = {
            branch_id: "60ec3438-d820-4ce7-8e1e-ea1804e1de18",
            first_name: firstName.value,
            last_name: lastName.value,
            mobile_number: contactNumber.value,
            email: email.value,
            gender: gender.value?.id,
            designation_name: designation.value
        }


        const validation = validate(ADD_USER_RULES, params);
        if (ifObjectExist(validation)) {
            dispatch(addEmployee({ params }));
        } else {
           showToast(getValidateError(validation))
        }

    }

    return (
        <>
            <HomeContainer isCard title={'ADD USER'}>
                <div className='row'>
                    <div className='col-md-9 col-lg-7'>
                        <H tag={'h3'} className="heading mb-3" text={'Company Details'} />
                        <Input heading={'First Name'} value={firstName.value} onChange={firstName.onChange} />
                        <Input heading={'Last Name'} value={lastName.value} onChange={lastName.onChange} />
                        <Input type={"number"} heading={'Contact Number'} maxLength={10} value={contactNumber.value} onChange={contactNumber.onChange} />
                        <Input heading={'Email'} value={email.value} onChange={email.onChange} />
                        <DropDown heading={'Gender'} data={GENDER_LIST} value={gender.value} onChange={gender.onChange} />
                        <Input heading={'Designation'} value={designation.value} onChange={designation.onChange} />
                    </div>
                </div>
                <div className='row justify-content-end'>
                    <div className='col-md-6 col-lg-4  my-4'>
                        <Button block text={'Submit'} onClick={submitAddUserHandler} />
                    </div>
                </div>
            </HomeContainer>
        </>
    )
}
export { AddUser }