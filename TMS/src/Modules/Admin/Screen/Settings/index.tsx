import React, { useState } from 'react'
import { Button, Card, CommonTable, Input, Modal, NoRecordsFound } from '@Components'
import { translate } from '@I18n'
import { addDepartment, addDesignation, getDepartmentData, getDesignationData } from '@Redux';
import { useDispatch, useSelector } from "react-redux";
import { convertToUpperCase } from '@Utils';
import { useLoader } from '@Hooks';

function Settings() {
    const dispatch = useDispatch();
    const { departmentData , designationData } = useSelector(
        (state: any) => state.AdminReducer
    );

    console.log("departmentData--->", departmentData);


    const [isDesignationModal, setIsDesignationModal] = useState(false)
    const [isDepartmentModal, setIsDepartmentModal] = useState(false)
    const [departmentListStatus, setDepartmentListStatus] = useState(false)
    const [designationListStatus, setDesignationListStatus] = useState(false)
    const [department, setDepartment] = useState('')
    const [designation, setDesignation] = useState('')
    const departmentListLoader = useLoader(false)
    const designationListLoader = useLoader(false)
    const postAddingDepartmentLoader = useLoader(false)
    const postAddingDesignationLoader = useLoader(false)


    const getDepartmentList = () => {
        dispatch(getDepartmentData({}));
        const params = {}

        dispatch(getDepartmentData({
            params,
            onSuccess: (success: any) => {
                departmentListLoader.showLoader()
                departmentListLoader.hideLoader()
            },
            onError: (error: string) => {
                departmentListLoader.hideLoader()
            },
        }))
    }

    const getDesignationList = () => {
        dispatch(getDesignationData({}));
        const params = {}
        designationListLoader.showLoader()
        dispatch(getDesignationData({
            params,
            onSuccess: (success: any) => {
                designationListLoader.hideLoader()
            },
            onError: (error: string) => {
                designationListLoader.hideLoader()
            },
        }))
    }

    const postAddingDepartment = () => {
        const params = {
            name: convertToUpperCase(department)
        }
        postAddingDepartmentLoader.showLoader()
        dispatch(addDepartment({
            params,
            onSuccess: (success: any) => {
                postAddingDepartmentLoader.hideLoader()
                dispatch(getDepartmentData({}));
                setIsDepartmentModal(false)
                // showToast('success', success.message)
            },
            onError: (error: string) => {
                postAddingDepartmentLoader.hideLoader()
            },
        }))
    }

    const postAddingDesignation = () => {
        const params = {
            name: convertToUpperCase(designation),
            is_admin: false
        }
        postAddingDesignationLoader.showLoader()
        dispatch(addDesignation({
            params,
            onSuccess: (success: any) => {
                postAddingDesignationLoader.hideLoader()
                dispatch(getDesignationData({}));
                setIsDesignationModal(false)
                // showToast('success', success.message)
            },
            onError: (error: string) => {
                postAddingDesignationLoader.hideLoader()
            },
        }))
    }


    const normalizedDepartmentData = (data: any) => {
        return data.map((el: any) => {
            return {
                name: el.name,

            };
        });
    };

    const normalizedDesignationData = (data: any) => {
        return data.map((el: any) => {
            return {
                name: el.name,

            };
        });
    };

    return (
        <>
            <div className='container-fluid '>
             
                
                <div className="row pt-4">
                    <div className='col-sm-6 mt-2' >
                        <Card>
                            <div className='row'>
                                <div className='col'>
                                    <h3>course</h3>
                                </div>
                                <div className='text-right mr-3 '>
                                    <Button
                                        text={departmentListStatus ? 'hide' :'view'}
                                        size={'sm'}
                                        onClick={() => {
                                            if (!departmentData) {
                                                getDepartmentList()
                                            }
                                            setDepartmentListStatus(!departmentListStatus)
                                        }}
                                    />
                                    <Button
                                        text={'addcourse'}
                                        size={'sm'}
                                        onClick={() => setIsDepartmentModal(!isDepartmentModal)}
                                    />
                                </div>
                            </div>
                            <div className='overflow-auto mt-0' style={{ height: departmentListStatus ? '80.5vh' : '0vh', marginLeft: '-39px', marginRight: '-39px' }}>
                                {departmentData && departmentData?.length > 0 ?
                                    <CommonTable displayDataSet={normalizedDepartmentData(departmentData)} 
                                    isLoading={departmentListLoader.loader}
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
                    <div className='col-sm-6 mt-2'>
                        <Card>
                            <div className='row'>
                                <div className='col'>
                                    <h3>factility role</h3>
                                </div>
                                <div className='text-right mr-3 '>
                                    <Button
                                        text={designationListStatus ?'hide': 'view'}
                                        size={'sm'}
                                        onClick={() => {
                                            if (!designationData) {
                                                getDesignationList()
                                            }
                                            setDesignationListStatus(!designationListStatus)
                                        }}
                                    />
                                    <Button
                                        text={'add role'}
                                        size={'sm'}
                                        onClick={() => setIsDesignationModal(!isDesignationModal)}
                                    />
                                </div>
                            </div>

                            <div className='overflow-auto mt-0' style={{ height: designationListStatus ? '80.5vh' : '0vh', marginLeft: '-39px', marginRight: '-39px' }}>
                                {designationData && designationData?.length > 0 ?
                                    <CommonTable displayDataSet={normalizedDesignationData(designationData)} 
                                    isLoading={designationListLoader.loader}
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
                </div>

                {/**
            * Department
            */}
          

                <Modal isModalLoading={postAddingDepartmentLoader.loader} isOpen={isDepartmentModal} onClose={() => setIsDepartmentModal(!isDepartmentModal)} title={'addcourse'} >
                    <div className="">
                        <Input
                            placeholder={'course'}
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </div>
                    <div className='text-right'>
                        <Button
                            color={'secondary'}
                            text={translate('common.cancel')}
                            onClick={() => setIsDepartmentModal(!isDepartmentModal)}
                        />
                        <Button

                            text={translate('common.submit')}
                            onClick={() => {
                                postAddingDepartment()
                            }}
                        />
                    </div>
                </Modal>

                {/**
            * Designation
            */}

                <Modal isModalLoading={postAddingDesignationLoader.loader} isOpen={isDesignationModal} onClose={() => setIsDesignationModal(!isDesignationModal)} title={'addfac'}>
                    <div className="">
                        <Input
                            placeholder={'role'!}
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        />
                    </div>
                    <div className='text-right'>
                        <Button
                            color={'secondary'}
                            text={translate('common.cancel')}
                            onClick={() => setIsDesignationModal(!isDesignationModal)}
                        />
                        <Button
                            text={translate('common.submit')}
                            onClick={() => {
                                postAddingDesignation()
                            }}
                        />
                    </div>
                </Modal>
            </div>
        </>
    )
}

export { Settings }