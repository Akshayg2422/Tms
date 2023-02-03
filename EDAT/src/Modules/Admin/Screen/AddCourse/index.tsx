import React, { useState } from 'react'
import { Button, Input, Modal } from '@Components'
import { translate } from '@I18n'
import { fetchCourses, fetchFacultiesList, postGenericCrudDetails, settingCurrentCourse, settingDefaultCourse } from '@Redux';
import { useDispatch, useSelector } from "react-redux";
import { useLoader, useNavigation } from '@Hooks'
import { ROUTES } from '@Routes';
import { showToast, convertToUpperCase } from '@Utils';


function AddCourse() {

    const dispatch = useDispatch();
    const { goTo, goBack } = useNavigation()

    const { registeredCourses } = useSelector(
        (state: any) => state.DashboardReducer
    );


    const [isOpenModal, setIsOpenModal] = useState(true)
    const [addCourseDetails, setAddCourseDetails] = useState({
        name: '', description: ''
    })
    const addCourseModalLoader = useLoader(false)


    const onChangeHandler = (e) => {
        setAddCourseDetails({ ...addCourseDetails, [e.target.name]: e.target.value })
    }

    const validateInputFields = () => {
        if (!addCourseDetails?.name) {
            showToast('error', translate('course.nameCannotBeEmpty ')!)
            return false
        }
        else if (!addCourseDetails?.description) {
            showToast('error', translate('course.descriptionCannotBeEmpty ')!)
            return false
        }
        else {
            return true
        }
    }

    const onSubmit = () => {
        if (validateInputFields()) {

            const params = {
                mq: "course__Course",
                data: {
                    name: convertToUpperCase(addCourseDetails.name),
                    description: convertToUpperCase(addCourseDetails.description),
                    // order_sequence : registeredCourses.data.length+1
                }
            }

            console.log("params=========", params);

            addCourseModalLoader.showLoader()
            dispatch(postGenericCrudDetails({
                params,
                onSuccess: (success: any) => {
                    addCourseModalLoader.hideLoader()


                    showToast('success', success.message)
                    console.log("success-->", success);
                    setIsOpenModal(false)
                    const params = {}
                    dispatch(fetchCourses({
                        params,
                        onSuccess: (success) => {
                            dispatch(settingDefaultCourse(success[0].sections))
                            // dispatch(settingCurrentCourse(success[0]))
                        },
                        onError: (error) => { }

                    }))
                    dispatch(settingCurrentCourse([]))
                    goTo('/dashboard' + ROUTES.HOME.ADMIN_COURSE_SECTION, false)
                    window.location.reload();
                },
                onError: (error: string) => {
                    addCourseModalLoader.hideLoader()

                },
            }))
        }
    }

    return (
        <div>
            <Modal isOpen={isOpenModal}
                onClose={() => {
                    // goTo('/dashboard' + ROUTES.HOME.ADMIN_COURSE_SECTION, false)
                    // dispatch(settingCurrentCourse([]))
                    goBack()
                    setIsOpenModal(!isOpenModal)
                }} title={`Add course`}
                isModalLoading={addCourseModalLoader.loader}>
                <div className='mb-4 mt--4'>
                    <Input
                        heading={translate('auth.name')}
                        placeholder={translate('auth.name')!}
                        value={addCourseDetails.name}
                        name={'name'}
                        onChange={(e) => onChangeHandler(e)}
                    />

                    <label className='form-control-label'>{translate('course.description')}</label>
                    <textarea
                        cols={5}
                        name={'description'}
                        value={addCourseDetails.description}
                        className="form-control"
                        placeholder={translate('course.typeHere')!}
                        onChange={(e) => {
                            onChangeHandler(e)
                        }}
                    />
                </div>

                <div className='text-right'>
                    <Button
                        color={'secondary'}
                        text={translate('common.cancel')}
                        onClick={() => {
                            setIsOpenModal(!isOpenModal)

                            const params = {}
                            dispatch(fetchCourses({
                                params,
                                onSuccess: (success) => {
                                    // dispatch(settingCurrentCourse(success[0]))
                                },
                                onError: (error) => { }

                            }))

                            goTo('/dashboard' + ROUTES.HOME.ADMIN_COURSE_SECTION)
                            // dispatch(settingCurrentCourse([]))
                            // goBack()

                        }}
                    />
                    <Button

                        text={'Submit'}
                        onClick={() => {
                            onSubmit()
                        }}
                    />
                </div>
            </Modal>
        </div>
    )
}

export { AddCourse }