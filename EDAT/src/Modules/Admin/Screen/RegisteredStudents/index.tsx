


import React, { useEffect, useState } from 'react'
import { Button, Card, CommonTable, Modal, NoRecordsFound } from '@Components'
import { useNavigation, useLoader } from "@Hooks";
import { AUTH_PATH } from '@Routes';
import { editUserRegister, fetchStudentsList, postGenericCrudDetails } from '@Redux';
import { useDispatch, useSelector } from "react-redux";
import { translate } from '@I18n'
import { UserOnlineStatus, DropDownMenuArrow } from '../../../Home/Container';
import { showToast } from '@Utils'


function RegisteredStudents() {
    const dispatch = useDispatch();
    const { studentsListData, editUserDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );
    // console.log("studentsListData--->",studentsListData);
    

    const [studentsListStatus, setStudentsListStatus] = useState(false)
    const [userListStatus, setUserListStatus] = useState(false)
    const studentsListLoader = useLoader(false)
    const [searchUser, setSearchUser] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [currentDeleteItem, setCurrentDeleteItem] = useState<any>()



    const { goTo } = useNavigation()

    useEffect(() => {
        // if (!studentsListData) {
            // getStudentsList()
        // }
        setInterval(() => {
            getStudentsList()
        }, 300000)
    }, [])

    const getStudentsList = () => {
        console.log("1111");

        const params = {
            ...(searchUser && { q: searchUser })
        }
        studentsListLoader.showLoader()
        dispatch(fetchStudentsList({
            params,
            onSuccess: (success: any) => {
                console.log("2222");

                studentsListLoader.hideLoader()
            },
            onError: (error: string) => {
                console.log("3333");
                studentsListLoader.hideLoader()
            },
        }))
    }

    const onDeleteHandler = (id: string) => {

        console.log(id + "=====");

        const params = {
            mq: "employee__EmployeeCompanyInfo",
            data: { id: id },
            force_delete: true
        }
        console.log("paramns-->", JSON.stringify(params));


        dispatch(postGenericCrudDetails({
            params,
            onSuccess: (success: any) => {
                showToast('success', success.message)
                setDeleteModal(!deleteModal)
                getStudentsList()
            },
            onError: (error: string) => {
                console.log('fialure');

            },
        }))

    }

    const normalizedStudentsData = (data: any) => {
        return data.map((el: any) => {
            // console.log("studeee---->",el.id);
            
            return {
                name: el.name,
                course: el.student_course && el.student_course.length > 0 ? el.student_course[0].course.name : '      -',
                Action:
                    <>
                        <DropDownMenuArrow
                            onDeleteClick={() => {
                                setCurrentDeleteItem(el)
                                setDeleteModal(!deleteModal)
                            }}
                            onAddClick={()=>{
                                // goTo('/dashboard' + AUTH_PATH.REGISTER_STUDENTS, false, 'Edit')
                                dispatch(editUserRegister(el))
                                goTo('/dashboard' + AUTH_PATH.REGISTER_STUDENTS)
                            }}
                        />
                    </>
            };
        });
    };

    return (
        <div className='container-fluid pt-3'>
            <div className='row mt-3'>
                <div className='col-lg-8'>
                    <Card >
                        <div className='row'>
                            <div className='col'>
                                <h3>{translate('course.students')}</h3>
                            </div>

                            <div className='text-right mr-3'>
                                <Button
                                    text={studentsListStatus ? translate('course.hide') : translate('course.view')}
                                    size={'sm'}
                                    onClick={() => {
                                        if (!studentsListStatus) {
                                            getStudentsList()
                                        }
                                        setStudentsListStatus(!studentsListStatus)

                                    }}
                                />
                                <Button
                                    size={'sm'}
                                    text={translate('course.add')}
                                    // onClick={() => goTo('/dashboard' + AUTH_PATH.REGISTER_STUDENTS,false, 'Add')}
                                    onClick={() => {
                                        dispatch(editUserRegister(undefined))
                                        goTo('/dashboard' + AUTH_PATH.REGISTER_STUDENTS)}}

                                />
                            </div>
                        </div>
                        <div className='mt-0 overflow-auto scroll-hidden' style={{ height: studentsListStatus ? '80.5vh' : '0vh', marginLeft: '-39px', marginRight: '-39px' }}>
                            {studentsListData && studentsListData?.length > 0 ?
                                <CommonTable displayDataSet={normalizedStudentsData(studentsListData)} 
                                isLoading={studentsListLoader.loader}
                                />
                                :
                                <div className=" d-flex justify-content-center align-items-center" style={{
                                    height: '80.5vh'
                                  }}>
                                
                                    <NoRecordsFound />
                                  </div>
                            }
                        </div>
                    </Card>
                </div>
                <div className='col-4' >
                    <UserOnlineStatus data={studentsListData} onClick={(status: boolean) => {
                        setUserListStatus(!status)
                    }}

                        isViewClick={userListStatus}
                        onChange={(e) => {
                            setSearchUser(e.target.value)
                        }}
                        onSearchClick={() => {
                            getStudentsList()
                        }}
                    />
                </div>

            </div>


      {/**
       * delete modal
       */}

            <Modal isOpen={deleteModal} onClose={() => { setDeleteModal(!deleteModal) }} title={`Do you want to delete the selected Student?`} titleClassname={'text-muted fw-light'}>
                <div className="mt--4 ml--1">
                    <h2>{currentDeleteItem?.name}</h2>
                </div>

                <div className='text-right'>
                    <Button
                        color={'secondary'}
                        text={translate('common.cancel')}
                        onClick={() => { setDeleteModal(!deleteModal) }}
                    />
                    <Button

                        text={'Proceed'}
                        onClick={() => {
                            onDeleteHandler(currentDeleteItem.id)
                        }}
                    />
                </div>
            </Modal>
        </div>

    )
}

export { RegisteredStudents } 