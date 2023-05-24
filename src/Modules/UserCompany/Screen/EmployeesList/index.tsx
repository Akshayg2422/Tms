import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    getEmployeesl,
    setSelectedEmployee
} from "@Redux";
import { useDropDown, useModal, useNavigation } from '@Hooks';
import { Card, CommonTable, Button } from '@Components';
import { translate } from "@I18n";
import { ROUTES } from '@Routes';
import { INITIAL_PAGE, paginationHandler } from '@Utils';


function EmployeesList() {
    const dispatch = useDispatch();
    const { goTo } = useNavigation();
    const { dashboardDetails, employeeTimelineList, employeesl, employeeslCurrentPages,
        employeeslNumOfPages } = useSelector((state: any) => state.UserCompanyReducer);
    const { company_branch } = dashboardDetails || ''


    useEffect(() => {
        getEmployeesHandler(INITIAL_PAGE)
    }, [])

    const getEmployeesHandler = ((page_number) => {
        const params = {
            page_number
        }
        dispatch(
            getEmployeesl({
                params,
                onSuccess: (response: any) => () => {
                },
                onError: (error) => () => {
                },
            })

        )
    })

    const normalizedEmployeesTableData = (data: any) => {
        if (data && data?.length > 0) {
            return data?.map((el: any) => {
                return {

                    Name: el?.name,
                    PhoneNo: el?.mobile_number,
                    '': <Button className={'text-white'} text={'View'} size='sm' onClick={() => { goTo(ROUTES['user-company-module']['employee-time-sheet']); }} />
                }
            }
            )

        }

    }



    return (
        <div className='m-3'>
            <Card >
                <div>
                    <div className='h4 text-muted'>
                        {company_branch?.name}
                    </div>

                </div>
                <div
                    style={{

                        marginLeft: "-23px",
                        marginRight: "-23px"
                    }}
                >

                    {employeesl && employeesl.length > 0 && <CommonTable
                        isPagination
                        tableDataSet={employeesl}
                        displayDataSet={normalizedEmployeesTableData(employeesl)}
                        currentPage={employeeslCurrentPages}
                        noOfPage={employeeslNumOfPages}
                        paginationNumberClick={(currentPage) => {
                            getEmployeesHandler(paginationHandler("current", currentPage));
                        }}
                        previousClick={() => {
                            getEmployeesHandler(paginationHandler("prev", employeeslCurrentPages))
                        }
                        }
                        nextClick={() => {
                            getEmployeesHandler(paginationHandler("next", employeeslCurrentPages));
                        }
                        }
                        tableOnClick={(idx, index, item) => {
                            dispatch(setSelectedEmployee(item));



                        }}
                    />
                    }

                </div>
            </Card>

        </div>
    )
}

export { EmployeesList }