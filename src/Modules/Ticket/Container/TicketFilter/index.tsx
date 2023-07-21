import React, { useEffect, useState } from 'react'
import { TicketFilterProps } from './interface'
import { DropDown, Checkbox, SearchInput, MenuBar, AutoComplete } from '@Components'
import { translate } from '@I18n'
import { TICKET_FILTER_LIST, TICKET_STATUS_LIST, TICKET_PRIORITY_LIST, getDropDownDisplayData, getDropDownCompanyDisplayData, getDropDownCompanyUser, getObjectFromArrayByKey, } from '@Utils'
import { useDropDown } from '@Hooks'
import { getAssociatedCompaniesL, getDepartments, getDesignations, selectedTicketParams } from '@Redux'
import { useDispatch, useSelector } from 'react-redux'
import { icons } from '@Assets'


const FILTER_MENU = [
    {
        id: 0, name: translate('auth.basic'), icon: icons.basic,
    },
    {
        id: 1, name: translate('auth.advance'), icon: icons.advanceFilter,
    }
]


function TicketFilter({ onParams }: TicketFilterProps) {

    const { departments, designations, associatedCompaniesL ,dashboardDetails,employees} = useSelector((state: any) => state.UserCompanyReducer);

    const dispatch = useDispatch()
    
    const {ticketParams} = useSelector((state: any) => state.TicketReducer);
    

    const filteredTicket = useDropDown(TICKET_FILTER_LIST[0]);
    const ticketStatus = useDropDown(TICKET_STATUS_LIST[0]);
    const ticketPriority = useDropDown(TICKET_PRIORITY_LIST[0]);
    const companies = useDropDown({})
    const department = useDropDown({ id: 'ALL', name: 'All' })
    const designation = useDropDown({ id: 'ALL', name: 'All' })
    const [params, setParams] = useState({})
    const [advanceFilter, setAdvanceFilter] = useState(false)
    const DEFAULT_COMPANY_PARAMS={ company:'', designation_id: 'ALL', department_id: 'ALL' }
    const modifiedDepartment = departments ? [{ id: 'ALL', name: 'All' }, ...departments] : [{ id: 'ALL', name: 'All' }]
    const modifiedDesignation = designations ? [{ id: 'ALL', name: 'All' }, ...designations] : [{ id: 'ALL', name: 'All' }]
    const modifiedCompany = associatedCompaniesL && associatedCompaniesL.length > 0 && [{ id: '', display_name: '𝗦𝗘𝗟𝗙', name: 'self' }, ...associatedCompaniesL]
 

    useEffect(() => {
        getAssociatedCompanies()
    }, []);

    const getAssociatedCompanies =()=>{
        const params = { q: '' };

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


    const getDesignation = (items: any) => {

        if (items?.id) {
            const params = {
                branch_id: items.id
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


                    },
                })
            );
        }


    }

  
    function proceedParams(object: any) {
       
        const updatedParams = { ...params, ...object }
        console.log(updatedParams,"updatedParams")

        if (onParams) {
            onParams(updatedParams)
        }
        setParams(updatedParams)
dispatch(
    selectedTicketParams(updatedParams)
)        
    }


    useEffect(() => {
        updateField();
    }, [ticketParams])

    const updateField =()=>{
        const {tickets_by,ticket_status, priority,company,department_id, designation_id}=ticketParams
       
        filteredTicket.set(getObjectFromArrayByKey(TICKET_FILTER_LIST, 'id', tickets_by))
        ticketStatus.set(getObjectFromArrayByKey(TICKET_STATUS_LIST, 'id', ticket_status))
        ticketPriority.set(getObjectFromArrayByKey(TICKET_PRIORITY_LIST, 'id', priority))
       companies.set(getObjectFromArrayByKey(modifiedCompany, 'id', company))
        department.set(getObjectFromArrayByKey( modifiedDepartment, 'id',department_id))
        designation.set(getObjectFromArrayByKey( modifiedDesignation, 'id',designation_id))


    }


    return (
        < >
            <div className="row">
                <div className="row col ">
                    <div className="col-lg-3  col-md-3 col-sm-12">
                        <SearchInput heading={translate("common.codeTitle")!} onSearch={
                            (text) => {
                                proceedParams({ q_many: text })
                            }
                        } />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 ">
                        <DropDown
                            className="form-control-sm"
                            heading={translate("common.assignedTo")}
                            selected={filteredTicket.value}
                            data={TICKET_FILTER_LIST}
                            onChange={(item) => {
                                filteredTicket.onChange(item)
                                proceedParams({ tickets_by: item.id })
                            }}
                        />
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <DropDown
                            className="form-control-sm"
                            heading={translate("common.ticket Status")}
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
                </div>
                <div className="d-flex align-items-center justify-content-center mt-2">

                    <MenuBar toggleIcon={icons.Equalizer} menuData={FILTER_MENU} onClick={(el) => {
                        if (el.id === FILTER_MENU[1].id) {
                            setAdvanceFilter(true)
                         console.log(DEFAULT_COMPANY_PARAMS,"DEFAULT_COMPANY_PARAMS")
                            companies.onChange({})
                            proceedParams({...ticketParams,...DEFAULT_COMPANY_PARAMS})

                        } else {
                            setAdvanceFilter(false)
                          
                            companies.onChange({})

                        }
                    }} />

                </div>

            </div>

            <div className="row mt-2">

                {advanceFilter && <div className="col-lg-3 col-md-3 col-sm-12 mt--2">
                    <DropDown
                        className="form-control-sm"
                        heading={translate("common.company")}
                        data={getDropDownCompanyDisplayData(modifiedCompany)}
                        selected={companies.value}
                        onChange={(item) => {
                            companies.onChange(item)
                            getDesignation(item)
                            getDepartment(item)
                            proceedParams({ ...DEFAULT_COMPANY_PARAMS,company: item.id })
                            department.onChange({ id: 'ALL', text: 'All' })
                            designation.onChange({ id: 'ALL', text: 'All' })
                        }}
                    />
                </div>
                }

                {advanceFilter && <div className="col-lg-3 col-md-3 col-sm-12 mt--2">
                    <DropDown
                        className="form-control-sm"
                        heading={translate("common.department")}
                        data={getDropDownDisplayData(modifiedDepartment)}
                        selected={department.value}
                        onChange={(item) => {
                            department.onChange(item)
                            proceedParams({ department_id: item.id })

                        }}
                    />
                </div>
                }

                {advanceFilter && <div className="col-lg-3 col-md-3 col-sm-12 mt--2">
                    <DropDown
                        className="form-control-sm"
                        heading={translate("auth.designation")}
                        data={getDropDownDisplayData(modifiedDesignation)}
                        selected={designation.value}
                        onChange={(item) => {
                            designation.onChange(item)
                            proceedParams({ designation_id: item.id })

                        }}
                    />
                </div>
                }


{/* { advanceFilter && employees.length > 0 &&
                        <div className="col-lg-3 col-md-3 col-sm-12">

                            <AutoComplete
                                className="form-control-sm"
                                variant={'custom'}
                                heading={translate("common.user")!}
                                data={getDropDownCompanyUser(employees)}
                                selected={selectedAssignedUserId}
                                placeHolder={'search user...'}
                                onChange={(item) => {
                                    setSelectedAssignedUserId(item)
                                    proceedParams({ assigned_emp_id: item.id })
                                }}
                            />
                        </div>
                    } */}
            </div>
        </>
    )
}

export { TicketFilter }