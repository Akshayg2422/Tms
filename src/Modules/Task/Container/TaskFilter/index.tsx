import React, { useEffect, useState } from 'react'
import { TaskFilterProps } from './interfaces'
import { DropDown, Checkbox, SearchInput, MenuBar } from '@Components'
import { translate } from '@I18n'
import { TASK_FILTER_LIST, TASK_STATUS_LIST, TASK_PRIORITY_LIST, } from '@Utils'
import { useDropDown } from '@Hooks'
import { getAssociatedCompaniesL } from '@Redux'
import { useDispatch } from 'react-redux'
import { icons } from '@Assets'


const FILTER_MENU = [
    {
        id: 0, name: 'Basic', icon: icons.Equalizer,
    },
    {
        id: 1, name: 'Advance', icon: icons.Equalizer,
    }
]


function TaskFilter({ onParams }: TaskFilterProps) {

    const dispatch = useDispatch()
    const filteredTask = useDropDown(TASK_FILTER_LIST[2]);
    const taskStatus = useDropDown(TASK_STATUS_LIST[2]);
    const taskPriority = useDropDown(TASK_PRIORITY_LIST[0]);
    const company = useDropDown({})
    const [companies, setCompanies] = useState([])
    const [includeSubTask, setIncludeSubTask] = useState(false)
    const [params, setParams] = useState({})
    const [advanceFilter, setAdvanceFilter] = useState(false)


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
    }, []);


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
                <div className="col text-right">
                    <MenuBar toggleIcon={icons.Equalizer} menuData={FILTER_MENU} onClick={(el) => {
                        if (el.id === FILTER_MENU[1].id) {
                            setAdvanceFilter(true)
                        } else {
                            setAdvanceFilter(false)
                        }
                    }} />
                </div>
            </div>

            <div className="row mt-3 mb--3">
                <div className="col-lg-3  col-md-3 col-sm-12">
                    <SearchInput heading={'Code/Title'} onSearch={
                        (text) => {
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
                        heading={translate("common.ticketStatus")}
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

                {advanceFilter && <div className="col-lg-3 col-md-3 col-sm-12 mt--2">
                    <DropDown
                        className="form-control-sm"
                        heading={translate("common.company")}
                        data={companies}
                        selected={company.value}
                        onChange={(item) => {
                            company.onChange(item)
                        }}
                    />
                </div>
                }

                <div className="col pt-3">
                    <Checkbox text={'Include Subtask'} checked={includeSubTask} onCheckChange={(checked) => {
                        proceedParams({ include_subtask: checked })
                        setIncludeSubTask(checked)
                    }} />
                </div>

            </div>
        </>
    )
}

export { TaskFilter }