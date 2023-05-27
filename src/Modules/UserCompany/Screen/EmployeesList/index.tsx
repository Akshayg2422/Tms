import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    getEmployees,
    setSelectedEmployee
} from "@Redux";
import { useDropDown, useModal, useNavigation } from '@Hooks';
import { Card, CommonTable, Button, Image } from '@Components';
import { translate } from "@I18n";
import { HOME_PATH, ROUTES } from '@Routes';
import { getPhoto } from '@Utils';
import { icons } from '@Assets';

function EmployeesList() {

    const { goTo } = useNavigation()
    const dispatch = useDispatch()

    const { employees, selectedCompany, dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
    console.log(employees)
    const { company_branch } = dashboardDetails || ''
    console.log('11111111111111111111',);
    

    useEffect(() => {
        getCompanyEmployeesApi()
    }, []);



    function getCompanyEmployeesApi() {

        const params = { branch_id: selectedCompany?.branch_id };
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
                        <div className='row '>
                            <div className='col-auto '>{el?.profile_image ? <Image variant={'rounded'} src={getPhoto(el?.profile_image)} /> : <Image variant={'rounded'} src={icons.profilePick} />}</div>
                            <div className='col mt--3 '> <div className='row h5 mb-0 '>{el.name}</div>
                                <div className=' row ' >{el?.department?.name} <div className='px-1'>/</div>  {el?.designation?.name}</div>
                            </div>
                        </div>,
                    phone: el?.mobile_number,
                    email: el?.email,
                    '': <Button className={'text-white'} text={'View'} size='sm' onClick={() => { goTo(ROUTES['user-company-module']['employee-time-sheet']); }} />

                };
            });
        }
    };

    return (
        <div>
            <div className=''>
                <CommonTable card title=
                    {
                        <div className={'row justify-content-between'}>
                            <div className='h4 text-muted'>
                                {company_branch?.name}
                            </div>

                            <div>
                                <Button className={'text-white'} text={translate('common.addUser')} size={'sm'} onClick={() => { goTo(HOME_PATH.ADD_USER) }} />
                            </div>
                        </div>
                    }
                    tableDataSet={employees} displayDataSet={normalizedTableData(employees)} />
            </div>


        </div>
    )
}

// function EmployeesList() {
//     const dispatch = useDispatch();
//     const { goTo } = useNavigation();
//     const { employees, selectedCompany, dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
//     // const { dashboardDetails, employeeTimelineList, employeesl, employeeslCurrentPages, employeeslNumOfPages } = useSelector((state: any) => state.UserCompanyReducer);
//     const { company_branch } = dashboardDetails || ''


//     // useEffect(() => {
//     //     getEmployeesHandler()
//     // }, [])

//     const getEmployeesHandler = (() => {
//         const params = { branch_id: selectedCompany.branch_id };
//         dispatch(
//             getEmployees({
//                 params,
//                 onSuccess: (response: any) => () => {
//                 },
//                 onError: (error) => () => {
//                 },
//             })

//         )
//     })

//     const normalizedEmployeesTableData = (data: any) => {
//         console.log('dataaaaaaaaaaa---------->',data);

//         if (data && data?.length > 0) {
//             return data?.map((el: any) => {
//                 return {

//                     Name: el?.name,
//                     PhoneNo: el?.mobile_number,
//                     '': <Button className={'text-white'} text={'View'} size='sm' onClick={() => { goTo(ROUTES['user-company-module']['employee-time-sheet']); }} />
//                 }
//             }
//             )
//         }
//     }



//     return (
//         <div className='m-3'>
//             <Card >
//                 <div className={'row justify-content-between'}>
//                     <div className='h4 text-muted'>
//                         {company_branch?.name}
//                     </div>

//                     <div>
//                         <Button className={'text-white'} text={translate('common.addUser')} size={'sm'} onClick={() => { goTo(HOME_PATH.ADD_USER) }} />
//                     </div>
//                 </div>
//                 <div
//                     style={{

//                         marginLeft: "-23px",
//                         marginRight: "-23px"
//                     }}
//                 >

//                     {employees && employees.length > 0 && <CommonTable
//                         isPagination
//                         tableDataSet={employees}
//                         displayDataSet={normalizedEmployeesTableData(employees)}
//                         tableOnClick={(idx, index, item) => {
//                             dispatch(setSelectedEmployee(item));
//                         }}
//                     />
//                     }

//                 </div>
//             </Card>

//         </div>
//     )
// }

export { EmployeesList }