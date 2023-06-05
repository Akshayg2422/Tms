import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    getEmployees,
    setSelectedEmployee,
    setSelectedCompany
} from "@Redux";
import { useDropDown, useModal, useNavigation } from '@Hooks';
import { Card, CommonTable, Button, Image, SearchInput } from '@Components';
import { translate } from "@I18n";
import { HOME_PATH, ROUTES } from '@Routes';
import { getPhoto, paginationHandler } from '@Utils';
import { icons } from '@Assets';

function EmployeesList() {

    const { goTo, goBack } = useNavigation()
    const dispatch = useDispatch()

    const { employees, employeesCurrentPages, employeesNumOfPages, dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
   
    const { company_branch } = dashboardDetails || ''


    useEffect(() => {
        getCompanyEmployeesApi(employeesCurrentPages)
    }, []);


    function getCompanyEmployeesApi(page_number: number,q_many:string = '') {

        const params = {
            branch_id: company_branch?.id,
            q_many,
            page_number,
            
        };
        dispatch(getEmployees({
            params,
            onSuccess: (response) => () => {
            },
            onError: () => () => { }
        }));
    }

    const normalizedTableData = (data: any) => {

        if (data && data?.length > 0) {
            return data?.map((el: any) => {
                return {
                    profile:
                        <div className='row ' onClick={() => { goTo(ROUTES['user-company-module']['employee-time-sheet']) }}>
                            <div className='col-auto '>{el?.profile_image ? <Image variant={'rounded'} size='sm' src={getPhoto(el?.profile_image)} /> : <Image variant={'rounded'} size='sm' src={icons.profilePick} />}</div>
                            <div className='col mt--3 '> <div className='row h5 mb-0 '>{el.name}</div>
                            </div>
                        </div>,
                    department: el?.department?.name,
                    designation: el?.designation?.name,

                };
            });
        }
    };

    return (
        <div>
            <div className='pt-3'>
                <CommonTable card title=
                    {
                        <div className={'row justify-content-between'}>
                            <div className='h4 text-muted pl-3'>
                                {company_branch?.name}
                            </div>
                            <div className='col-4 text-right'>
                                <SearchInput onSearch={(search:any) => {
                                    getCompanyEmployeesApi(employeesCurrentPages,search)
                                }} />
                            </div>

                            <div>
                                <Button className={'text-white'} text={translate('common.addUser')} size={'sm'} onClick={() => {
                                    dispatch(setSelectedCompany(undefined));
                                    goTo(HOME_PATH.ADD_USER)
                                }} />
                            </div>
                        </div>
                    }
                    isPagination

                    tableDataSet={employees} 
                    displayDataSet={normalizedTableData(employees)}
                    noOfPage={ employeesNumOfPages}
                    currentPage={employeesCurrentPages}
                    tableOnClick={(id, index, item) => {
                        dispatch(setSelectedEmployee(item));
                        goTo(ROUTES['user-company-module']['employee-time-sheet'])
                    }
                    }
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