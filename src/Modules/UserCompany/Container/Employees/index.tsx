import React, { useEffect, useState } from 'react'
import { EmployeesProps } from './interfaces'
import { SearchInput, H, Image, Divider, NoDataFound, Card } from '@Components'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployees } from '@Redux'
import { capitalizeFirstLetter, getPhoto } from '@Utils'
import { icons } from '@Assets'


function Employees({ otherParams, selection = 'none', onSelected, defaultSelect }: EmployeesProps) {

    const { employees } = useSelector((state: any) => state.UserCompanyReducer);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(defaultSelect)
    const dispatch = useDispatch()


    useEffect(() => {
        setSelectedEmployee(defaultSelect)
    }, [defaultSelect])



    useEffect(() => {
        getEmployeeApi()
    }, [])

    const getEmployeeApi = (q_many: string = '') => {
        const params = {
            ...(otherParams && { ...otherParams }),
            q_many
        }
        dispatch(
            getEmployees({
                params,
                onSuccess: () => () => {
                },
                onError: () => () => { }
            })
        )

    }

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

    return (
        <div>
            <div className='d-flex justify-content-end mt--3'>
                <div className='col-6'>
                    <SearchInput onSearch={(search) => {
                        getEmployeeApi(search)
                    }} />
                </div>
            </div>
            <Card className='m-1 mt-3 shadow-none overflow-auto overflow-hide' style={{ maxHeight: '58vh' }}>
                {
                    employees && employees.length > 0 ? employees.map((employee: any, index: number) => {
                        const { profile_image, name, designation, department, id } = employee

                        const isSelected = selectedEmployee && selectedEmployee.length > 0 && selectedEmployee.some((each: any) => {
                            return each.id === id
                        })

                        // const isSelected =  defaultSelect? selectedEmployee.some((each: any) => {
                        //     return each.id === id
                        // })
                        // :defaultSelect.some((each: any) => {
                        //     return each.id === id
                        // })





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

                                <div className={'mx--4'}>
                                    {index !== employees.length - 1 && <Divider space={'3'} />}
                                </div>
                            </div>)
                    }) : <NoDataFound type={'text'} text={''} />
                }
            </Card >
        </div >
    )
}
export { Employees }