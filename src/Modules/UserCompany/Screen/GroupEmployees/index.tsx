
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {EmployeeGroupsProps} from'./interfaces'
import { Card, Divider, NoDataFound, H ,Image, SearchInput} from '@Components'
import { getGroupsEmployees } from '@Redux';
import { getPhoto } from '@Utils';

function GroupEmployees({ Employees,height,otherParams}: EmployeeGroupsProps) {

    const dispatch = useDispatch()
    const { groupEmployees } = useSelector((state: any) => state.UserCompanyReducer);
    useEffect(() => {
        getGroupEmployees()
    }, [ Employees])
   

    const  getGroupEmployees=(q: string = '')=> {
       
        const params = {
            group_id: Employees,
            ...(otherParams && { ...otherParams }),
            q
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
            <Card className=' shadow-none overflow-auto overflow-hide mr--3'style={{height}}  >
            
               
                    <SearchInput onSearch={(search) => {
                        getGroupEmployees(search)
                    }} />
                
         
                {
                    groupEmployees && groupEmployees.length > 0 ? groupEmployees.map((el: any, index: number) => {
                        const { name, mobile_number, designation, department, } = el
                        return (
                            <>
                            {/* <div className='container pointer overflow-auto overflow-hide ' >
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
                            </div> */}

                            <div className='container  overflow-auto overflow-hide pt-1 ' >
                                <div className=' align-items-center  '>
                                    
                              

                                    <div className='row align-item-center justify-content-center'>
                                        <div className='col pt-2'>
                                        <H
                                            tag={'h4'}
                                            text={name}
                                        />

                                        </div>
                                      
                                    </div>

                                    <div className={'row col'}>
                                        <div className={'h6 mb-0 text-uppercase text-muted pl-2 '} >{department ? department : '-'}</div>
                                        <div className={'h5 mb-0 text-uppercase text-muted px-1'}>{'/'}</div>
                                        <div className={'h6 mb-0 text-uppercase text-muted' }>{designation ? designation : '-'}</div>
                                    </div>
                                </div>
                                <div className={'mx--2'}>
                                    {index !== groupEmployees.length - 1 && <Divider space={'1'} />}
                                </div>
                            </div>
                            </>
                            
                            )
                    }) : <div className='pt-6 mt-5'>
                        <NoDataFound type={'text'} text={'No data found'} />
                        </div>
                }
            </Card >
        </>
    )
}
export { GroupEmployees }
