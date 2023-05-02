import React, { useEffect, useState } from 'react'
import { TicketFilterProps } from './interface'
import { DropDown, Checkbox, SearchInput, MenuBar } from '@Components'
import { translate } from '@I18n'
import { TICKET_FILTER_LIST, TICKET_STATUS_LIST, TICKET_PRIORITY_LIST, } from '@Utils'
import { useDropDown } from '@Hooks'
import { getAssociatedCompaniesL, getDepartments, getDesignations } from '@Redux'
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


function TicketFilter({ onParams }: TicketFilterProps) {

    const dispatch = useDispatch()
    const filteredTickets = useDropDown(TICKET_FILTER_LIST[2]);
    const ticketStatus = useDropDown(TICKET_STATUS_LIST[2]);
    const ticketPriority = useDropDown(TICKET_PRIORITY_LIST[0]);
    const company = useDropDown({})
    const department = useDropDown({})
    const designation = useDropDown({})
    const [departments, setDepartments] = useState([])
    const [designations, setDesignations] = useState([])
    const [companies, setCompanies] = useState([])
    const [includeSubTicket, setIncludeSubTicket] = useState(false)
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
                            setDepartments([])
                            setDesignations([])
                            company.onChange({})

                        } else {
                            setAdvanceFilter(false)
                            company.onChange({})
                            setDepartments([])
                            setDesignations([])
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
                        selected={filteredTickets.value}
                        data={TICKET_FILTER_LIST}
                        onChange={(item) => {
                            filteredTickets.onChange(item)
                            proceedParams({ ticket_by: item.id })
                        }}
                    />
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12">
                    <DropDown
                        className="form-control-sm"
                        heading={translate("common.ticketStatus")}
                        data={TICKET_STATUS_LIST}
                        selected={ticketStatus.value}
                        onChange={(item) => {
                            ticketStatus.onChange(item)
                            proceedParams({ ticket_status: item.id })
                        }}
                    />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12">
                    <DropDown
                        className="form-control-sm"
                        heading={translate("common.Priority")}
                        data={TICKET_PRIORITY_LIST}
                        selected={ticketPriority.value}
                        onChange={(item) => {
                            ticketPriority.onChange(item)
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
                            getDesignation(item)
                            getDepartment(item)
                        }}
                    />
                </div>
                }

                {departments.length > 0 && <div className="col-lg-3 col-md-3 col-sm-12 mt--2">
                    <DropDown
                        className="form-control-sm"
                        heading={translate("common.department")}
                        data={departments}
                        selected={department.value}
                        onChange={(item) => {
                            department.onChange(item)
                            proceedParams({ department_id: item.id })

                        }}
                    />
                </div>
                }

                {designations.length > 0 && <div className="col-lg-3 col-md-3 col-sm-12 mt--2">
                    <DropDown
                        className="form-control-sm"
                        heading={translate("auth.designation")}
                        data={designations}
                        selected={designation.value}
                        onChange={(item) => {
                            designation.onChange(item)
                            proceedParams({ designation_id: item.id })

                        }}
                    />
                </div>
                }

                {/* <div className="col pt-3">
                    <Checkbox text={'Include Subtask'} checked={includeSubTicket} onCheckChange={(checked) => {
                        // proceedParams({ include_subtask: checked })
                        setIncludeSubTicket(checked)
                    }} />
                </div> */}

            </div>
        </>
    )
}

export { TicketFilter }