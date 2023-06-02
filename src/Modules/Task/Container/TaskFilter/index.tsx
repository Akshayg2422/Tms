import React, { useEffect, useState } from 'react'
import { TaskFilterProps } from './interfaces'
import { DropDown, Checkbox, SearchInput, MenuBar } from '@Components'
import { translate } from '@I18n'
import { TASK_FILTER_LIST, TASK_STATUS_LIST, TASK_PRIORITY_LIST, getObjectFromArrayByKey, } from '@Utils'
import { useDropDown, useInput } from '@Hooks'
import { getAssociatedCompaniesL, getDepartments, getDesignations, setTaskParams } from '@Redux'
import { useDispatch, useSelector } from 'react-redux'
import { icons } from '@Assets'


const FILTER_MENU = [
    {
        id: 0, name: 'Basic', icon: icons.basic,
    },
    {
        id: 1, name: 'Advance', icon: icons.advanceFilter,
    }
]


function TaskFilter({ onParams }: TaskFilterProps) {


    const { taskParams } = useSelector((state: any) => state.TaskReducer);


    const dispatch = useDispatch()
    const filteredTask = useDropDown(TASK_FILTER_LIST[2]);
    const taskStatus = useDropDown(TASK_STATUS_LIST[2]);
    const taskPriority = useDropDown(TASK_PRIORITY_LIST[0]);
    const company = useDropDown({})
    const department = useDropDown({})
    const designation = useDropDown({})
    const [departments, setDepartments] = useState([])
    const [designations, setDesignations] = useState([])
    const [companies, setCompanies] = useState([])
    const [includeSubTask, setIncludeSubTask] = useState(false)
    const [params, setParams] = useState({})
    const [advanceFilter, setAdvanceFilter] = useState(false)
    const search = useInput('')
    const modifiedDepartment=[{id:'ALL',text:'All'},...departments]
    const modifiedDesignation=[{id:'ALL',text:'All'},...designations]



    useEffect(() => {

        if (taskParams) {
            const { q_many, task_status, priority, tasks_by, include_subtask } = taskParams
            search.set(q_many)
            filteredTask.set(getObjectFromArrayByKey(TASK_FILTER_LIST, 'id', tasks_by))
            taskStatus.set(getObjectFromArrayByKey(TASK_STATUS_LIST, 'id', task_status))
            taskPriority.set(getObjectFromArrayByKey(TASK_PRIORITY_LIST, 'id', priority))
            setIncludeSubTask(include_subtask)
        }

    }, [taskParams, companies])


    useEffect(() => {
        const params = { q: '' };
        if (advanceFilter) {
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
        }
    }, [advanceFilter]);

 
    const getDesignation = (items: any) => {

        if (items?.id) {
            const params = {
                branch_id: items.id
            };

            dispatch(
                getDesignations({
                    params,
                    onSuccess: (response) => () => {
                        let designations: any = [];
                        const designation = response.details.data
                        designation.forEach((item) => {
                            designations = [...designations, { ...item, text: item.name }]
                        })
                        setDesignations(designations)
                    },
                    onError: () => () => {
                        setDesignations([])
                    },
                })

            );


        }
    }

    const getDepartment = (items: any) => {

        if (items?.id) {
            const params = {
                branch_id: items.id
            };
            dispatch(
                getDepartments({
                    params,
                    onSuccess: (response: any) => () => {

                        let departments: any = [];
                        const department = response.details.data
                        department.forEach((item) => {
                            departments = [...departments, { ...item, text: item.name }]
                        })

                        setDepartments(departments)
                    },
                    onError: (error) => () => {
                        setDepartments([])

                    },
                })
            );
        }


    }

    console.log(departments,"ddepartments")


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
                            selected={filteredTask.value}
                            data={TASK_FILTER_LIST}
                            onChange={(item) => {
                                filteredTask.onChange(item)
                                proceedParams({ tasks_by: item.id })
                            }}
                        />
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-12">
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
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <MenuBar toggleIcon={icons.equalizer} menuData={FILTER_MENU} onClick={(el) => {
                        if (el.id === FILTER_MENU[1].id) {
                            setAdvanceFilter(true)
                            setDepartments([])
                            setDesignations([])
                            company.onChange({})
                        } else {
                            setAdvanceFilter(false)
                            setDepartments([])
                            setDesignations([])
                            company.onChange({})
                        }
                    }} />
                </div>
            </div>
            <div className='row mt-2'>
                <div className='col-auto  d-flex align-items-center justify-content-center'>
                    <Checkbox text={translate('common.includeSubtask')!} defaultChecked={includeSubTask} onCheckChange={(checked) => {
                        proceedParams({ include_subtask: checked })
                        setIncludeSubTask(checked)
                    }} />
                </div>
                {advanceFilter && <div className="col-lg-3 col-md-3 col-sm-12">
                    <DropDown
                        className="form-control-sm"
                        heading={translate("common.company")}
                        data={companies}
                        selected={company.value}
                        onChange={(item) => {
                            company.onChange(item)
                            proceedParams({ company: item.id })
                            getDesignation(item)
                            getDepartment(item)
                        }}
                    />
                </div>
                }

                {departments.length > 0 && <div className="col-lg-3 col-md-3 col-sm-12">
                    <DropDown
                        className="form-control-sm"
                        heading={translate("common.department")}
                        data={modifiedDepartment}
                        selected={department.value}
                        onChange={(item) => {
                            department.onChange(item)
                            proceedParams({ department_id: item.id })

                        }}
                    />
                </div>
                }

                {designations.length > 0 && <div className="col-lg-3 col-md-3 col-sm-12">
                    <DropDown
                        className="form-control-sm"
                        heading={translate("auth.designation")}
                        data={modifiedDesignation}
                        selected={designation.value}
                        onChange={(item) => {
                            designation.onChange(item)
                            proceedParams({ designation_id: item.id })

                        }}
                    />
                </div>
                }
            </div>

        </>
    )
}

export { TaskFilter }