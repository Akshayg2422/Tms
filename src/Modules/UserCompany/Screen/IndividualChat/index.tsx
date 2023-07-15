import { icons } from '@Assets'
import { AutoComplete, Button, Chat, Image, NoDataFound, Send, Spinner } from '@Components'
import { useDynamicHeight, useLoader } from '@Hooks'
import { fetchChatEmployeeList, fetchChatMessage, getEmployees, getTokenByUser, handleOneToOneVcNoti, postChatMessage, selectedVcDetails, setRefreshPrivateChat, setSelectedPrivateUser } from '@Redux'
import { SERVER } from '@Services'
import { INITIAL_PAGE, convertToUpperCase, getDropDownCompanyUser } from '@Utils'
import { useEffect, useState } from 'react'
import 'react-photo-view/dist/react-photo-view.css'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, CardHeader } from 'reactstrap'
import { VideoConference } from '../../Container'

function IndividualChat() {

    const { dashboardDetails, oneToOneChat, employees, chatMessageCurrentPages, selectedPrivateUser, chatEmployees, chatMessages, refreshPrivateChat } = useSelector(
        (state: any) => state.UserCompanyReducer
    );
    const { user_details } = dashboardDetails || {}
    const dynamicHeight: any = useDynamicHeight()
    const [selectedUserId, setSelectedUserId] = useState<any>();
    const dispatch = useDispatch()
    const [showAutoComplete, setAutoComplete] = useState<any>(false)






    const loader = useLoader(false);
    const messageLoader = useLoader(false);
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        getCompanyEmployeeApi()
    }, [])

    useEffect(() => {
        getChatEmployeeList()
    }, [])


    useEffect(() => {
        if (selectedPrivateUser) {
            getChatMessage(INITIAL_PAGE)
        }
    }, [selectedPrivateUser, refreshPrivateChat])

    const getChatEmployeeList = () => {

        const params = {
            q_many: '',
            per_page_count: -1
        }

        loader.show();

        dispatch(
            fetchChatEmployeeList({
                params,
                onSuccess: (res: any) => () => {
                    loader.hide();
                    const userList = res.details;
                    if (!selectedPrivateUser && userList && userList.length > 0) {
                        dispatch(setSelectedPrivateUser(userList[0]));
                    }
                },
                onError: (error: string) => () => {
                    loader.hide();
                },
            }))
    }


    function getCompanyEmployeeApi() {

        const params = {
            per_page_count: -1,
        };

        dispatch(
            getEmployees({
                params,
                onSuccess: (response: any) => () => {

                },
                onError: () => () => { },
            })
        );
    }

    const addChatMessageApiHandler = (params: any) => {
        loader.show();
        dispatch(postChatMessage({
            params,
            onSuccess: () => () => {
                loader.hide();
                setSuccess(true)
                dispatch(setRefreshPrivateChat())
            },
            onError: () => () => {
                console.log('error');

                loader.hide();
            },
        }))
    }



    const getChatMessage = (page_number: number) => {
        const params = {
            emp_id: selectedPrivateUser?.id,
            page_number
        }
        messageLoader.show();
        dispatch(fetchChatMessage({
            params,
            onSuccess: () => () => {
                messageLoader.hide()
            },
            onError: () => () => {
                messageLoader.hide()
            },
        }))
    }


    const getUserToken = () => {
        dispatch(selectedVcDetails(selectedPrivateUser.id))
        const params = {
            id: selectedPrivateUser.id,
            user_name: user_details.name,
            email_id: user_details.email,
        }
        dispatch(getTokenByUser({
            params,
            onSuccess: (success: any) => () => {
                dispatch(handleOneToOneVcNoti(success?.message))
            },
            onError: (error: string) => () => { },
        }))
    }
    return (
        <div className='container-fluid pt-4'>
            <div>
                <div className='row'>
                    {
                        oneToOneChat && <div className='col-sm-8'>
                            <VideoConference
                                iframeHeight={'91.5vh'}
                                chatCall={true}
                            />
                        </div>
                    }

                    {
                        <div className={`${!oneToOneChat ? 'col-sm-8' : ' col-sm-4'} p-0 m-0 `}>
                            <Card
                                style={{
                                    height: dynamicHeight.dynamicHeight - 30
                                }}>
                                {
                                    selectedPrivateUser && <CardHeader>
                                        <div className=''>
                                            <div className='row justify-content-between d-flex mx-2'>
                                                <div className='h3'>
                                                    <strong>{selectedPrivateUser?.name}</strong>
                                                </div>

                                            </div>
                                        </div>
                                    </CardHeader>
                                }

                                <CardBody>
                                    {
                                        selectedPrivateUser &&
                                        <Chat
                                            isSuccess={success}
                                            height={dynamicHeight.dynamicHeight}
                                            variant={'private'}
                                            data={chatMessages}
                                            hasMore={chatMessageCurrentPages !== -1}
                                            onNext={() => {
                                                if (chatMessageCurrentPages !== -1) {
                                                    getChatMessage(chatMessageCurrentPages)
                                                }
                                            }}
                                            onDelete={(item) => {
                                                const params = {
                                                    id: item?.id,
                                                    is_deleted: true
                                                }
                                                setSuccess(false)
                                                addChatMessageApiHandler(params)

                                            }}
                                            onEdit={() => { }}
                                        />
                                    }
                                    <div className='my-3'>
                                        <Send
                                            isSuccess={success}
                                            loading={loader.loader}
                                            onMessagePress={(message) => {
                                                setSuccess(false);
                                                const params = {
                                                    receiver_by: selectedPrivateUser.id,
                                                    ...message,
                                                };



                                                addChatMessageApiHandler(params);

                                            }}
                                            onAttachPress={response => {
                                                setSuccess(false);
                                                const params = {
                                                    receiver_by: selectedPrivateUser?.id,
                                                    chat_attachments: [response.attachments],
                                                    ...response.type
                                                };

                                                addChatMessageApiHandler(params);

                                            }}
                                            onVideoPress={() => {
                                                getUserToken()
                                            }}
                                        />

                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    }

                    {!oneToOneChat &&
                        <div className='col-sm-4'>
                            <Card
                                style={{
                                    height: dynamicHeight.dynamicHeight - 30,
                                }}
                            >
                                <CardHeader className=''>
                                    <div className='mt--2'>
                                        <div className='row justify-content-between mx-1'>
                                            <h3>{"Members"}</h3>
                                            <div>
                                                <Button
                                                    size='sm'
                                                    text={showAutoComplete ? 'Close' : 'Add'}
                                                    onClick={() => {
                                                        setAutoComplete(!showAutoComplete)
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {showAutoComplete &&
                                            <div className='mb--1 mt-2'>
                                                <AutoComplete
                                                    variant={'custom'}
                                                    inputType={'Infinity'}
                                                    data={getDropDownCompanyUser(employees)}
                                                    selected={selectedUserId}
                                                    onChange={(item) => {
                                                        dispatch(setSelectedPrivateUser({ name: item.text, ...item }))
                                                    }}
                                                />
                                            </div>
                                        }
                                    </div>
                                </CardHeader>


                                <div
                                    className={`overflow-auto overflow-hide`}>
                                    <div>
                                        {chatEmployees && chatEmployees?.length > 0 &&
                                            chatEmployees?.map((item: any) => {
                                                return (
                                                    <div className={`pointer overflow-auto overflow-hide `}
                                                        onClick={() => {
                                                            dispatch(setSelectedPrivateUser(item))
                                                        }}
                                                    >
                                                        <div className={`mx- ${item?.id === selectedPrivateUser?.id ? 'bg-lighter ' : ''} py-2 px-2`}>
                                                            <div className={`pl--2`}>
                                                                <div className={``}>
                                                                    <div className="row align-items-center ml-2">
                                                                        <Image
                                                                            variant="rounded"
                                                                            className=""
                                                                            size="sm"
                                                                            src={item?.profile_image ? SERVER + item?.profile_image : SERVER + item?.profile_pic}
                                                                            alt="avatar 1"
                                                                        />
                                                                        <small className='ml-3 '>
                                                                            <h5 className={`${item?.id === selectedPrivateUser?.id ? 'text-black' : 'text-muted'} mb-0 h5`}>
                                                                                {convertToUpperCase(item?.name)}
                                                                            </h5>
                                                                            <div className={'row ml-0  pb-2'}>
                                                                                <div className={`h6 mb-0 text-uppercase  `}
                                                                                    style={{
                                                                                        color: item?.id === selectedPrivateUser?.id ? '#424242' : '#8898aa'
                                                                                    }}
                                                                                >{item?.department ? item?.department?.name : '-'}</div>
                                                                                <div className={` mt--1`}><Image src={icons.verticalLine} height={12} width={7} /></div>
                                                                                <div
                                                                                    className={`h6 mb-0 text-uppercase `}
                                                                                    style={{
                                                                                        color: item?.id === selectedPrivateUser?.id ? '#424242' : '#8898aa'
                                                                                    }}
                                                                                >{item?.designation ? item?.designation?.name : '-'}</div>
                                                                            </div>
                                                                        </small>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div >
                                                    </div>
                                                )
                                            })
                                        }
                                        {loader.loader && <div className='d-flex align-items-center justify-content-center' style={{ height: "90vh" }}><Spinner /></div>}
                                        {!loader.loader && chatEmployees?.length <= 0 && <div className='d-flex align-items-center justify-content-center' style={{ height: "90vh" }}><NoDataFound /></div>}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    }
                </div >
            </ div >
        </div>

    )
}

export { IndividualChat }
