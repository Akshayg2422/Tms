
import React, { useEffect, } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { EmployeeGroupsProps } from './interfaces'
import { Card, Divider, NoDataFound, H, SearchInput } from '@Components'
import { getGroupsEmployees } from '@Redux'
function GroupEmployees({ Employees, height, otherParams }: EmployeeGroupsProps) {

    const dispatch = useDispatch()
    const { groupEmployees } = useSelector((state: any) => state.UserCompanyReducer);
    useEffect(() => {
        getGroupEmployees()
    }, [Employees])



    const getGroupEmployees = (q: string = '') => {

        const params = {
            group_id: Employees,
            ...(otherParams && { ...otherParams }),
            q
        }
        if (Employees) {
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
    }



    return (

        <Card title={'Members'} className={'h-100'}>
            <div className='mt--3'>
                <SearchInput onSearch={(search) => {
                    getGroupEmployees(search)
                }} />
            </div>
            <div className='mt-3'>
                {
                    groupEmployees && groupEmployees.length > 0 ? groupEmployees.map((el: any, index: number) => {
                        const { name, mobile_number, designation, department, } = el
                        return (
                            <>
                                <div className='overflow-auto overflow-hide' >
                                    <div className='align-items-center'>
                                        <div className='row align-item-center justify-content-center'>
                                            <div className='col pt-1'>
                                                <H
                                                    tag={'h4'}
                                                    text={name}
                                                />
                                            </div>

                                        </div>
                                        <div className={'row col mt--2'}>
                                            <div className={'h6 mb-0 text-uppercase text-muted '} >{department ? department : '-'}</div>
                                            <div className={'h5 mb-0 text-uppercase text-muted px-1'}>{'/'}</div>
                                            <div className={'h6 mb-0 text-uppercase text-muted'}>{designation ? designation : '-'}</div>
                                        </div>
                                    </div>
                                    <div className={'mx--2 '}>
                                        {index !== groupEmployees.length - 1 && <Divider space={'3'} />}
                                    </div>
                                </div>
                            </>

                        )
                    }) : <div className='pt-6 mt-5'>
                        <NoDataFound type={'text'} text={'No data found'} />
                    </div>
                }
            </div>
        </Card >

    )
}
export { GroupEmployees }
