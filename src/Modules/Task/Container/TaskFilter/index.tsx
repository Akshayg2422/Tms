import React, { useEffect, useState } from 'react'
import { TaskFilterProps } from './interfaces'
import { DropDown, Checkbox, SearchInput } from '@Components'
import { translate } from '@I18n'
import { TASK_FILTER_LIST, TASK_STATUS_LIST, TASK_PRIORITY_LIST, } from '@Utils'
import { useInput, useDropDown } from '@Hooks'
import { getAssociatedCompanyBranch } from '@Redux'
import { useDispatch } from 'react-redux'
import { log } from 'console'


function TaskFilter({ }: TaskFilterProps) {

    const search = useInput('');
    const filteredTask = useDropDown(TASK_FILTER_LIST[2]);
    const taskStatus = useDropDown(TASK_STATUS_LIST[2]);
    const taskPriority = useDropDown({});
    const company = useDropDown({})
    const dispatch = useDispatch()
    const [companies, setCompanies] = useState([])


    useEffect(() => {
        console.log('came');

        const params = { q: '' };
        dispatch(
            getAssociatedCompanyBranch({
                params,
                onSuccess: (response) => () => {
                    console.log(JSON.stringify(response));
                    let modifiedCompany = []
                    modifiedCompany = [...modifiedCompany,]

                    // const modi
                    // response.details.map
                },
                onError: () => () => {
                },
            })
        );
    }, []);


    return (
        < >
            {/* <div className="row">
                <div className="pl-4">
                    <UncontrolledDropdown>
                        <DropdownToggle
                            color=""
                            size="sm"
                            className="text-light"
                        >
                            <Image src={icons.Equalizer} className="bg-white" variant={'avatar'} size={'xs'} />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                                href="#pablo"
                                onClick={() => {

                                    setBasicTag(true)
                                    setAdvanceTag(false)
                                }

                                }
                            >
                                <div className={basicTag ? 'text-primary' : 'text-black'}>
                                    {translate('auth.basic')}
                                </div>
                            </DropdownItem>

                            <DropdownItem
                                href="#pablo"
                                onClick={() => {
                                    setAdvanceTag(true)
                                    setBasicTag(false)
                                }
                                }
                            >
                                <div className={advanceTag ? 'text-primary' : 'text-black'}>
                                    {translate('auth.advance')}
                                </div>
                            </DropdownItem>

                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            </div> */}


            <div className="row mt-3 mb--3">
                <div className="col-lg-3  col-md-3 col-sm-12">
                    <SearchInput heading={'Code/Title'} onSearch={(text) => {
                        console.log(text);
                    }} />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 ">
                    <DropDown
                        className="form-control-sm"
                        heading={translate("common.assignedTo")}
                        selected={filteredTask.value}
                        data={TASK_FILTER_LIST}
                        onChange={(item) => {
                            filteredTask.onChange(item)
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
                        }}
                    />
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 mt--2">
                    <DropDown
                        className="form-control-sm   "
                        heading={translate("common.company")}
                        data={companies}
                        selected={company.value}
                        onChange={(item) => {
                            company.onChange(item)
                        }}
                    />
                </div>

                <div className="col pt-3">
                    <Checkbox id={'0'} onClick={() => { }} text={'Include Subtask'} />
                </div>

            </div>
        </>
    )
}

export { TaskFilter }