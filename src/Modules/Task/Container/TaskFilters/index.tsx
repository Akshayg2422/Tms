import { AutoComplete, Checkbox, DropDown, SearchInput } from '@Components'
import { useDropDown, useInput } from '@Hooks'
import { translate } from '@I18n'
import { setTaskParams, getAssociatedCompaniesL, getDepartments, getDesignations, getEmployees, setAssignedDepartment, setAssignedDesignation, setAssignedEmployee, setCreatedDepartment, setCreatedDesignation, setCreatedEmployee } from '@Redux'
import {
    TASK_COMPANY_FILTER,
    TASK_FILTER_ALL,
    TASK_FILTER_LIST,
    TASK_FILTER_LIST_CREATED_BY,
    TASK_PRIORITY_LIST,
    TASK_STATUS_LIST,
    getDropDownCompanyDisplayData,
    getDropDownCompanyUser,
    getDropDownDisplayData,
    getObjectFromArrayByKey
} from '@Utils'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TaskFilterProps } from './interfaces'

function TaskFilters({ }: TaskFilterProps) {

    const dispatch = useDispatch()

    const ASSIGNED = 1
    const CREATED = 2


    const { taskParams } = useSelector((state: any) => state.TaskReducer);
    const { associatedCompaniesL, dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
    const ASSIGN_TO_DEFAULT_PARAMS = { assigned_company: 'ALL', assigned_designation_id: 'ALL', assigned_department_id: 'ALL', assigned_emp_id: '' }
    const CREATED_BY_TO_DEFAULT_PARAMS = { created_company: 'ALL', created_designation_id: 'ALL', created_department_id: 'ALL', created_emp_id: '' }
    const DEFAULT_COMPANY = { id: dashboardDetails?.permission_details?.branch_id, display_name: '𝗦𝗘𝗟𝗙', name: 'self' }
    const DEFAULT_DATA = { id: 'ALL', display_name: 'All', name: 'All' }
    const DEFAULT_EMPLOYEE = { id: '', display_name: 'All', name: 'All' }


    const search = useInput('')
    const assignTo = useDropDown({});
    const createdBy = useDropDown({});
    const taskStatus = useDropDown({});
    const taskPriority = useDropDown({});
    const [includeSubTask, setIncludeSubTask] = useState(false)





    /**
     * Advance  Assign
     */

    const [assignedToDepartments, setAssignedToDepartments] = useState([])
    const [assignedToDesignations, setAssignedToDesignations] = useState([])
    const [assignedToEmployees, setAssignedToEmployees] = useState([])


    const assignToCompany = useDropDown({})
    const assignToDepartment = useDropDown({})
    const assignToDesignation = useDropDown({})
    const assignToEmployee = useDropDown({})


    /**
 * Advance Create
 */

    const [createByDepartments, setCreateByDepartments] = useState([])
    const [createByDesignations, setCreatedByDesignations] = useState([])
    const [createByEmployees, setCreatedByEmployees] = useState([])

    const createByCompany = useDropDown({})
    const createdByDepartment = useDropDown({})
    const createdByDesignation = useDropDown({})
    const createdByEmployee = useDropDown({})



    useEffect(() => {
        getAssociatedCompaniesApiHandler()
    }, [])

    useEffect(() => {
        if (assignToCompany?.value.id) {
            getDepartmentsApiHandler(assignToCompany?.value.id, ASSIGNED)
        }
    }, [assignToCompany.value.id])

    useEffect(() => {
        if (assignToCompany?.value.id && assignToDepartment?.value?.id) {
            getDesignationApiHandler(assignToCompany?.value.id, assignToDepartment?.value?.id, ASSIGNED)
        }
    }, [assignToDepartment?.value?.id, assignToCompany?.value.id])

    useEffect(() => {
        if (assignToCompany?.value.id && assignToDepartment?.value?.id && assignToDesignation?.value?.id) {
            const params = {
                branch_id: assignToCompany?.value.id,
                department_id: assignToDepartment?.value?.id,
                designation_id: assignToDesignation?.value?.id
            }
            getCompanyEmployeeApiHandler(params, ASSIGNED)
        }
    }, [assignToDepartment?.value?.id, assignToCompany?.value.id, assignToDesignation?.value?.id])



    useEffect(() => {
        if (createByCompany?.value.id) {
            getDepartmentsApiHandler(createByCompany?.value.id, CREATED)
        }
    }, [createByCompany.value.id])

    useEffect(() => {
        if (createByCompany?.value.id && createdByDepartment?.value?.id) {
            getDesignationApiHandler(createByCompany?.value.id, createdByDepartment?.value?.id, CREATED)
        }
    }, [createdByDepartment?.value?.id, createByCompany?.value.id])

    useEffect(() => {
        if (createByCompany?.value.id && createdByDepartment?.value?.id && createdByDesignation?.value?.id) {
            const params = {
                branch_id: createByCompany?.value.id,
                department_id: createdByDepartment?.value?.id,
                designation_id: createdByDesignation?.value?.id
            }
            getCompanyEmployeeApiHandler(params, CREATED)
        }
    }, [createdByDesignation?.value?.id, createByCompany?.value.id, createdByDepartment?.value.id])




    useEffect(() => {
        updateField();
    }, [taskParams,
        associatedCompaniesL,
        assignedToDepartments,
        assignedToDepartments,
        createByDepartments,
        createByDesignations,
        createByEmployees,
        assignedToEmployees
    ])


    function getDepartmentsApiHandler(branch_id: string, type: number) {
        const params = {
            branch_id,
            per_page_count: - 1,
        };

        dispatch(
            getDepartments({
                params,
                onSuccess: (response: any) => () => {
                    if (type === ASSIGNED) {
                        setAssignedToDepartments([DEFAULT_DATA, ...response?.details] as never)
                    } else {
                        setCreateByDepartments([DEFAULT_DATA, ...response?.details] as never)
                    }
                },
                onError: () => () => {
                },
            })
        )
    }

    function getDesignationApiHandler(branch_id: string, department_id: string, type: number) {

        const params = {
            branch_id,
            per_page_count: -1,
            department_id,
        };

        dispatch(
            getDesignations({
                params,
                onSuccess: (response) => () => {
                    if (type === ASSIGNED) {
                        setAssignedToDesignations([DEFAULT_DATA, ...response?.details] as never)
                    } else {
                        setCreatedByDesignations([DEFAULT_DATA, ...response?.details] as never)
                    }
                },
                onError: () => () => {

                },
            })

        );

    }

    function getCompanyEmployeeApiHandler(updatedParams: any, type: number) {

        const params = {
            ...updatedParams,
            per_page_count: -1,
        };


        dispatch(
            getEmployees({
                params,
                onSuccess: (response: any) => () => {
                    if (type === ASSIGNED) {
                        setAssignedToEmployees([DEFAULT_EMPLOYEE, ...response?.details] as never)
                    } else {
                        setCreatedByEmployees([DEFAULT_EMPLOYEE, ...response?.details] as never)
                    }
                },
                onError: () => () => { },
            })
        );
    }

    function updateField() {
        const { assigned_tasks_by, created_tasks_by, q_many, task_status, priority, include_subtask, assigned_company, created_company, assigned_department_id, assigned_designation_id, created_department_id, created_designation_id, assigned_emp_id, created_emp_id } = taskParams;

        assignTo.set(getObjectFromArrayByKey(TASK_FILTER_LIST, 'id', assigned_tasks_by));
        createdBy.set(getObjectFromArrayByKey(TASK_FILTER_LIST_CREATED_BY, 'id', created_tasks_by));

        search.set(q_many);
        taskStatus.set(getObjectFromArrayByKey(TASK_STATUS_LIST, 'id', task_status));
        taskPriority.set(getObjectFromArrayByKey(TASK_PRIORITY_LIST, 'id', priority));

        setIncludeSubTask(include_subtask);

        if (associatedCompaniesL && associatedCompaniesL.length > 0 && assigned_tasks_by === 'advance') {
            assignToCompany.onChange(getObjectFromArrayByKey([DEFAULT_COMPANY, ...associatedCompaniesL], 'id', assigned_company === 'ALL' ? dashboardDetails?.permission_details?.branch_id : assigned_company))
            assignToDepartment.set(DEFAULT_DATA)

            if (assignedToDepartments && assignedToDepartments.length > 0) {
                assignToDepartment.set(getObjectFromArrayByKey(assignedToDepartments, 'id', assigned_department_id))
                assignToDesignation.set(DEFAULT_DATA)

                if (assignedToDesignations && assignedToDesignations.length > 0) {
                    assignToDesignation.set(getObjectFromArrayByKey(assignedToDesignations, 'id', assigned_designation_id))
                }
            }

            if (assignedToEmployees && assignedToEmployees.length > 0) {
                console.log('came-----' + assignedToEmployees.length);

                console.log(getObjectFromArrayByKey(assignedToEmployees, 'id', assigned_emp_id));


                assignToEmployee.set(getObjectFromArrayByKey(assignedToEmployees, 'id', assigned_emp_id))
            }

        }


        if (associatedCompaniesL && associatedCompaniesL.length > 0 && created_tasks_by === 'advance') {
            createByCompany.onChange(getObjectFromArrayByKey([DEFAULT_COMPANY, ...associatedCompaniesL], 'id', created_company === 'ALL' ? dashboardDetails?.permission_details?.branch_id : created_company))
            createdByDepartment.set(DEFAULT_DATA)

            if (createByDepartments && createByDepartments.length > 0) {
                createdByDepartment.set(getObjectFromArrayByKey(createByDepartments, 'id', created_department_id))
                createdByDesignation.set(DEFAULT_DATA)

                if (createByDesignations && createByDesignations.length > 0) {
                    createdByDesignation.set(getObjectFromArrayByKey(createByDesignations, 'id', created_designation_id))
                }
            }

            if (createByEmployees && createByEmployees.length > 0) {
                createdByEmployee.set(getObjectFromArrayByKey(createByEmployees, 'id', created_emp_id))
            }

        }
    }
    function proceedParams(object: any) {
        const updatedParams = { ...taskParams, ...object }
        dispatch(setTaskParams(updatedParams))
    }

    function getAssociatedCompaniesApiHandler() {
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

    }

    console.log('came');



    return (
        <>
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
                            selected={assignTo.value}
                            data={TASK_FILTER_LIST}
                            onChange={(item) => {
                                const { id } = item;
                                assignTo.set(item)
                                proceedParams({ ...ASSIGN_TO_DEFAULT_PARAMS, assigned_tasks_by: id })
                            }}
                        />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 ">
                        <DropDown
                            className="form-control-sm"
                            heading={'Created By'}
                            selected={createdBy.value}
                            data={TASK_FILTER_LIST_CREATED_BY}
                            onChange={(item) => {
                                const { id } = item;
                                createdBy.set(item)
                                proceedParams({ ...CREATED_BY_TO_DEFAULT_PARAMS, created_tasks_by: id, });
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
                    </div>

                </div>

            </div>
            {taskParams?.assigned_tasks_by === 'advance' && <div>

                <div className='row'>
                    <div className='text-black h5 col'>ASSIGNED TO</div>

                </div>
                <div className='row mt-2'>
                    {
                        associatedCompaniesL && associatedCompaniesL.length > 0 &&
                        <>
                            <div className="col-lg-3 col-md-3 col-sm-12">
                                <DropDown
                                    className="form-control-sm"
                                    heading={translate("common.company")}
                                    data={getDropDownCompanyDisplayData([DEFAULT_COMPANY, ...associatedCompaniesL])}
                                    selected={assignToCompany.value}
                                    onChange={(item) => {
                                        assignToCompany.onChange(item)
                                        proceedParams({ ...ASSIGN_TO_DEFAULT_PARAMS, assigned_company: item.id })
                                    }}
                                />
                            </div>
                        </>
                    }
                    {assignedToDepartments && assignedToDepartments.length > 0 && <div className="col-lg-3 col-md-3 col-sm-12">
                        <DropDown
                            className="form-control-sm"
                            heading={translate("common.department")}
                            data={getDropDownDisplayData(assignedToDepartments)}
                            selected={assignToDepartment.value}
                            onChange={(item: any) => {
                                console.log('came----->department');
                                assignToDepartment.onChange(item);
                                proceedParams({ assigned_department_id: item.id, assigned_designation_id: "ALL", assigned_emp_id: '' })
                            }}
                        />
                    </div>
                    }

                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <DropDown
                            className="form-control-sm"
                            heading={translate("auth.designation")}
                            data={getDropDownDisplayData(assignedToDesignations)}
                            selected={assignToDesignation.value}
                            onChange={(item) => {

                                assignToDesignation.onChange(item)
                                proceedParams({ assigned_designation_id: item.id, assigned_emp_id: '' })
                            }}
                        />
                    </div>

                    {
                        assignedToEmployees && assignedToEmployees.length > 0 &&
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <AutoComplete
                                className="form-control-sm"
                                variant={'custom'}
                                heading={translate("common.user")!}
                                data={getDropDownCompanyUser(assignedToEmployees)}
                                selected={assignToEmployee.value}
                                placeHolder={'search user...'}
                                onChange={(item) => {
                                    assignToEmployee.onChange(item)
                                    proceedParams({ assigned_emp_id: item.id })
                                }}
                            />
                        </div>
                    }

                </div>
            </div>
            }

            {taskParams?.created_tasks_by === 'advance' && <div>

                <div className='row'>
                    <div className='text-black h5 col'>CREATED BY</div>
                </div>

                <div className='row mt-2'>
                    {
                        associatedCompaniesL && associatedCompaniesL.length > 0 &&
                        <>
                            <div className="col-lg-3 col-md-3 col-sm-12">
                                <DropDown
                                    className="form-control-sm"
                                    heading={translate("common.company")}
                                    data={getDropDownCompanyDisplayData([DEFAULT_COMPANY, ...associatedCompaniesL])}
                                    selected={createByCompany.value}
                                    onChange={(item) => {
                                        createByCompany.onChange(item)
                                        proceedParams({ ...CREATED_BY_TO_DEFAULT_PARAMS, created_company: item.id })
                                    }}
                                />
                            </div>
                        </>
                    }
                    {createByDepartments && createByDepartments.length > 0 && <div className="col-lg-3 col-md-3 col-sm-12">
                        <DropDown
                            className="form-control-sm"
                            heading={translate("common.department")}
                            data={getDropDownDisplayData(createByDepartments)}
                            selected={createdByDepartment.value}
                            onChange={(item: any) => {
                                createdByDepartment.onChange(item);
                                proceedParams({ created_department_id: item.id, created_designation_id: "ALL", created_emp_id: '' })
                            }}
                        />
                    </div>
                    }

                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <DropDown
                            className="form-control-sm"
                            heading={translate("auth.designation")}
                            data={getDropDownDisplayData(createByDesignations)}
                            selected={createdByDesignation.value}
                            onChange={(item) => {
                                createdByDesignation.onChange(item)
                                proceedParams({ created_designation_id: item.id, created_emp_id: '' })
                            }}
                        />
                    </div>

                    {
                        createByEmployees && createByEmployees.length > 0 &&
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <AutoComplete
                                className="form-control-sm"
                                variant={'custom'}
                                heading={translate("common.user")!}
                                data={getDropDownCompanyUser(createByEmployees)}
                                selected={createdByEmployee.value}
                                placeHolder={'search user...'}
                                onChange={(item) => {
                                    createdByEmployee.set(item)
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
