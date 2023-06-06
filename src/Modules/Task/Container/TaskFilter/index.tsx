import React, { useEffect, useState } from 'react'
import { TaskFilterProps } from './interfaces'
import { DropDown, Checkbox, SearchInput, MenuBar } from '@Components'
import { translate } from '@I18n'
import { TASK_FILTER_LIST, TASK_STATUS_LIST, TASK_PRIORITY_LIST, getObjectFromArrayByKey, getDropDownCompanyDisplayData, } from '@Utils'
import { useDropDown, useInput } from '@Hooks'
import { getAssociatedCompaniesL, getDepartments, getDesignations, setTaskParams } from '@Redux'
import { useDispatch, useSelector } from 'react-redux'
import { icons } from '@Assets'


const FILTER_MENU = [
    {
        id: 0, name: translate("auth.basic"), icon: icons.basic,
    },
    {
        id: 1, name: translate("auth.advance"), icon: icons.advanceFilter,
    }
]


function TaskFilter({ onParams }: TaskFilterProps) {


    const { taskParams } = useSelector((state: any) => state.TaskReducer);
    const { associatedCompaniesL } = useSelector((state: any) => state.UserCompanyReducer);
    


    const dispatch = useDispatch()
    const filteredTask = useDropDown(TASK_FILTER_LIST[2]);
    const taskStatus = useDropDown(TASK_STATUS_LIST[2]);
    const taskPriority = useDropDown(TASK_PRIORITY_LIST[0]);
    const company = useDropDown({})
    const department = useDropDown({id:'ALL',text:'All'})
    const designation = useDropDown({id:'ALL',text:'All'})
    const [departments, setDepartments] = useState([])
    const [designations, setDesignations] = useState([])
    const [companies, setCompanies] = useState([])
    const [includeSubTask, setIncludeSubTask] = useState(false)
    const [params, setParams] = useState({})
    const [advanceFilter, setAdvanceFilter] = useState(false)
    const search = useInput('')
    const modifiedDepartment=departments &&[{id:'ALL',text:'All'},...departments]
    const modifiedDesignation=designations && [{id:'ALL',text:'All'},...designations]
    const modifiedCompany=associatedCompaniesL && associatedCompaniesL.length>0 &&[{ id: '',display_name: '𝗦𝗘𝗟𝗙', name: 'self' },...associatedCompaniesL ]


    useEffect(() => {

        if (taskParams) {
            const { q_many, task_status, priority, tasks_by, include_subtask } = taskParams
            search.set(q_many)
            filteredTask.set(getObjectFromArrayByKey(TASK_FILTER_LIST, 'id', tasks_by))
            taskStatus.set(getObjectFromArrayByKey(TASK_STATUS_LIST, 'id', task_status))
            taskPriority.set(getObjectFromArrayByKey(TASK_PRIORITY_LIST, 'id', priority))
            setIncludeSubTask(include_subtask)
        }

    }, [taskParams])
    console.log(company?.value,"ccccccccc")


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
                            designations = [...designations, {...item, text: item.name }]
                        })
                        setDesignations(designations)
                        // proceedParams({ designation_id: 'ALL' })
                   
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
                        // proceedParams({ department_id: 'ALL'})
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
        console.log(object,"oppp")
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
                {advanceFilter && modifiedCompany &&<div className="col-lg-3 col-md-3 col-sm-12">
                    <DropDown
                        className="form-control-sm"
                        heading={translate("common.company")}
                        data={getDropDownCompanyDisplayData(modifiedCompany)}
                        selected={company.value}
                        onChange={(item) => {
                            console.log(item,"ppttt")
                            company.onChange(item)
                            getDesignation(item)
                            getDepartment(item)
                            proceedParams({ company :item.id })
                            // proceedParams({ designation_id: 'ALL' })
                            // proceedParams({ department_id: 'ALL'})
                            
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