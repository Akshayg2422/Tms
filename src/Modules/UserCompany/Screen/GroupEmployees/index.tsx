
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {EmployeeGroupsProps} from'./interfaces'
import { Card, Divider, NoDataFound, H } from '@Components'
import { getGroupsEmployees } from '@Redux';

function GroupEmployees({ Employees }: EmployeeGroupsProps) {

    const dispatch = useDispatch()
    const { groupEmployees } = useSelector((state: any) => state.UserCompanyReducer);

    useEffect(() => {
        getGroupEmployees()
    }, [])


    function getGroupEmployees() {
        const params = {
            group_id: Employees
        }
        dispatch(
            getGroupsEmployees({
                params,
                onSuccess: (response) => () => {

                    console.log('=======>>', JSON.stringify(response))
                },
                onError: () => () => {

                }
            })
        )
    }

    return (
        <>
            <Card className='m-1 mt-3 shadow-none overflow-auto overflow-hide' >
                {
                    groupEmployees && groupEmployees.length > 0 ? groupEmployees.map((el: any, index: number) => {
                        const { name, mobile_number, designation, department, } = el
                        return (
                            <div className='container pointer '>
                                <div className='d-flex align-items-center  mt--4'>
                                    <div className=' ml-3'>
                                        <H
                                            className=" m-0 pointer mb-0"
                                            tag={'h4'}
                                            text={name}
                                        />
                                    </div>
                                    <div className='d-flex  '>
                                        <div className={'h5 mt-5 text-muted'} >{mobile_number ? mobile_number : '-'}</div>
                                    </div>
                                    <div className={' d-flex align-items-center  mt-6 ml--6'}>
                                        <div className={'h6 mb-0 text-uppercase text-muted '} >{department ? department : '-'}</div>
                                        <div className='p-1'>{'/'}</div>
                                        <div className={'h6 mb-0 text-uppercase text-muted'}>{designation ? designation : '-'}</div>
                                    </div>
                                </div>
                                <div className={'mx--2'}>
                                    {index !== groupEmployees.length - 1 && <Divider space={'1'} />}
                                </div>
                            </div>)
                    }) : <NoDataFound type={'text'} text={''} />
                }
            </Card >
        </>
    )
}
export { GroupEmployees }
