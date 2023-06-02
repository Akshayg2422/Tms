
import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { EmployeeGroupsProps } from './interfaces'
import { Card, Divider, NoDataFound, H, SearchInput, Button, Modal, Image } from '@Components'
import { addGroupUser, getGroupsEmployees } from '@Redux'
import { EVS, TASK_STATUS_LIST, TGU, getArrayFromArrayOfObject, getObjectFromArrayByKey } from '@Utils';
import { useDropDown, useModal } from '@Hooks';
import { Employees, GroupEmployeeList } from '@Modules'
import { translate } from '@I18n'
import { icons } from '@Assets';


function GroupEmployees({ groupCode, height, otherParams }: EmployeeGroupsProps) {
    const dispatch = useDispatch()
    const { groupEmployees } = useSelector((state: any) => state.UserCompanyReducer);



    useEffect(() => {
        getGroupEmployees()
    }, [Employees])

    const addUserModal = useModal(false);
    const [taggedUsers, setTaggedUsers] = useState([])
    const [reassignUser, setReassignUser] = useState<any>({})
    const [defaultSelectedUsers, setDefaultSelectedUser] = useState<any>([])

    // const status = useDropDown(getObjectFromArrayByKey(TASK_STATUS_LIST, 'id', selectedTask?.task_status));

    const getGroupEmployees = (q: string = '') => {

        const params = {
            group_id: groupCode,
            ...(otherParams && { ...otherParams }),
            q,
        }
        if (groupCode) {
            dispatch(
                getGroupsEmployees({
                    params,
                    onSuccess: (response) => () => {
                        const selectedUsers = response.details
                        if (selectedUsers && selectedUsers.length > 0) {
                            setDefaultSelectedUser(selectedUsers)
                        }
                    },
                    onError: () => () => {

                    }
                })
            )
        }
    }


    const addGroupUsers = (addUsers: any) => {

        const params = {
            group_id: groupCode,
            users_id: addUsers.tagged_users
        }

        dispatch(
            addGroupUser({
                params,
                onSuccess: (response) => () => {
                    addUserModal.hide()
                    getGroupEmployees()
                },
                onError: () => () => {

                }


            })
        )

    }



    return (
        <>

            <Card className={'h-100'}>
                <div className='row'>
                    <div className='mx--1'>
                        <span className="h4 col-3">{'Members'}</span>
                    </div>
                    <div className='col-6 my--1 p-0'>
                        <SearchInput onSearch={(search) => {
                            getGroupEmployees(search)
                        }} />
                    </div>
                    <div className='col-1'>
                        <Button className={'text-white'} text={'Add'} size='sm' onClick={() => {
                            addUserModal.show()
                        }} />
                    </div>
                </div>

                <div className='h-100 overflow-auto overflow-hide pb-3'>

                    <div className='mt-3'>
                        {
                            groupEmployees && groupEmployees.length > 0 ? groupEmployees.map((el: any, index: number) => {
                                const { name, mobile_number, designation, department, } = el
                                return (
                                    <div >
                                        <div className='align-items-center'>
                                            <div className='row align-item-center justify-content-center'>
                                                <div className='col pt-1'>
                                                    <H
                                                        tag={'h4'}
                                                        text={name}
                                                    />
                                                </div>

                                            </div>
                                            <div className={'row col mt--2'}>
                                                <div className={'h6 mb-0 text-uppercase text-muted '} >{department ? department : '-'}</div>
                                                <div className='text-muted mt--1'><Image src={icons.verticalLine} height={12} width={7} /></div>
                                                <div className={'h6 mb-0 text-uppercase text-muted'}>{designation ? designation : '-'}</div>
                                            </div>
                                        </div>
                                        <div className={'mx--2 my--2'}>
                                            {index !== groupEmployees.length - 1 && <Divider space={'3'} />}
                                        </div>
                                    </div>
                                )
                            }) : <div className='pt-6 mt-5'>
                                <NoDataFound type={'text'} text={'No data found'} />
                            </div>
                        }
                    </div>
                </div>
            </Card >

            {
                /**
                 * Tag User
                 */
            }

            <Modal fade={false} isOpen={addUserModal.visible} onClose={addUserModal.hide} style={{ maxHeight: '90vh' }}>
                <GroupEmployeeList selection={'multiple'}
                    defaultSelect={defaultSelectedUsers}
                    onSelected={(users) => {
                        const taggedUserIds = getArrayFromArrayOfObject(users, 'id')
                        setTaggedUsers(taggedUserIds)
                    }} />
                <div className="pt-3 mr-2 text-right">
                    <Button
                        size={'sm'}
                        text={translate("common.submit")}
                        onClick={() => {
                            addGroupUsers({ event_type: TGU, tagged_users: taggedUsers })
                        }} />
                </div>
            </Modal>

        </>
    )
}
export { GroupEmployees }
