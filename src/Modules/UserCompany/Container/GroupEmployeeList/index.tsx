import React, { useEffect, useState } from 'react'
import { GroupEmployeesProps } from './interfaces'
import { SearchInput, H, Image, Divider, NoDataFound, Card, DropDown } from '@Components'
import { useDispatch, useSelector } from 'react-redux'
import { getAssociatedCompaniesL, getDepartments, getDesignations, getEmployees, getGroupsEmployees } from '@Redux'
import { capitalizeFirstLetter, getDropDownDisplayData, getPhoto } from '@Utils'
import { icons } from '@Assets'
import { translate } from '@I18n'
import { useDropDown } from '@Hooks'


function GroupEmployeeList({ otherParams, selection = 'none', onSelected, defaultSelect ,selectedCode}: GroupEmployeesProps) {

    const { employees,  departments, designations } = useSelector((state: any) => state.UserCompanyReducer);
     console.log(designations,"=====>")
    const [selectedEmployee, setSelectedEmployee] = useState<any>(defaultSelect)
    const [companies, setCompanies] = useState<any>()
    const company = useDropDown({})
    const department = useDropDown({})
    const designation = useDropDown({})
    const dispatch = useDispatch()
useEffect(()=>{
    getGroupEmployees() 
},[])

    const getGroupEmployees = () => {

        const params = {
            group_id: selectedCode,
        
        }
        if (selectedCode) {
            dispatch(
                getGroupsEmployees({
                    params,
                    onSuccess: (response) => () => {
                        const selectedUsers = response.details
                        if (selectedUsers && selectedUsers.length > 0) {
                            setSelectedEmployee(selectedUsers)
                        }
                    },
                    onError: () => () => {

                    }
                })
            )
        }
    }


    useEffect(() => {
        setSelectedEmployee(defaultSelect)
      
    }, [defaultSelect])

    useEffect(() => {
   
        getEmployeeApi()
   
       
    }, [company.value.id,department.value,designation.value])


    useEffect(() => {
        const params = { q: '' };

        dispatch(
            getAssociatedCompaniesL({
                params,
                onSuccess: (response) => () => {

                    const companies = response.details

                    let modifiedCompanies = []
                    modifiedCompanies = [...modifiedCompanies, { id: '', text: '𝗦𝗘𝗟𝗙', name: 'self' } as never]
                    if (companies && companies.length > 0) {
                        modifiedCompanies = [...modifiedCompanies, ...companies.map((each) => {
                            return {
                                id: each.id,
                                text: each.display_name,
                                name: each.display_name,
                            }
                        }) as never]
                    }
                    setCompanies(modifiedCompanies)
                },
                onError: () => () => {
                },
            })
        );

    }, []);


    const getDesignation = (items: any) => {

        if (items.id) {
            const params = {
                branch_id: items.id,
                per_page_count: -1,
            };

            dispatch(
                getDesignations({
                    params,
                    onSuccess: (response) => () => {
                       
                    },
                    onError: () => () => {
                    },
                })

            );
        }
    }

    const getDepartment = (items: any) => {
        if (items.id) {
            const params = {
                branch_id: items.id,
                per_page_count: -1,
            };
            dispatch(
                getDepartments({
                    params,
                    onSuccess: (response: any) => () => {
                    },
                    onError: (error) => () => {
                       
                    },
                })
            );
        }

    }


    const getEmployeeApi = (q_many: string = '') => {
        const params = {
            ...(otherParams && { ...otherParams }),
            q_many,
            per_page_count: -1,
            ...(company?.value?.id && { branch_id: company.value.id }),
            ...(department?.value?.id&& { department_id: department?.value?.id }),
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

    function proceedSelectEmployee(item: any) {

        let updatedSelectedEmployee = (selectedEmployee && selectedEmployee.length>0) ? [...selectedEmployee] : []
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

    return (
        <div  >
            <div className='row mt--4'>
                <div className='col-4 mt-1 '>
                    <SearchInput onSearch={(search) => {
                        getEmployeeApi(search)
                    }} />
                </div>
                <div className='col-4 mt--4'>
                    <DropDown
                        className="form-control-sm"
                        heading={translate("common.company")}
                        data={companies}
                        selected={company.value}
                        onChange={(item) => {
                            company.onChange(item)
                            getDesignation(item)
                            getDepartment(item)
                           
                        }}
                    />
                </div>

                {departments && departments?.length > 0 && <div className='col-4 mt--4'>
                    <DropDown
                        className="form-control-sm"
                        heading={translate("common.department")}
                        data={ getDropDownDisplayData(departments)}
                        selected={department.value}
                        onChange={(item) => {
                            department.onChange(item)
                        }}
                    />
                </div>
                }

                {designations && designations?.length > 0 && <div className='col-4 mt--2 '>
                    <DropDown
                        className="form-control-sm"
                        heading={translate("auth.designation")}
                        data={getDropDownDisplayData(designations)}
                        selected={designation.value}
                        onChange={(item) => {
                            designation.onChange(item)
                    
                        }}
                    />
                </div>
                }



            </div>

            <Card className='m-1 mt-2 shadow-none overflow-auto overflow-hide ' style={{ maxHeight: '50vh' }}>
                {
                    employees && employees?.length > 0 ? employees?.map((employee: any, index: number) => {
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
            </Card >
        </div >
    )
}
export { GroupEmployeeList }