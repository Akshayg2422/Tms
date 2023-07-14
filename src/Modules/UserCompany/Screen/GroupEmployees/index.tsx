
import { icons } from '@Assets';
import { Button, Card, Divider, H, Image, Modal, NoDataFound, SearchInput, Spinner } from '@Components';
import { useLoader, useModal, useNavigation, useWindowDimensions } from '@Hooks';
import { translate } from '@I18n';
import { EmployeesV1 } from '@Modules';
import { addGroupUser, getGroupsEmployees, selectedVcDetails } from '@Redux';
import { ROUTES } from '@Routes';
import { TGU, getArrayFromArrayOfObject } from '@Utils';
import { useEffect, useState, } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { EmployeeGroupsProps } from './interfaces';


function GroupEmployees({ }: EmployeeGroupsProps) {
    const dispatch = useDispatch()
    const { groupEmployees, selectedGroupChat, } = useSelector((state: any) => state.UserCompanyReducer);

    const { goTo } = useNavigation()

    useEffect(() => {
        getGroupEmployees()
    }, [selectedGroupChat])

    const addUserModal = useModal(false);
    const [selectedUsers, setSelectedUsers] = useState([])
    const [defaultSelectedUsers, setDefaultSelectedUser] = useState<any>([])

    const loader = useLoader(false)
    const addUserLoader = useLoader(false)


    const { height } = useWindowDimensions()

    const getGroupEmployees = (q: string = '') => {
        loader.show()
        const params = {
            group_id: selectedGroupChat?.id,
            q,
        }
        dispatch(
            getGroupsEmployees({
                params,
                onSuccess: (response) => () => {
                    const selectedUsers = response.details
                    if (selectedUsers && selectedUsers.length > 0) {
                        setDefaultSelectedUser(selectedUsers)
                    }
                    loader.hide()
                },
                onError: () => () => {
                    loader.hide()
                }
            })
        )

    }

    const addGroupUsersApiHandler = (addUsers: any) => {

        const params = {
            group_id: selectedGroupChat?.id,
            users_id: addUsers.tagged_users
        }


        addUserLoader.show()

        dispatch(
            addGroupUser({
                params,
                onSuccess: () => () => {
                    addUserModal.hide()
                    getGroupEmployees()
                    addUserLoader.hide()
                },
                onError: () => () => {
                    addUserLoader.hide()
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
                <div className='row '>
                    <div className='   col-3'>
                        <span className="h4 ml--2">{'Others'}</span>
                    </div>
                    <div className='d-flex col-9  justify-content-end'>
                        <div className='row align-items-center'>
                            <div className='col-10 '>
                            <SearchInput onSearch={(search) => {
                                getGroupEmployees(search)
                            }} 
                            />

                            </div>
                        
                            <div className='ml--3  col-2'>
                                <Button className={'text-white'} text={translate("common.add")} size='sm' onClick={() => {
                                    addUserModal.show()
                                }} />
                            </div>
                        </div>
                    </div>

                </div>

                <div className='col overflow-auto overflow-hide mt-1 mx--3' style={{ maxHeight: '80vh' }}>
                    <div className='mt-4 mb-3'>
                        {
                            groupEmployees && groupEmployees.length > 0 && groupEmployees.map((el: any, index: number) => {
                                const { name, designation, department, id } = el

                                return (
                                    <>
                                        <div >
                                            <div className='row justify-space-between align-items-center'>
                                                <div className='col'>
                                                    <H
                                                        tag={'h4'}
                                                        text={name}
                                                    />
                                                    <div className={'row col mt--2'}>
                                                        <div className={'h6 mb-0 text-uppercase text-muted '} >{department ? department : '-'}</div>
                                                        <div className='text-muted mt--1'><Image src={icons.verticalLine} height={12} width={7} /></div>
                                                        <div className={'h6 mb-0 text-uppercase text-muted'}>{designation ? designation : '-'}</div>
                                                    </div>
                                                </div>
                                                <div className='pointer'
                                                    onClick={() => {
                                                        goTo(ROUTES['user-company-module']['individual-chat'], false)
                                                    }}>
                                                    <Image src={icons.Comments} width={18} height={18} />
                                                </div>

                                            </div>
                                            <div className={'mx--2'}>
                                                {index !== groupEmployees.length - 1 && <Divider space={'3'} />}
                                            </div>
                                        </div>
                                    </>
                                )

                            })
                        }
                        {loader.loader && (<Spinner />)
                        }
                        {!loader.loader && groupEmployees?.length <= 0 && <div className='pt-6 mt-5'> <NoDataFound type={'text'} /></div>}
                    </div>

                </div>
            </Card >

            {
                /**
                 * Tag User
                 */
            }

            <Modal fade={false} isOpen={addUserModal.visible} onClose={addUserModal.hide}>
                <EmployeesV1
                    selection={'multiple'}
                    defaultSelected={defaultSelectedUsers}
                    selectedCode={selectedGroupChat?.id}
                    onSelected={(users) => {
                        const userIds = getArrayFromArrayOfObject(users, 'id')
                        setSelectedUsers(userIds)

                    }} />

                <div className="pt-3 mr-2 text-right">
                    <Button
                        size={'sm'}
                        loading={addUserLoader.loader}
                        text={translate("common.submit")}
                        onClick={() => {
                            addGroupUsersApiHandler({ event_type: TGU, tagged_users: selectedUsers })
                        }} />
                </div>
            </Modal >

        </>
    )
}
export { GroupEmployees };

