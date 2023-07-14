import React, { useEffect, useState } from 'react'
import { GroupEmployeesProps } from './interfaces'
import { SearchInput, H, Image, Divider, NoDataFound, Card, DropDown } from '@Components'
import { useDispatch, useSelector } from 'react-redux'
import { getAssociatedCompaniesL, getDepartments, getDesignations, getEmployees } from '@Redux'
import { capitalizeFirstLetter, getDropDownCompanyDisplayData, getDropDownDisplayData, getPhoto } from '@Utils'
import { icons } from '@Assets'
import { translate } from '@I18n'
import { useDropDown } from '@Hooks'


function EmployeesV1({ selection = 'none', onSelected, defaultSelected }: GroupEmployeesProps) {

    const { employees, departments, designations, associatedCompaniesL, dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
    const DEFAULT_COMPANY = { id: dashboardDetails?.permission_details?.branch_id, display_name: '𝗦𝗘𝗟𝗙', name: 'self' }

    const DEFAULT_DATA = { id: 'ALL', name: 'All' }
    const [selectedEmployee, setSelectedEmployee] = useState<any>(defaultSelected)

    const company = useDropDown(DEFAULT_COMPANY)
    const department = useDropDown(DEFAULT_DATA)
    const designation = useDropDown(DEFAULT_DATA)

    const dispatch = useDispatch()
 
 
    useEffect(() => {
        if (defaultSelected) {
            setSelectedEmployee(defaultSelected);
        }
    }, [defaultSelected]);


    useEffect(() => {
        const params = { q: '' };

        dispatch(
            getAssociatedCompaniesL({
                params,
                onSuccess: () => () => {
                },
                onError: () => () => {
                },
            })
        );

    }, []);

    useEffect(() => {
        if (dashboardDetails) {
            getDepartmentAndDesignationsApi(DEFAULT_COMPANY);
        }
    }, [dashboardDetails]);

    useEffect(() => {
        getEmployeeApi()
    }, [company?.value?.id, department?.value?.id, designation?.value?.id])


    function getDepartmentAndDesignationsApi(item: any) {

        const params = {
            branch_id: item.id,
            per_page_count: -1,
        };

        dispatch(
            getDesignations({
                params,
                onSuccess: () => () => {
                },
                onError: () => () => {
                },
            })

        );

        dispatch(
            getDepartments({
                params,
                onSuccess: () => () => {
                },
                onError: () => () => {

                },
            })
        );

    }


    const getEmployeeApi = (q_many: string = '') => {
        const params = {
            q_many,
            per_page_count: -1,
            ...(company?.value?.id && { branch_id: company.value.id }),
            ...(department?.value?.id && { department_id: department?.value?.id }),
            ...(designation?.value?.id && { designation_id: designation?.value?.id })
        }

        dispatch(
            getEmployees({
                params,
                onSuccess: () => () => {
                },
                onError: () => () => {
                }
            })
        )

    }

    // function proceedSelectEmployee(item: any) {

    //     let updatedSelectedEmployee = [...selectedEmployee]
    //     if (selection === 'single') {
    //         updatedSelectedEmployee = [item] as never
    //         if (onSelected) {
    //             onSelected(item)
    //         }
    //     } else {
    //         const isExist = updatedSelectedEmployee.some((each: any) => {
    //             return each.id === item.id
    //         })

    //         if (isExist) {
    //             updatedSelectedEmployee = updatedSelectedEmployee.filter((each: any) => {
    //                 return each.id !== item.id
    //             })
    //         } else {
    //             updatedSelectedEmployee = [...updatedSelectedEmployee, item] as never
    //         }

    //         if (onSelected) {
    //             onSelected(updatedSelectedEmployee)
    //         }

    //     }
    //     setSelectedEmployee(updatedSelectedEmployee)
    // }

    function proceedSelectEmployee(item: any) {

        let updatedSelectedEmployee = (selectedEmployee && selectedEmployee.length) ? [...selectedEmployee] : []

        if (selection === 'single') {
            updatedSelectedEmployee = [item] as never
            if (onSelected) {
                onSelected(item)
            }
        } else {
            const isExist = updatedSelectedEmployee.some((each: any) => {
                return each.id === item.id
            })

            if (isExist) {
                updatedSelectedEmployee = updatedSelectedEmployee.filter((each: any) => {
                    return each.id !== item.id
                })
            } else {
                updatedSelectedEmployee = [...updatedSelectedEmployee, item] as never
            }

            if (onSelected) {
                onSelected(updatedSelectedEmployee)
            }

        }
        setSelectedEmployee(updatedSelectedEmployee)
    }


    const isCompanyExist =
        associatedCompaniesL && associatedCompaniesL.length > 0;


    return (
        <div  >
            <div className='row mt--4'>
                <div className='col-4 mt-1 '>
                    <SearchInput onSearch={(search) => {
                        getEmployeeApi(search)
                    }} />
                </div>
                {isCompanyExist && <>
                    <div className='col-4 mt--4'>
                        <DropDown
                            className="form-control-sm"
                            heading={translate("common.company")}
                            data={getDropDownCompanyDisplayData([DEFAULT_COMPANY, ...associatedCompaniesL])}
                            selected={company.value}
                            onChange={(item) => {
                                company.onChange(item);
                                department.set(DEFAULT_DATA);
                                designation.set(DEFAULT_DATA);
                                getDepartmentAndDesignationsApi(item);
                            }}
                        />
                    </div>

                    {departments && departments.length > 0 && <div className='col-4 mt--4'>
                        <DropDown
                            className="form-control-sm"
                            heading={translate("common.department")}
                            data={getDropDownDisplayData([DEFAULT_DATA, ...departments])}
                            selected={department.value}
                            onChange={(item) => {
                                department.onChange(item)
                            }}
                        />
                    </div>}

                    {designations && designations.length > 0 && <div className='col-4 mt--2 '>
                        <DropDown
                            className="form-control-sm"
                            heading={translate("auth.designation")}
                            data={getDropDownDisplayData([DEFAULT_DATA, ...designations])}
                            selected={designation.value}
                            onChange={(item) => {
                                designation.onChange(item)

                            }}
                        />
                    </div>
                    }
                </>
                }
            </div>

            <div className='shadow-none overflow-auto overflow-hide my-3' style={{ maxHeight: '50vh' }}>
                
                {/* {
                    employees && employees?.length > 0 ? employees?.map((employee: any, index: number) => {
                        const { profile_image, name, designation, department, id } = employee

                        const isSelected = selectedEmployee && selectedEmployee.length > 0 && selectedEmployee.some((each: any) => {
                            return each.id === id
                        })

                     console.log('isSelected========>',selectedEmployee);
                     
                        return (
                            <div className='container pointer' key={id} onClick={selection !== 'none' ? () => proceedSelectEmployee(employee) : undefined}>
                                <div className='row d-flex align-items-center'>
                                    <div>
                                        {profile_image ? <Image variant={'rounded'} src={getPhoto(profile_image)} /> : <Image variant={'rounded'} src={icons.profilePick} />}
                                    </div>
                                    <div className='ml-2'>
                                        <H
                                            className="py-1 m-0 pointer mb-0"
                                            tag={'h4'}
                                            text={capitalizeFirstLetter(name)}
                                        />
                                        <div className={'d-flex align-items-center mt--2'}>
                                            <div className={'h6 mb-0 text-uppercase text-muted '} >{department ? department.name : '-'}</div>
                                            <div className='text-muted'><Image src={icons.verticalLine} height={12} width={7} /></div>
                                            <div className={'h6 mb-0 text-uppercase text-muted'}>{designation ? designation.name : '-'}</div>
                                        </div>
                                    </div>
                                   
                                </div>

                                <div className={'mx--4'}>
                                    {index !== employees.length - 1 && <Divider space={'3'} />}
                                </div>
                            </div>)
                    }) : <NoDataFound type={'text'} />
                } */}
                   

                   {
                    employees && employees.length > 0 ? employees.map((employee: any, index: number) => {
                        const { profile_image, name, designation, department, id } = employee

                        const isSelected = selectedEmployee && selectedEmployee.length > 0 && selectedEmployee.some((each: any) => {
                            return each.id === id
                        })

                        return (
                            <div className='container pointer' key={id} onClick={selection !== 'none' ? () => proceedSelectEmployee(employee) : undefined}>
                                <div className='row d-flex align-items-center'>
                                    <div>
                                        {profile_image ? <Image variant={'rounded'} src={getPhoto(profile_image)} /> : <Image variant={'rounded'} src={icons.profilePick} />}
                                    </div>
                                    <div className='ml-3'>
                                        <H
                                            className="py-1 m-0 pointer mb-0"
                                            tag={'h4'}
                                            text={capitalizeFirstLetter(name)}
                                        />
                                        <div className={'d-flex align-items-center mt--2'}>
                                            <div className={'h6 mb-0 text-uppercase text-muted '} >{department ? department.name : '-'}</div>
                                            <div className='text-muted'><Image src={icons.verticalLine} height={12} width={7} /></div>
                                            <div className={'h6 mb-0 text-uppercase text-muted'}>{designation ? designation.name : '-'}</div>
                                        </div>
                                    </div>
                                    <div className='col text-right'>
                                        {
                                            isSelected && <Image src={icons.selectOn} height={30} width={30} />
                                        }
                                    </div>
                                </div>

                                <div className={'mx--4 my--2'}>
                                    {index !== employees.length - 1 && <Divider space={'3'} />}
                                </div>
                            </div>)
                    }) : <NoDataFound type={'text'} text={''} />
                }

            </div>
        </div >
    )
}
export { EmployeesV1 }