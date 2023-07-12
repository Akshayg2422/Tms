
import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { EmployeeGroupsProps } from './interfaces'
import { Card, Divider, NoDataFound, H, SearchInput, Button, Modal, Image, Spinner } from '@Components'
import { addGroupUser, getGroupsEmployees, getTokenByUser, selectedUserChats, selectedVcDetails } from '@Redux'
import { TGU, getArrayFromArrayOfObject, } from '@Utils';
import {  useLoader, useModal, useNavigation, useWindowDimensions } from '@Hooks';
import {  GroupEmployeeList } from '@Modules'
import { translate } from '@I18n'
import { icons } from '@Assets';
import { ROUTES } from '@Routes';



function GroupEmployees({ groupCode, otherParams }: EmployeeGroupsProps) {
    const dispatch = useDispatch()
    const { groupEmployees, dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
    const {  user_details,  } = dashboardDetails || ''
    const { goTo } = useNavigation()
    const [loading, setLoading] = useState(false)
    const addUserModal = useModal(false);
    const [taggedUsers, setTaggedUsers] = useState([])
    const [defaultSelectedUsers, setDefaultSelectedUser] = useState<any>([])
    const loginLoader = useLoader(false)
    const { height } = useWindowDimensions()


    useEffect(() => {
        getGroupEmployees()

    }, [groupCode])

    const getGroupEmployees = (q: string = '') => {
        setLoading(true)
        const params = {
            group_id: groupCode,
            ...(otherParams && { ...otherParams }),
            q,

        }
        if (groupCode) {
            loginLoader.show()

            dispatch(
                getGroupsEmployees({
                    params,
                    onSuccess: (response) => () => {
                        const selectedUsers = response.details
                        loginLoader.hide()
                        if (selectedUsers && selectedUsers.length > 0) {
                            setDefaultSelectedUser(selectedUsers)
                        }
                        setLoading(false)
                    },
                    onError: () => () => {
                        setLoading(false)
                        loginLoader.hide()
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
        loginLoader.show()

        dispatch(
            addGroupUser({
                params,
                onSuccess: (response) => () => {
                    addUserModal.hide()
                    getGroupEmployees()
                    loginLoader.hide()
                },
                onError: () => () => {
                    loginLoader.hide()
                }


            })
        )

    }

    return (
        <>

            <Card style={{
                height: height - 93,
                display: 'flex',
                flexDirection: 'column-reverse',
            }}
                className={'overflow-auto overflow-hide'}>
                <div className='row'>
                    <div className='mx--1'>
                        <span className="h4 col-3">{'Others'}</span>
                    </div>
                    <div className='col-6 my--1 p-0'>
                        <SearchInput onSearch={(search) => {
                            getGroupEmployees(search)
                        }} />
                    </div>
                    <div className='col-1'>
                        <Button className={'text-white'} text={translate("common.add")} size='sm' onClick={() => {
                            addUserModal.show()
                        }} />
                    </div>
                </div>

                <div className=' col overflow-auto overflow-hide mt-1 mx--3' style={{ maxHeight: '80vh' }}>
                    {
                        loading && (
                            <div className='d-flex justify-content-center align-item-center' style={{ marginTop: '200px' }}>
                                <Spinner />
                            </div>
                        )
                    }

                    {!loading && <div className='mt-3 '>
                        {
                            groupEmployees && groupEmployees.length > 0 ? groupEmployees.map((el: any, index: number) => {
                                const { name, mobile_number, designation, department, id } = el
                                if (user_details?.id !== id) {
                                    return (
                                        <>
                                            <div >
                                                <div className='align-items-center'>
                                                    <div className='row  justify-content-center align-items-center'>
                                                        <div className='col pt-1'>
                                                            <H
                                                                tag={'h4'}
                                                                text={name}
                                                            />
                                                        </div>
                                                        <div className='mr-3 pointer'
                                                            onClick={() => {

                                                                dispatch(selectedVcDetails(el))
                                                                dispatch( selectedUserChats(el))

                                                               
                                                                goTo(ROUTES['user-company-module']['individual-chat'], false)
                                                                
                                                            }}
                                                        >
                                                            <Image src={icons.Comments} width={17} height={17} />
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
                                        </>
                                    )
                                }
                            }) : <div className='pt-6 mt-5'>
                                <NoDataFound type={'text'} />
                            </div>
                        }
                    </div>}
                </div>
            </Card >

            {
                /**
                 * Tag User
                 */
            }

            <Modal Modal fade={false} isOpen={addUserModal.visible} onClose={addUserModal.hide}>
                <GroupEmployeeList selection={'multiple'}
                    defaultSelect={defaultSelectedUsers}
                    selectedCode={groupCode}
                    onSelected={(users) => {
                        const taggedUserIds = getArrayFromArrayOfObject(users, 'id')
                        setTaggedUsers(taggedUserIds)

                    }} />
                <div className="pt-3 mr-2 text-right">
                    <Button
                        size={'sm'}
                        loading={loginLoader.loader}
                        text={translate("common.submit")}
                        onClick={() => {
                            addGroupUsers({ event_type: TGU, tagged_users: taggedUsers })
                        }} />
                </div>
            </Modal >

        </>
    )
}
export { GroupEmployees }
