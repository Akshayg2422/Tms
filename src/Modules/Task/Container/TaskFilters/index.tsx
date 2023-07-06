import React, { useEffect, useState } from 'react'
import { TaskFilterProps } from './interfaces'
import { DropDown, Checkbox, SearchInput, MenuBar, AutoComplete, P } from '@Components'
import { translate } from '@I18n'
import {
    TASK_FILTER_LIST, TASK_STATUS_LIST, TASK_PRIORITY_LIST, getObjectFromArrayByKey, getDropDownCompanyDisplayData, getDropDownDisplayData, getDropDownCompanyUser, TASK_FILTER_LIST_CREATED_BY, TASK_COMPANY_FILTER,
    TASK_FILTER_ALL
} from '@Utils'
import { useDropDown, useInput } from '@Hooks'
import { getAssociatedCompaniesL, getDepartments, getDesignations, getEmployees, setTaskParams, setAssignedDepartment, setAssignedDesignation, setAssignedEmployee, setCreatedDepartment, setCreatedDesignation, setCreatedEmployee } from '@Redux'
import { useDispatch, useSelector } from 'react-redux'

function TaskFilters({ onParams }: TaskFilterProps) {

    const dispatch = useDispatch()
    const { taskParams, assignedDepartment, assignedDesignation, assignedEmployee, createdDepartment, createdDesignation, createdEmployee } = useSelector((state: any) => state.TaskReducer);
    const { associatedCompaniesL, dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
    const filteredTaskAssigned = useDropDown(TASK_FILTER_LIST[1]);
    const filteredTaskCreated = useDropDown(TASK_FILTER_LIST_CREATED_BY[0]);
    const taskStatus = useDropDown(TASK_STATUS_LIST[2]);
    const taskPriority = useDropDown(TASK_PRIORITY_LIST[0]);
    const company = useDropDown({})
    const createdCompany = useDropDown({})
    const department = useDropDown(TASK_FILTER_ALL)
    const designation = useDropDown(TASK_FILTER_ALL)
    const createdDepartmentList = useDropDown(TASK_FILTER_ALL)
    const createdDesignationList = useDropDown(TASK_FILTER_ALL)
    const [includeSubTask, setIncludeSubTask] = useState(false)
    const [params, setParams] = useState({})
    const [advanceFilter, setAdvanceFilter] = useState(false)
    const [advanceFiltersAssignedTo, setAdvanceFiltersAssignedTo] = useState(false)
    const [advanceFiltersCreatedBy, setAdvanceFiltersCreatedBy] = useState(false)
    const search = useInput('')
    const modifiedAssignedDepartment = assignedDepartment?.length > 0 ? [TASK_FILTER_ALL, ...assignedDepartment] : [TASK_FILTER_ALL]
    const modifiedAssignedDesignation = assignedDesignation?.length > 0 ? [TASK_FILTER_ALL, ...assignedDesignation] : [TASK_FILTER_ALL]
    const modifiedCreateDepartment = createdDepartment?.length > 0 ? [TASK_FILTER_ALL, ...createdDepartment] : [TASK_FILTER_ALL]
    const modifiedCreateDesignation = createdDesignation?.length > 0 ? [TASK_FILTER_ALL, ...createdDesignation] : [TASK_FILTER_ALL]
    const modifiedCompany = associatedCompaniesL && associatedCompaniesL.length > 0 && [TASK_COMPANY_FILTER, ...associatedCompaniesL]
    const [selectedAssignedUserId, setSelectedAssignedUserId] = useState<any>();
    const [selectedCreatedUserId, setSelectedCreatedUserId] = useState<any>();




    useEffect(() => {



        if (taskParams) {

            const { q_many, task_status, priority, include_subtask, assigned_tasks_by, created_tasks_by, assigned_company, assigned_department_id, assigned_designation_id, assigned_emp_id, created_department_id, created_company, created_emp_id, created_designation_id } = taskParams
            search.set(q_many)

            // filteredTask.set(getObjectFromArrayByKey(TASK_FILTER_LIST, 'id', tasks_by))
            if (modifiedCompany?.length > 0) {
                company.set(getObjectFromArrayByKey(modifiedCompany, 'id', assigned_company))

            }

            if (modifiedAssignedDepartment?.length > 0) {
                department.set(getObjectFromArrayByKey(modifiedAssignedDepartment, 'id', assigned_department_id))

            }
            if (modifiedAssignedDesignation?.length > 0) {
                designation.set(getObjectFromArrayByKey(modifiedAssignedDesignation, 'id', assigned_designation_id))

            }
            if (assignedEmployee && assignedEmployee.length > 0) {
                setSelectedAssignedUserId(getObjectFromArrayByKey(assignedEmployee, 'id', assigned_emp_id))
            }
            if (createdEmployee && createdEmployee.length > 0) {
                setSelectedCreatedUserId(getObjectFromArrayByKey(createdEmployee, 'id', created_emp_id))
            }

            if (createdDepartment && createdDepartment?.length > 0) {

                createdDepartmentList.set(getObjectFromArrayByKey(modifiedCreateDepartment, 'id', created_department_id))

            }
            if (createdDesignation && createdDesignation?.length > 0) {

                createdDesignationList.set(getObjectFromArrayByKey(modifiedCreateDesignation, 'id', created_designation_id))

            }

            if (modifiedCompany && modifiedCompany?.length > 0) {
                createdCompany.set(getObjectFromArrayByKey(modifiedCompany, 'id', created_company))


            }

            filteredTaskAssigned.set(getObjectFromArrayByKey(TASK_FILTER_LIST, 'id', assigned_tasks_by))
            filteredTaskCreated.set(getObjectFromArrayByKey(TASK_FILTER_LIST_CREATED_BY, 'id', created_tasks_by))
            taskStatus.set(getObjectFromArrayByKey(TASK_STATUS_LIST, 'id', task_status))
            taskPriority.set(getObjectFromArrayByKey(TASK_PRIORITY_LIST, 'id', priority))
            setIncludeSubTask(include_subtask)
        }

    }, [taskParams])

    useEffect(() => {

        const params = {
            branch_id: taskParams?.assigned_company ? taskParams.assigned_company : dashboardDetails?.permission_details?.branch_id,
            per_page_count: -1,
        };


        dispatch(
            getDesignations({
                params,
                onSuccess: (response) => () => {
                    dispatch(
                        setAssignedDesignation(response?.details)
                    )

                },
                onError: () => () => {

                },
            })

        );

        dispatch(
            getDepartments({
                params,
                onSuccess: (response: any) => () => {

                    dispatch(
                        setAssignedDepartment(response?.details)
                    )


                },
                onError: (error) => () => {


                },
            })
        );


    }, [company?.value?.id, advanceFilter])

    useEffect(() => {
        if (company?.value?.id || department.value?.id !== 'ALL' || designation.value?.id !== 'ALL') {
            getCompanyEmployeeApi()
       

        }
    }, [designation?.value, department?.value, company?.value?.id,])

    
    useEffect(() => {
        if ( department.value?.id === 'ALL' || designation.value?.id === 'ALL') {
            getCompanyEmployeeApi()
       

        }
    }, [designation?.value, department?.value])


    function getCompanyEmployeeApi() {

        const params = {
            branch_id: company?.value?.id ? company.value.id : dashboardDetails?.permission_details?.branch_id,
            ...(department && { department_id: department?.value?.id }),
            ...(designation && { designation_id: designation?.value?.id }),
            per_page_count: -1,
        };
       

        dispatch(
            getEmployees({
                params,
                onSuccess: (response: any) => () => {

                    dispatch(
                        setAssignedEmployee(response?.details)

                    )

                },
                onError: () => () => { },
            })
        );
    }


    useEffect(() => {
        if (createdCompany?.value?.id || createdDepartmentList?.value?.id !== 'ALL' || createdDesignationList?.value?.id !== 'ALL') {

            getCompanyCreatedEmployeeApi()
          

        }

    }, [createdDesignationList.value, createdDepartmentList.value, createdCompany.value])

    useEffect(() => {
        if ( createdDepartmentList?.value?.id === 'ALL' || createdDesignationList?.value?.id === 'ALL') {

            getCompanyCreatedEmployeeApi()
           

        }

    }, [createdDesignationList.value, createdDepartmentList.value])

    function getCompanyCreatedEmployeeApi() {

        const params = {
            branch_id: createdCompany?.value?.id ? createdCompany?.value?.id : dashboardDetails?.permission_details?.branch_id,
            ...(createdDepartmentList && { department_id: createdDepartmentList?.value?.id }),
            ...(createdDesignationList && { designation_id: createdDesignationList?.value?.id }),
            per_page_count: -1,
        };
        console.log(params, "pppp===<")
        dispatch(
            getEmployees({
                params,
                onSuccess: (response: any) => () => {

                    dispatch(
                        setCreatedEmployee(response?.details)

                    )

                },
                onError: () => () => {

                },
            })
        );
    }

    useEffect(() => {
        const params = { q: '' };
        if (advanceFilter) {
            dispatch(
                getAssociatedCompaniesL({
                    params,
                    onSuccess: (response) => () => {
                    },
                    onError: () => () => {
                    },
                })
            );
        }
    }, [advanceFilter]);

    useEffect(() => {

        const params = {
            branch_id: createdCompany?.value?.id ? createdCompany?.value?.id : dashboardDetails?.permission_details?.branch_id,
            per_page_count: -1,
        };
        dispatch(
            getDesignations({
                params,
                onSuccess: (response) => () => {
                    dispatch(
                        setCreatedDesignation(response?.details)
                    )

                },
                onError: () => () => {
                    // setDesignations([])
                },
            })

        );
        dispatch(
            getDepartments({
                params,
                onSuccess: (response: any) => () => {
                    dispatch(
                        setCreatedDepartment(response?.details)
                    )


                },
                onError: (error) => () => {
                    // setDepartments([])

                },
            })
        );

    }, [createdCompany?.value?.id])




    function proceedParams(object: any) {

        const updatedParams = { ...params, ...object }
        if (onParams) {
            onParams(updatedParams)
        }
        setParams(updatedParams)
    }



    return (
        < >
            <div className="row">
                <div className='row col'>
                    <div className="col-lg-3  col-md-3 col-sm-12">
                        <SearchInput defaultValue={search.value} heading={translate("common.codeTitle")!} onSearch={
                            (text) => {
                                search.set(text)
                                proceedParams({ q_many: text })
                            }
                        } />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 ">
                        <DropDown
                            className="form-control-sm"
                            heading={translate("common.assignedTo")}
                            // selected={filteredTask .value}
                            selected={filteredTaskAssigned.value}
                            data={TASK_FILTER_LIST}
                            onChange={(item) => {
                                if (item.id === 'advance') {
                                    setAdvanceFiltersAssignedTo(true)
                                    getCompanyEmployeeApi()
                                    proceedParams({ assigned_tasks_by: item.id })

                                }
                                else {
                                    setAdvanceFiltersAssignedTo(false)
                                    if (item.id === 'ALL') {
                                        proceedParams({ assigned_tasks_by: item.id, assigned_company: 'ALL', assigned_designation_id: 'ALL', assigned_department_id: 'ALL', assigned_emp_id: '' })
                                    }
                                    else {
                                        proceedParams({ assigned_tasks_by: item.id, assigned_company: '', assigned_designation_id: 'ALL', assigned_department_id: 'ALL', assigned_emp_id: '' })

                                    }

                                }
                                filteredTaskAssigned.onChange(item)
                                setAdvanceFilter(true)

                            }}
                        />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 ">
                        <DropDown
                            className="form-control-sm"
                            heading={'Created By'}
                            selected={filteredTaskCreated.value}
                            data={TASK_FILTER_LIST_CREATED_BY}
                            onChange={(item) => {

                                if (item.id === 'advance') {
                                    setAdvanceFiltersCreatedBy(true)
                                    getCompanyCreatedEmployeeApi()

                                    proceedParams({ created_tasks_by: item.id })
                                    // createdCompany.onChange(TASK_COMPANY_FILTER)
                                    proceedParams({ created_tasks_by: item.id })
                                }
                                else {
                                    setAdvanceFiltersCreatedBy(false)
                                    if (item.id === 'ALL') {

                                        proceedParams({ created_tasks_by: item.id, created_company: 'ALL', created_designation_id: 'ALL', created_department_id: 'ALL', created_emp_id: '' })
                                        createdCompany.onChange(TASK_COMPANY_FILTER)

                                    }
                                    else {

                                        proceedParams({ created_tasks_by: item.id, created_company: '', created_designation_id: 'ALL', created_department_id: 'ALL', created_emp_id: '' })
                                        createdCompany.onChange(TASK_COMPANY_FILTER)
                                    }
                                }

                                filteredTaskCreated.onChange(item)
                                setAdvanceFilter(true)
                            }}
                        />
                    </div>

                    <div className="col-3">
                        <DropDown
                            className="form-control-sm"
                            heading={translate("common.taskStatus")}
                            data={TASK_STATUS_LIST}
                            selected={taskStatus.value}
                            onChange={(item) => {
                                taskStatus.onChange(item)
                                proceedParams({ task_status: item.id })
                            }}
                        />
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <DropDown
                            className="form-control-sm"
                            heading={translate("common.Priority")}
                            data={TASK_PRIORITY_LIST}
                            selected={taskPriority.value}
                            onChange={(item) => {
                                taskPriority.onChange(item)
                                proceedParams({ priority: item.id })
                            }}
                        />
                    </div>

                    <div className='col mt-4 pt-1'>

                        <Checkbox text={translate('common.includeSubtask')!} defaultChecked={includeSubTask} onCheckChange={(checked) => {
                            proceedParams({ include_subtask: checked })
                            setIncludeSubTask(checked)
                        }} />
                        {/* </div> */}
                    </div>

                </div>

            </div>
            {advanceFiltersAssignedTo && <div>

                <div className='row'>
                    <div className='text-black h5 col'>ASSIGNED TO</div>

                </div>
                <div className='row mt-2'>

                    {modifiedCompany && <div className="col-lg-3 col-md-3 col-sm-12">
                        <DropDown
                            className="form-control-sm"
                            heading={translate("common.company")}
                            data={getDropDownCompanyDisplayData(modifiedCompany)}
                            selected={company.value}
                            onChange={(item) => {
                                company.onChange(item)
                                proceedParams({ assigned_company: item.id, assigned_department_id: 'ALL', assigned_designation_id: 'ALL', assigned_emp_id: '' })
                                department.onChange(TASK_FILTER_ALL)
                                designation.onChange(TASK_FILTER_ALL)
                                setSelectedAssignedUserId('')


                            }}
                        />
                    </div>
                    }
                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <DropDown
                            className="form-control-sm"
                            heading={translate("common.department")}
                            data={getDropDownDisplayData(modifiedAssignedDepartment)}
                            selected={department.value}
                            onChange={(item) => {

                                console.log('department,"ddddd')
                                department.onChange(item)
                                proceedParams({ assigned_department_id: item.id, assigned_emp_id: '' })
                                setSelectedAssignedUserId('')

                            }}
                        />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <DropDown
                            className="form-control-sm"
                            heading={translate("auth.designation")}
                            data={getDropDownDisplayData(modifiedAssignedDesignation)}
                            selected={designation.value}
                            onChange={(item) => {
                                console.log('designation,"ddddd')
                                designation.onChange(item)
                                proceedParams({ assigned_designation_id: item.id, assigned_emp_id: '' })
                                setSelectedAssignedUserId('')

                            }}
                        />
                    </div>

                    {
                        assignedEmployee && assignedEmployee.length > 0 &&
                        <div className="col-lg-3 col-md-3 col-sm-12">

                            <AutoComplete
                                className="form-control-sm"
                                variant={'custom'}
                                heading={translate("common.user")!}
                                data={getDropDownCompanyUser(assignedEmployee)}
                                selected={selectedAssignedUserId}
                                placeHolder={'search user...'}
                                onChange={(item) => {
                                    setSelectedAssignedUserId(item)
                                    proceedParams({ assigned_emp_id: item.id })
                                }}
                            />
                        </div>
                    }

                </div>
            </div>
            }

            {advanceFiltersCreatedBy && <div>

                <div className='row'>
                    <div className='text-black h5 col'>CREATED BY</div>

                </div>
                <div className='row mt-2'>
                    {modifiedCompany && <div className="col-lg-3 col-md-3 col-sm-12">
                        <DropDown
                            className="form-control-sm"
                            heading={translate("common.company")}
                            data={getDropDownCompanyDisplayData(modifiedCompany)}
                            selected={createdCompany.value}
                            onChange={(item) => {


                                createdCompany.onChange(item)

                                // getCreateDesignation(item?.id)
                                // getCreateDepartment(item?.id)
                                proceedParams({ created_company: item.id, created_department_id: 'ALL', created_designation_id: 'ALL', created_emp_id: '' })
                                createdDepartmentList.onChange(TASK_FILTER_ALL)
                                createdDesignationList.onChange(TASK_FILTER_ALL)
                                setSelectedCreatedUserId('')
                            }}
                        />
                    </div>
                    }

                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <DropDown
                            className="form-control-sm"
                            heading={translate("common.department")}
                            data={getDropDownDisplayData(modifiedCreateDepartment)}
                            selected={createdDepartmentList.value}
                            onChange={(item) => {

                                createdDepartmentList.onChange(item)

                                proceedParams({ created_department_id: item.id, created_emp_id: '' })
                                setSelectedCreatedUserId('')

                            }}
                        />
                    </div>


                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <DropDown
                            className="form-control-sm"
                            heading={translate("auth.designation")}
                            data={getDropDownDisplayData(modifiedCreateDesignation)}
                            selected={createdDesignationList.value}
                            onChange={(item) => {
                                createdDesignationList.onChange(item)

                                proceedParams({ created_designation_id: item.id, created_emp_id: '' })
                                setSelectedCreatedUserId('')

                            }}
                        />
                    </div>

                    {
                        createdEmployee && createdEmployee.length > 0 &&
                        <div className="col-lg-3 col-md-3 col-sm-12">

                            <AutoComplete
                                className="form-control-sm"
                                variant={'custom'}
                                heading={translate("common.user")!}
                                data={getDropDownCompanyUser(createdEmployee)}
                                selected={selectedCreatedUserId}
                                placeHolder={'search user...'}
                                onChange={(item) => {
                                    setSelectedCreatedUserId(item)

                                    proceedParams({ created_emp_id: item.id })


                                }}
                            />
                        </div>
                    }



                </div>


            </div>
            }

        </>
    )
}

export { TaskFilters }