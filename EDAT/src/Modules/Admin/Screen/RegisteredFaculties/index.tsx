import React, { useEffect, useState } from 'react'
import { Button, Card, CommonTable, Modal, NoRecordsFound } from '@Components'
import { useLoader, useNavigation } from "@Hooks";
import { AUTH_PATH } from '@Routes';
import { fetchFacultiesList, fetchFacultyDetails, fetchStudentDetails, postGenericCrudDetails, settingSelectedFacultyId } from '@Redux';
import { useDispatch, useSelector } from "react-redux";
import { translate } from '@I18n'
import { DropDownMenuArrow, UserOnlineStatus } from '@Modules';
import { showToast } from '@Utils';


function RegisteredFaculties() {

    const dispatch = useDispatch();
    const { facultiesListData } = useSelector(
        (state: any) => state.DashboardReducer
    );
    console.log("facultiesListData--->", facultiesListData);
    const [userListStatus, setUserListStatus] = useState(false)
    const [facultiesListStatus, setFacultiesListStatus] = useState(false)
    const facultiesListLoader = useLoader(false)
    const [searchUser, setSearchUser] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [currentDeleteItem, setCurrentDeleteItem] = useState<any>()



    const { goTo } = useNavigation()

    useEffect(() => {
        // if (!facultiesListData) {
        //     getFacultiesList()
            
        // }
        setInterval(() => {
            getFacultiesList()
        }, 300000)
    }, [])

    const getFacultiesList = () => {
        const params = { ...(searchUser && { q: searchUser }) }
        facultiesListLoader.hideLoader()
        dispatch(fetchFacultiesList({
            params,
            onSuccess: (success: any) => {
                facultiesListLoader.hideLoader()
            },
            onError: (error: string) => {
                facultiesListLoader.hideLoader()
            },
        }))
    }


    const onDeleteHandler = (id: string) => {
        const params = {
            mq: "employee__EmployeeCompanyInfo",
            data: { id: id },
            force_delete: true
        }
        console.log("paramns-->", params);


        dispatch(postGenericCrudDetails({
            params,
            onSuccess: (success: any) => {
                showToast('success', success.message)
                setDeleteModal(!deleteModal)
                getFacultiesList()
            },
            onError: (error: string) => {
            },
        }))

    }

  

    const normalizedFacultiesData = (data: any) => {
        return data.map((el: any) => {
            return {
                name: el.name,
                course: el.course ? el.course : '      -',
                role: el.role ? el.role : '   -',

                Action:
                    <>
                        <DropDownMenuArrow
                            onDeleteClick={() => {
                                setCurrentDeleteItem(el)
                                setDeleteModal(!deleteModal)
                            }}
                            onAddClick={() => {
                                manageFacultyHandler(el.id)
                            }}
                        />
                    </>
            };
        });
    };

    const manageFacultyHandler = (id) => {
        
        id ? dispatch(settingSelectedFacultyId(id)) : dispatch(settingSelectedFacultyId(undefined))
        goTo('/dashboard' + AUTH_PATH.REGISTER_FACULTY)
    }

    return (
        <div className='container-fluid pt-4'>
            <div className='row'>
                <div className='col-sm-8'>
                    <Card >
                        <div className='row'>
                            <div className='col'>
                                <h3>{translate('course.faculties')}</h3>
                            </div>

                            <div className='text-right mr-3'>
                                <Button
                                    text={facultiesListStatus ? translate('course.hide') : translate('course.view')}
                                    size={'sm'}
                                    onClick={() => {
                                        if (!facultiesListStatus) {
                                            getFacultiesList()
                                        }
                                        setFacultiesListStatus(!facultiesListStatus)

                                    }}
                                />
                                <Button
                                    size={'sm'}
                                    text={translate('course.add')}
                                    onClick={() =>manageFacultyHandler(undefined) }
                                />
                            </div>

                        </div>
                        <div className='overflow-auto scroll-hidden ' style={{ height: facultiesListStatus ? '80.5vh' : '0vh', marginLeft: '-39px', marginRight: '-39px' }}>
                            {facultiesListData && facultiesListData?.length > 0 ?
                                <CommonTable displayDataSet={normalizedFacultiesData(facultiesListData)}
                                    isLoading={facultiesListLoader.loader}
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
                    <UserOnlineStatus data={facultiesListData} onClick={(status: boolean) => {
                        setUserListStatus(!status)
                    }}

                        isViewClick={userListStatus}
                        onChange={(e) => {
                            setSearchUser(e.target.value)
                        }}
                        onSearchClick={() => {
                            getFacultiesList()
                        }}
                    />
                </div>
            </div>

            {/**
       * delete modal
       */}

            <Modal isOpen={deleteModal} onClose={() => { setDeleteModal(!deleteModal) }} title={`Do you want to delete the selected Faculty?`} titleClassname={'text-muted fw-light'}>
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

export { RegisteredFaculties } 