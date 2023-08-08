import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    getEmployees,
    setSelectedEmployee,
    setSelectedCompany,
    handleUserDetails
} from "@Redux";
import { useDropDown, useInput, useModal, useNavigation } from '@Hooks';
import { Card, CommonTable, Button, Image, SearchInput, Spinner, MenuBar } from '@Components';
import { translate } from "@I18n";
import { HOME_PATH, ROUTES } from '@Routes';
import { getPhoto, paginationHandler } from '@Utils';
import { icons } from '@Assets';

function EmployeesList() {

    const { goTo, goBack } = useNavigation()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const searchEmployee=useInput('')
    const { employees, employeesCurrentPages, employeesNumOfPages, dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);

    const { company_branch } = dashboardDetails || ''

    const TASK_STATUS_MENU = [
        { id: '0', name: "Edit", icon: icons.edit }
        
     
    ]


    useEffect(() => {
        getCompanyEmployeesApi(1)
    }, []);

    
    useEffect(() => {
        getCompanyEmployeesApi(employeesCurrentPages)
    }, [searchEmployee.value]);

  

    function getCompanyEmployeesApi(page_number: number) {
        setLoading(true)
if(page_number){
        const params = {
            branch_id: company_branch?.id,
            q_many:searchEmployee.value,
            page_number,

        };
    
        dispatch(getEmployees({
            params,
            onSuccess: (response) => () => {
                setLoading(false)
            },
            onError: () => () => {
                setLoading(false)
            }
        }));
    }
   
    }

    const normalizedTableData = (data: any) => {
        

        if (data && data?.length > 0) {
            return data?.map((el: any) => {
                return {
                    profile:
                        <div className='row ' onClick={() => { goTo(ROUTES['user-company-module']['employee-time-sheet']) 
                        dispatch(setSelectedEmployee(el))}}>
                            <div className='col-auto '>{el?.profile_image ? <Image variant={'rounded'} size='sm' src={getPhoto(el?.profile_image)} /> : <Image variant={'rounded'} size='sm' src={icons.profilePick} />}</div>
                            <div className='col mt--3 '> <div className='row h5 mb-0 '>{el.name}</div>
                            </div>
                        </div>,
                    phone: el?.mobile_number,
                    email: el?.email,
                    '':<MenuBar  menuData={TASK_STATUS_MENU} onClick={()=>{
                        goTo(HOME_PATH.ADD_USER)
                        dispatch(handleUserDetails(el))
                    }}/>
                    

                };
            });
        }
    };

    return (
        <div>
            <div className='pt-3'>
                {
                    loading && (
                        <div className='d-flex justify-content-center align-item-center' style={{ minHeight: '200px', marginTop: '250px' }}>
                            <Spinner />
                        </div>
                    )
                }
                <CommonTable card title=
                    {
                        <div className={'row justify-content-between'}>
                            <div className='h4 text-muted pl-3'>
                                {company_branch?.name}
                            </div>
                            <div className='col-4 text-right'>
                                <SearchInput defaultValue={ searchEmployee.value} onSearch={(search: any) => {
                                    searchEmployee.set(search)
                                
                                }} />
                            </div>

                            <div>
                                <Button className={'text-white'} text={translate('common.addUser')} size={'sm'} onClick={() => {
                                    dispatch(setSelectedCompany(undefined));
                                    goTo(HOME_PATH.ADD_USER)
                                    dispatch(handleUserDetails({}))
                                }} />
                            </div>
                        </div>
                    }
                    isPagination
                    tableDataSet={employees}
                    displayDataSet={normalizedTableData(employees)}
                    noOfPage={employeesNumOfPages}
                    currentPage={employeesCurrentPages}
                    // tableOnClick={(id, index, item) => {
                    //     dispatch(setSelectedEmployee(item));
                    //     goTo(ROUTES['user-company-module']['employee-time-sheet'])
                    // }
                    // }
                    paginationNumberClick={(currentPage) => {
                        getCompanyEmployeesApi(paginationHandler("current", currentPage));
                    }}
                    previousClick={() => {
                        getCompanyEmployeesApi(paginationHandler("prev", employeesCurrentPages))
                    }
                    }
                    nextClick={() => {
                        getCompanyEmployeesApi(paginationHandler("next", employeesCurrentPages));
                    }
                    }

                />
            </div>


        </div>
    )
}


export { EmployeesList }