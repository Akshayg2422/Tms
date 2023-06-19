import React, { useEffect, useState } from 'react'
import { TaskFilterProps } from './interfaces'
import { DropDown, Checkbox, SearchInput, MenuBar, AutoComplete } from '@Components'
import { translate } from '@I18n'
import { TASK_FILTER_LIST, TASK_STATUS_LIST, TASK_PRIORITY_LIST, getObjectFromArrayByKey, getDropDownCompanyDisplayData, getDropDownDisplayData, getDropDownCompanyUser, TASK_FILTER_LIST_CREATED_BY, } from '@Utils'
import { useDropDown, useInput } from '@Hooks'
import { getAssociatedCompaniesL, getDepartments, getDesignations, getEmployees, setTaskParams } from '@Redux'
import { useDispatch, useSelector } from 'react-redux'
import { icons } from '@Assets'


const FILTER_MENU = [
    {
        id: 0, name: translate("auth.basic"), icon: icons.basic,
    }
]

function TaskFilter({ onParams }: TaskFilterProps) {


    const { taskParams } = useSelector((state: any) => state.TaskReducer);
    const { associatedCompaniesL, departments, designations, employees,dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
    const dispatch = useDispatch()
    // const filteredTaskAssigned = useDropDown(TASK_FILTER_LIST[2]);
    // const filteredTaskCreated = useDropDown(TASK_FILTER_LIST[2]);
    const filteredTask = useDropDown(TASK_FILTER_LIST[2]);
    const taskStatus = useDropDown(TASK_STATUS_LIST[2]);
    const taskPriority = useDropDown(TASK_PRIORITY_LIST[0]);
    const company = useDropDown({})
    const department = useDropDown({ id: 'ALL', name: 'All' })
    const designation = useDropDown({ id: 'ALL', name: 'All' })
    const [includeSubTask, setIncludeSubTask] = useState(false)
    const [params, setParams] = useState({})
    const [advanceFilter, setAdvanceFilter] = useState(false)
    const [advanceFilterAssigned, setAdvanceFilterAssigned] = useState(false)
    const [advanceFilterCreated, setAdvanceFilterCreated] = useState(false)
    const search = useInput('')
    const modifiedDepartment = departments ? [{ id: 'ALL', name: 'All' }, ...departments] : [{ id: 'ALL', name: 'All' }]
    const modifiedDesignation = designations ? [{ id: 'ALL', name: 'All' }, ...designations] : [{ id: 'ALL', name: 'All' }]
    const modifiedCompany = associatedCompaniesL && associatedCompaniesL.length > 0 && [{ id: '', display_name: '𝗦𝗘𝗟𝗙', name: 'self' }, ...associatedCompaniesL]
    const [selectedUserId, setSelectedUserId] = useState<any>();
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

  

    useEffect(() => {
        if( company.value||department.value.id !=='ALL'||designation.value.id!=='ALL')
        getCompanyEmployeeApi()
    }, [designation.value, department.value, company.value,])

    function getCompanyEmployeeApi() {

        const params = {
            branch_id:company.value.id?company.value.id: dashboardDetails?.permission_details?.branch_id,
            ...(department && { department_id: department?.value?.id }),
            ...(designation && { designation_id: designation?.value?.id }),
            per_page_count: -1,
        };
        console.log('pppp', params)

        dispatch(
            getEmployees({
                params,
                onSuccess: (response: any) => () => {

                },
                onError: () => () => { },
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


    const getDesignation = (items: any) => {

        if (items?.id) {
            const params = {
                branch_id: items.id
            };

            dispatch(
                getDesignations({
                    params,
                    onSuccess: (response) => () => {
                        // let designations: any = [];
                    },
                    onError: () => () => {
                        // setDesignations([])
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


                    },
                    onError: (error) => () => {
                        // setDepartments([])

                    },
                })
            );
        }


    }


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
                <div className='col-12'>
                    {/* <div className='row'> */}
                        <div className='col-auto  d-flex align-items-end justify-content-end'>
                            <Checkbox text={translate('common.includeSubtask')!} defaultChecked={includeSubTask} onCheckChange={(checked) => {
                                proceedParams({ include_subtask: checked })
                                setIncludeSubTask(checked)
                            }} />
                        </div>

                    {/* </div> */}


                </div>


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
                            selected={filteredTask .value}
                            data={TASK_FILTER_LIST}
                            onChange={(item) => {
                                // filteredTask.onChange(item)
                                // proceedParams({ tasks_by: item.id })

                                if(item.id!=='advanceAssigned'){
                                    filteredTask .onChange(item)
                                proceedParams({ tasks_by: item.id })
                                }
                                else{
                                    setAdvanceFilter(false)
                                    setAdvanceFilterAssigned(true)
                            company.onChange({})
                            proceedParams({ company: '', designation_id: 'ALL', department_id: 'ALL' ,  emp_id: ''})

                                }
                                
                            }}
                        />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 ">
                        <DropDown
                            className="form-control-sm"
                            heading={'Created By'}
                            selected={filteredTask.value}
                            data={TASK_FILTER_LIST_CREATED_BY}
                            onChange={(item) => {
                                // filteredTask.onChange(item)

                                if(item.id!=='advanceCreated'){
                                    filteredTask.onChange(item)
                                proceedParams({ tasks_by: item.id })
                                }
                                
                                else{
                                    setAdvanceFilter(true)
                                    setAdvanceFilterCreated(true)
                            company.onChange({})
                            proceedParams({ company: '', designation_id: 'ALL', department_id: 'ALL' ,  employ_id: ''})

                                }
                                
                            }}
                        />
                    </div>

                    <div className="col">
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

                    <div className='col-auto mr--5 mt-4'>
                    <div className="d-flex align-items-center justify-content-center">
                    <MenuBar toggleIcon={icons.equalizer} menuData={FILTER_MENU} onClick={(el) => {
                        // if (el.id === FILTER_MENU[1].id) {
                        //     setAdvanceFilter(true)
                        //     // setDepartments([])
                        //     // setDesignations([])

                        //     proceedParams({ company: '', designation_id: 'ALL', department_id: 'ALL' ,  emp_id: ''})

                        //     company.onChange({})
                        // } 
                        // else {
                            setAdvanceFilter(false)
                            // setDepartments([])
                            // setDesignations([])
                            setAdvanceFilterCreated(false)
                            setAdvanceFilterAssigned(false)
                            company.onChange({})
                            proceedParams({ company: '', designation_id: 'ALL', department_id: 'ALL' ,  emp_id: ''})
                        // }
                    }} />
                </div>

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
                {/* <div className="d-flex align-items-center justify-content-center">
                    <MenuBar toggleIcon={icons.equalizer} menuData={FILTER_MENU} onClick={(el) => {
                        if (el.id === FILTER_MENU[1].id) {
                            setAdvanceFilter(true)
                            // setDepartments([])
                            // setDesignations([])

                            proceedParams({ company: '', designation_id: 'ALL', department_id: 'ALL' ,  employ_id: ''})

                            company.onChange({})
                        } else {
                            setAdvanceFilter(false)
                            // setDepartments([])
                            // setDesignations([])
                            company.onChange({})
                            proceedParams({ company: '', designation_id: 'ALL', department_id: 'ALL' ,  employ_id: ''})
                        }
                    }} />
                </div> */}
            </div>
          {advanceFilterAssigned &&  <div>
            
            <div className='row'>
                        <div className='text-black h3 col'>Assigned To</div>

                </div>
            

            <div className='row mt-2'>
                {/* <div className='col-auto  d-flex align-items-center justify-content-center'>
                    <Checkbox text={translate('common.includeSubtask')!} defaultChecked={includeSubTask} onCheckChange={(checked) => {
                        proceedParams({ include_subtask: checked })
                        setIncludeSubTask(checked)
                    }} />
                </div> */}
                { modifiedCompany && <div className="col-lg-3 col-md-3 col-sm-12">
                    <DropDown
                        className="form-control-sm"
                        heading={translate("common.company")}
                        data={getDropDownCompanyDisplayData(modifiedCompany)}
                        selected={company.value}
                        onChange={(item) => {

                            company.onChange(item)
                            getDesignation(item)
                            getDepartment(item)
                            proceedParams({ company: item.id, designation_id: 'ALL', department_id: 'ALL',  emp_id: '' })
                            department.onChange({ id: 'ALL', text: 'All' })
                            designation.onChange({ id: 'ALL', text: 'All' })
                            setSelectedUserId('')


                        }}
                    />
                </div>
                }

                 <div className="col-lg-3 col-md-3 col-sm-12">
                    <DropDown
                        className="form-control-sm"
                        heading={translate("common.department")}
                        data={getDropDownDisplayData(modifiedDepartment)}
                        selected={department.value}
                        onChange={(item) => {
                            department.onChange(item)
                            proceedParams({ department_id: item.id ,  emp_id: ''})
                            setSelectedUserId('')

                        }}
                    />
                </div>
                

                <div className="col-lg-3 col-md-3 col-sm-12">
                    <DropDown
                        className="form-control-sm"
                        heading={translate("auth.designation")}
                        data={getDropDownDisplayData(modifiedDesignation)}
                        selected={designation.value}
                        onChange={(item) => {
                            designation.onChange(item)
                            proceedParams({ designation_id: item.id ,  emp_id: ''})
                            setSelectedUserId('')

                        }}
                    />
                </div>
                

                {
                    employees && employees.length > 0 &&
                    <div  className="col-lg-3 col-md-3 col-sm-12">

                    <AutoComplete
                       className="form-control-sm"
                        variant={'custom'}
                        heading={translate("common.user")!}
                        data={getDropDownCompanyUser(employees)}
                        selected={selectedUserId}
                        onChange={(item) => {
                            setSelectedUserId(item)
                            proceedParams({ emp_id: item.id })
                            console.log(item, "iiittemmmncb j")

                        }}
                    />
                    </div>
                }



            </div>
            

            </div>
}
{advanceFilterCreated &&  <div>
            
            <div className='row'>
                        <div className='text-black h3 col'>Created by</div>

                </div>
            <div className='row mt-2'>
                { modifiedCompany && <div className="col-lg-3 col-md-3 col-sm-12">
                    <DropDown
                        className="form-control-sm"
                        heading={translate("common.company")}
                        data={getDropDownCompanyDisplayData(modifiedCompany)}
                        selected={company.value}
                        onChange={(item) => {

                            company.onChange(item)
                            getDesignation(item)
                            getDepartment(item)
                            proceedParams({ company: item.id, designation_id: 'ALL', department_id: 'ALL',  emp_id: '' })
                            department.onChange({ id: 'ALL', text: 'All' })
                            designation.onChange({ id: 'ALL', text: 'All' })
                            setSelectedUserId('')


                        }}
                    />
                </div>
                }

                 <div className="col-lg-3 col-md-3 col-sm-12">
                    <DropDown
                        className="form-control-sm"
                        heading={translate("common.department")}
                        data={getDropDownDisplayData(modifiedDepartment)}
                        selected={department.value}
                        onChange={(item) => {
                            department.onChange(item)
                            proceedParams({ department_id: item.id ,  emp_id: ''})
                            setSelectedUserId('')

                        }}
                    />
                </div>
                

                <div className="col-lg-3 col-md-3 col-sm-12">
                    <DropDown
                        className="form-control-sm"
                        heading={translate("auth.designation")}
                        data={getDropDownDisplayData(modifiedDesignation)}
                        selected={designation.value}
                        onChange={(item) => {
                            designation.onChange(item)
                            proceedParams({ designation_id: item.id ,  emp_id: ''})
                            setSelectedUserId('')

                        }}
                    />
                </div>
                

                {
                    employees && employees.length > 0 &&
                    <div  className="col-lg-3 col-md-3 col-sm-12">

                    <AutoComplete
                       className="form-control-sm"
                        variant={'custom'}
                        heading={translate("common.user")!}
                        data={getDropDownCompanyUser(employees)}
                        selected={selectedUserId}
                        onChange={(item) => {
                            setSelectedUserId(item)
                            proceedParams({ emp_id: item.id })
                            console.log(item, "iiittemmmncb j")

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

export { TaskFilter }