import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { AutoComplete, Button, Image, ImagePicker, Input, Modal, NoRecordsFound, ProfileCard, Spinner, showToast } from '@Components'
import moment from 'moment'
import { CHAT_ATTACHMENT_RULES, CHAT_MESSAGE_RULES, INITIAL_PAGE, convertToUpperCase, getDisplayTimeFromMoment, getDropDownCompanyUser, getDropDownDisplayData, getPhoto, getValidateError, ifObjectExist, paginationHandler, validate, } from '@Utils'
import { fetchChatEmployeeList, fetchChatMessage, getEmployees, getTokenByUser, handleOneToOneChat, handleOneToOneVcNoti, postChatMessage, selectedUserChats, selectedVcDetails } from '@Redux'
import { SERVER } from '@Services'
import { icons } from '@Assets'
import { useDynamicHeight, useInput, useLoader, useModal, useNavigation, useWindowDimensions } from '@Hooks'
import { translate } from '@I18n'
import { VideoConference } from '../../Container'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import InfiniteScroll from 'react-infinite-scroll-component'

function IndividualChat() {
    const { dashboardDetails, oneToOneChat, employees, chatMessageCurrentPages,  refreshIndividualChatMessage, selectedUserChat, chatMessage } = useSelector(
        (state: any) => state.UserCompanyReducer
    );
    const { user_details } = dashboardDetails || ''

    const { taskDetails } = useSelector((state: any) => state.TaskReducer);

    const dynamicHeight: any = useDynamicHeight()
    const { height } = useWindowDimensions()
    const [chatText, setChatText] = useState<any>("")
    const [openVideoCall, setOpenVideoCall] = useState<any>(false)
    const attachmentModal = useModal(false)
    const attachmentName = useInput('')
    const [employeeList, setEmployeeList] = useState<any>()
    const [selectedUserId, setSelectedUserId] = useState<any>();
    const [oneToOneChatMessage, setOneToOneChatMessage] = useState<any>()
    const dispatch = useDispatch()
    const [photo, setPhoto] = useState<any>([])
    const userModal = useModal(false)
    const { raised_by_company } = taskDetails || {};
    const [showAutoComplete, setAutoComplete] = useState<any>(false)
    const [image, setImage] = useState<any>([])
    var fiveMinutesAgoStatus = moment().subtract(5, 'minutes').format("YYYY-MM-DD HH:mm:ss");
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const SEND_DELAY = 1000;
    const loginLoader = useLoader(false)
    const [loading, setLoading] = useState(false);
    const [employeeListLoading, setEmployeeListLoading] = useState(false);

    useEffect(() => {

        getChatEmployeeList('')
        getCompanyEmployeeApi()

    }, [])



    useEffect(() => {

        if (selectedUserChat) {
            getChatMessage(selectedUserChat?.id, INITIAL_PAGE)
        }
    }, [selectedUserChat, refreshIndividualChatMessage])

    const getChatEmployeeList = (data) => {

        const params = {
            ...(data && { q_many: data }),
            per_page_count: -1

        }
        setEmployeeListLoading(true)
        dispatch(fetchChatEmployeeList({
            params,
            onSuccess: (success: any) => () => {
                let modifiedData: any = []
                setEmployeeListLoading(false)
                success?.details?.map((el) => {
                    if (el.id !== user_details.id) {
                        modifiedData.push(el)
                    }
                })
                setEmployeeList(modifiedData)

                if (selectedUserChat === undefined) {

                    dispatch(
                        selectedUserChats(success?.details[0])
                    )
                }


            },
            onError: (error: string) => () => {
                setEmployeeListLoading(false)
            },
        }))
    }

    const getDisplayTimeFromMoment = (date) => {
        if (date) {
            return moment(date).format('LT')
        }
        else {
            return '-'
        }

    }

    const displayDate = (inputDate: any) => {
        const today = new Date();
        const date = new Date(inputDate);

        if (isNaN(date.getTime())) {
            return ''; // invalid date
        }

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        }
    }
    const addGroupEventAttachment = () => {

        const validation = validate(CHAT_ATTACHMENT_RULES, {
            attachment_name: attachmentName.value.trim(),
            chat_attachments: photo.length > 0 ? [{ name: attachmentName.value, attachments: photo }] : '',
            receiver_by: selectedUserChat?.id
        })
        const params = {
            event_type: "MEA",
            receiver_by: selectedUserChat?.id,
            chat_attachments: [{ name: attachmentName.value, attachments: photo }],
        };

        if (ifObjectExist(validation)) {
            loginLoader.show()
            dispatch(postChatMessage({
                params,
                onSuccess: (success: any) => async () => {

                    getChatMessage(selectedUserChat?.id, INITIAL_PAGE)
                    resetValues()
                    attachmentModal.hide()
                    loginLoader.hide()
                },
                onError: (error: string) => () => {
                    loginLoader.hide()
                },
            }))
        } else {
            showToast(getValidateError(validation))
        }
    };

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
    
    const addChatMessage = () => {
        const params = {
            event_type: "TEM",
            message: chatText,
            receiver_by: selectedUserChat?.id
        }
        const validation = validate(CHAT_MESSAGE_RULES, params);
        if (ifObjectExist(validation)) {
            dispatch(postChatMessage({
                params,
                onSuccess: (success: any) => () => {
                    getChatMessage(selectedUserChat?.id, INITIAL_PAGE)
                    setChatText('')
                },
                onError: (error: string) => () => {
                },
            }))
        }
    }


    const updateNewEmployeeInChatBox = () => {
        let checkList = employeeList?.some(el => { return el.id === selectedUserChat.id })
        !checkList && getChatEmployeeList('')
    }

    const getChatMessage = (data, page_number: number) => {

        const params = {
            emp_id: data,
            page_number
        }

        setLoading(true)
        dispatch(fetchChatMessage({
            params,
            onSuccess: (response) => () => {
                updateNewEmployeeInChatBox()
                setSelectedUserId('')
                setLoading(false)
            },
            onError: () => () => {

                setLoading(false)

            },
        }))
    }


    const alignChatMessage = (el) => {
        if (user_details.id === el?.event_by?.id) {
            return true
        }
        else {
            return false
        }
    }

    const getUserToken = () => {
        dispatch(selectedVcDetails(selectedUserChat.id))
        const params = {
            id: selectedUserChat.id,
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
    const activeStatus = (value) => {
        if (value) {
            const convert = moment(value).format("YYYY-MM-DD HH:mm:ss")
            console.log("fiveMinutesAgoStatus", fiveMinutesAgoStatus, "convert", convert);

            if (fiveMinutesAgoStatus < convert) {
                return true
            }
        }

        else {
            return false
        }

    }

    const resetValues = () => {
        attachmentName.set('');
        setPhoto([])
        setChatText('')
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            if (!isSendingMessage && chatText.trim().length > 0) {
                setIsSendingMessage(true);
                addChatMessage();

                setTimeout(() => {
                    setIsSendingMessage(false);
                }, SEND_DELAY);
            }
        }
    };

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
                                    height: dynamicHeight.dynamicHeight - 50
                                }}>
                                {/** Chat Header */}

                                <CardHeader>
                                    <div className=''>
                                        <div className='row justify-content-between d-flex mx-2'>
                                            <div className='h3'>
                                                <strong>{selectedUserChat?.name || selectedUserChat?.text}</strong>
                                            </div>

                                        </div>
                                    </div>



                                </CardHeader>

                                <CardBody
                                    id="scrollableDiv"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column-reverse',
                                    }}

                                    className={'overflow-auto overflow-hide mt-3'}
                                >
                                    <InfiniteScroll
                                        dataLength={chatMessage?.length}
                                        hasMore={chatMessageCurrentPages !== -1}
                                        scrollableTarget="scrollableDiv"
                                        style={{ display: 'flex', flexDirection: 'column-reverse' }}
                                        className={'overflow-auto overflow-hide '}
                                        inverse={true}
                                        loader={<h4>
                                            <div className={'d-flex justify-content-center'}><Spinner /></div>
                                        </h4>}

                                        next={() => {
                                            console.log('testing ====>')
                                            if (chatMessageCurrentPages !== -1) {
                                                getChatMessage(selectedUserChat?.id, chatMessageCurrentPages)
                                            }
                                        }
                                        }>

                                        {
                                            loading && (
                                                <div className='d-flex justify-content-center align-item-center' style={{ marginBottom: '200px' }}>
                                                    <Spinner />
                                                </div>
                                            )
                                        }


                                        {
                                            chatMessage && chatMessage?.length > 0 &&
                                            chatMessage?.map((el, index) => {
                                                const date = new Date(el?.created_at);
                                                const formattedDate = displayDate(el?.created_at);
                                                const isFirstMessage = index === 0;
                                                const previousDate: any = !isFirstMessage ? new Date(chatMessage[index - 1]?.created_at) : null;
                                                const isDifferentDay = !isFirstMessage && date?.getDate() !== previousDate?.getDate();
                                                const dateToShow = isDifferentDay ? formattedDate : null;
                                                const imageUrls = el?.chat_attachments?.attachments && el?.chat_attachments?.attachments.map((each: { attachment_file: any; }) => getPhoto(each.attachment_file))

                                                return (
                                                    <>
                                                        <div className='mt-3'>
                                                            {dateToShow && el?.message && (
                                                                <div className='d-flex'>
                                                                    <hr className=''
                                                                        style={{
                                                                            width: '47%',
                                                                            backgroundColor: 'rgb(228,223,225)'
                                                                        }}
                                                                    ></hr>
                                                                    <div className='px-2'
                                                                        style={{
                                                                            marginTop: '17px'
                                                                        }}
                                                                    >
                                                                        {dateToShow}
                                                                    </div>
                                                                    <hr className=''
                                                                        style={{
                                                                            backgroundColor: 'rgb(228,223,225)',
                                                                            width: '45%'
                                                                        }}
                                                                    ></hr>
                                                                </div>
                                                            )}

                                                            {
                                                                el.is_in_call &&
                                                                <>
                                                                    <div className='d-flex justify-content-center align-items-center'>
                                                                        <div className={'mb-3'}>
                                                                            <Image
                                                                                width={30}
                                                                                height={30}
                                                                                src={icons.vcCall}
                                                                            />
                                                                        </div>
                                                                        <div className='ml-2 align-item-center'>
                                                                            <h6>
                                                                                {`${getDisplayTimeFromMoment(el?.created_at)}  to ${getDisplayTimeFromMoment(el?.call_end_time)}`}
                                                                            </h6>
                                                                        </div>

                                                                    </div>
                                                                </>
                                                            }

                                                        </div >
                                                        <div className={`d-flex flex-row ml-2 ${alignChatMessage(el)
                                                            ? " justify-content-end mb-2   "
                                                            : " justify-content-start mb-3 pt-2 "
                                                            } mt--3 `}>
                                                            <div>
                                                                {!alignChatMessage(el) && (el?.message || el?.chat_attachments?.attachments?.length > 0) && (
                                                                    <>
                                                                        <div className='row pl-2 '>
                                                                            <Image
                                                                                variant="rounded"
                                                                                className=""
                                                                                size="sm"
                                                                                src={!alignChatMessage(el) && SERVER + el?.event_by?.profile_image || ''}
                                                                                alt="avatar 1"
                                                                            />
                                                                            <small className='ml-2 pt-1'>
                                                                                <h6
                                                                                    style={{
                                                                                        fontSize: '12px'
                                                                                    }}
                                                                                >{el.event_by.name}</h6>
                                                                                <div className='mt--2 '
                                                                                    style={{
                                                                                        fontSize: '10px'
                                                                                    }}
                                                                                >
                                                                                    {getDisplayTimeFromMoment(el?.created_at)}
                                                                                </div>
                                                                            </small>
                                                                        </div>
                                                                    </>
                                                                )
                                                                }
                                                                {!alignChatMessage(el) &&
                                                                    <div className=''>
                                                                        <div className='ml-4 mt-2'
                                                                            style={{
                                                                                display: "flex",
                                                                                flexDirection: 'row'
                                                                            }}>
                                                                            <p className={`small px-2   text-wrap bg-lighter text-dark`}
                                                                                style={{
                                                                                    maxWidth: '70vh',
                                                                                    borderRadius: '0px 8px 8px 8px'
                                                                                }}>
                                                                                {!alignChatMessage(el) && el?.message && (
                                                                                    <div className="h5 text-primary mb--1 pt-2">
                                                                                        {el?.by_user?.name}
                                                                                    </div>
                                                                                )}
                                                                                {el.message?.length > 40 ? (
                                                                                    <>
                                                                                        {el?.message}
                                                                                    </>
                                                                                ) : (
                                                                                    el?.message && <div className="p-1">{el?.message}</div>
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                        <div className={`row ${alignChatMessage(el) ? "mr-1" : 'ml-3 mt--3 mb-3'}`}
                                                                            style={{
                                                                                maxWidth: '70vh'
                                                                            }}>
                                                                            {
                                                                                el?.chat_attachments?.attachments && el?.chat_attachments?.attachments?.map((it) => {
                                                                                    return (
                                                                                        <>
                                                                                            <div className='mr-2 pt-2' style={{}}>
                                                                                                <Image
                                                                                                    width={70}
                                                                                                    height={70}
                                                                                                    src={getPhoto(it?.attachment_file)}
                                                                                                />
                                                                                            </div>
                                                                                        </>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>

                                                                    </div>}

                                                                {alignChatMessage(el) && (el?.message || el?.chat_attachments?.attachments?.length > 0) && (
                                                                    <div className=''
                                                                        style={{
                                                                            display: "flex",
                                                                            flexDirection: 'row-reverse'
                                                                        }}>
                                                                        <Image
                                                                            variant="rounded"
                                                                            className={'pointer'}
                                                                            size="sm"
                                                                            src={alignChatMessage(el) && SERVER + el?.event_by?.profile_image || ''}
                                                                            alt="avatar 1"
                                                                            onClick={() => { userModal.show() }}
                                                                        />
                                                                        <small className='mr-2 pt-1'>
                                                                            <h6
                                                                                className={'pointer'}
                                                                                style={{
                                                                                    fontSize: '12px'
                                                                                }}
                                                                                onClick={() => { userModal.show() }}
                                                                            >{el?.event_by?.name}</h6>
                                                                            <div className='mt--2 text-right'
                                                                                style={{
                                                                                    fontSize: '10px'
                                                                                }}
                                                                            >
                                                                                {getDisplayTimeFromMoment(el?.created_at)}
                                                                            </div>
                                                                        </small>
                                                                    </div>
                                                                )}

                                                                {alignChatMessage(el) &&
                                                                    <div className=' mb--2'>
                                                                        <div className=' mt-2'
                                                                            style={{
                                                                                display: "flex",
                                                                                flexDirection: 'row-reverse',
                                                                                marginRight: '34px'
                                                                            }}>
                                                                            <p
                                                                                className={`small px-2   text-wrap bg-primary text-white`}
                                                                                style={{
                                                                                    maxWidth: '50vh',
                                                                                    borderRadius: '8px 0px 8px 8px'
                                                                                }}>
                                                                                {alignChatMessage(el) && el?.message && (
                                                                                    <div className="h5 text-primary mb--1 pt-1">
                                                                                        {el?.by_user?.name}
                                                                                    </div>
                                                                                )}
                                                                                {el?.message !== null && <div className="p-1">{el?.message}</div>}
                                                                            </p>
                                                                        </div>
                                                                        {<div className={`row ${alignChatMessage(el) ? "mr-1 mb-3" : 'ml-1'}`}
                                                                            style={{
                                                                                maxWidth: '70vh',
                                                                                display: "flex",
                                                                                flexDirection: 'row-reverse'
                                                                            }}>
                                                                            {

                                                                                el?.chat_attachments?.attachments && (
                                                                                    <>
                                                                                        <div className='mr-2'>
                                                                                            {el?.chat_attachments?.attachments.map((it, index) => {

                                                                                                const note = it?.name;
                                                                                                const showNote = index === 0;

                                                                                                return (
                                                                                                    <div>
                                                                                                        {showNote && (
                                                                                                            <p className={'text-muted text-sm font-weight-bold d-flex'}>
                                                                                                                <div
                                                                                                                    style={{ maxWidth: '200px' }}
                                                                                                                >
                                                                                                                    {note}
                                                                                                                </div>
                                                                                                            </p>
                                                                                                        )}

                                                                                                    </div>
                                                                                                );
                                                                                            })}
                                                                                        </div>
                                                                                    </>
                                                                                )

                                                                            }


                                                                            <div className={'mt-2 mb-4 pt-2 row'}>

                                                                                {
                                                                                    <div className={'container'}>
                                                                                        <PhotoProvider>
                                                                                            <div className="row pointer pl-5">
                                                                                                {imageUrls?.map((item: any, index: any) => {

                                                                                                    return (
                                                                                                        <div key={index}>
                                                                                                            <PhotoView src={item}>
                                                                                                                <img style={{
                                                                                                                    borderRadius: '10px'
                                                                                                                }} className={'p-1'} src={item} alt={'Task Attachments'} width={130} height={130} />
                                                                                                            </PhotoView>
                                                                                                        </div>
                                                                                                    )
                                                                                                })}
                                                                                            </div>
                                                                                        </PhotoProvider>
                                                                                    </div>
                                                                                }


                                                                            </div>

                                                                        </div>}
                                                                    </div>}
                                                            </div >
                                                        </div>

                                                    </>
                                                )
                                            })
                                        }
                                    </InfiniteScroll>



                                </CardBody>


                                {selectedUserChat && selectedUserChat?.id ?
                                    <CardFooter className=''>
                                        <div className='d-flex'>
                                            <div className=''>
                                                <Button color={'white'} size={'lg'} variant={'icon-rounded'} icon={icons.upload} onClick={attachmentModal.show} />
                                            </div>
                                            <textarea
                                                style={{ resize: 'vertical', minHeight: '50px', borderRadius: '15px' }}
                                                placeholder='write message'
                                                className="form-control form-control-sm mx-3 "
                                                id="exampleFormControlInput1"
                                                autoComplete="off"
                                                onChange={(val) => {
                                                    setChatText(val.target.value)
                                                }}
                                                value={chatText}
                                                onKeyDown={handleKeyDown}
                                            />

                                            <div className=" mr-1"
                                                style={{
                                                    marginTop: '2px'
                                                }}
                                            >
                                                <div>
                                                    <Button
                                                        size={'lg'}
                                                        color={'white'}
                                                        variant={'icon-rounded'}
                                                        icon={icons.send}
                                                        onClick={() => {
                                                            chatText.trim().length > 0 && addChatMessage()
                                                        }} />
                                                </div>

                                            </div>
                                            <div className=" mr-1 ml-2 pointer">
                                                <Button
                                                    size={'lg'}
                                                    color={'white'}
                                                    variant={'icon-rounded'}
                                                    icon={icons.videoCall}
                                                    onClick={() => {
                                                        getUserToken()
                                                        dispatch(handleOneToOneChat(true))
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </CardFooter>
                                    :
                                    <div className='mb-6'>
                                        <NoRecordsFound text={'No User Found'} />
                                    </div>
                                }

                            </Card>
                        </div>
                    }

                    {!oneToOneChat && <div className='col-sm-4'>
                        <Card
                            className=' '
                            style={{
                                height: dynamicHeight.dynamicHeight - 50,
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
                                                    setSelectedUserId(item)

                                                    dispatch(
                                                        selectedUserChats(item)
                                                    )
                                                }}
                                            />
                                        </div>
                                    }
                                </div>

                            </CardHeader>
                            {<div className={` overflow-auto overflow-hide `}
                                style={{ height: "90vh" }}

                            >
                                {employeeListLoading&& (
                                    <div className="d-flex align-items-center justify-content-center pointer" style={{ minHeight: '100px' }}>
                                        <Spinner />
                                    </div>
                                )}
                                {!employeeListLoading && <div >
                                    {employeeList && employeeList?.length > 0 ?
                                        employeeList?.map((item: any) => {
                                            return (
                                                <div className={`pointer overflow-auto overflow-hide `}
                                                    onClick={() => {
                                                        dispatch(
                                                            selectedUserChats(item)
                                                        )

                                                    }}
                                                >
                                                    {
                                                        <div className={`mx- ${item?.id === selectedUserChat?.id ? 'bg-lighter ' : ''} py-2 px-2`}
                                                            style={{
                                                                // borderRadius: '10px'
                                                            }}
                                                        >
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
                                                                            <h5 className={`${item?.id === selectedUserChat?.id ? 'text-black' : 'text-muted'} mb-0 h5`}>
                                                                                {convertToUpperCase(item?.name)}
                                                                            </h5>
                                                                            <div className={'row ml-0  pb-2'}>
                                                                                <div className={`h6 mb-0 text-uppercase  `}
                                                                                    style={{
                                                                                        color: item?.id === selectedUserChat?.id ? '#424242' : '#8898aa'
                                                                                    }}
                                                                                >{item?.department ? item?.department?.name : '-'}</div>
                                                                                <div className={` mt--1`}><Image src={icons.verticalLine} height={12} width={7} /></div>
                                                                                <div
                                                                                    className={`h6 mb-0 text-uppercase `}
                                                                                    style={{
                                                                                        color: item?.id === selectedUserChat?.id ? '#424242' : '#8898aa'
                                                                                    }}
                                                                                >{item?.designation ? item?.designation?.name : '-'}</div>
                                                                            </div>
                                                                        </small>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div >

                                                    }
                                                </div>
                                            )
                                        }) :
                                        <div className=" d-flex justify-content-center align-items-center mt--5" style={{
                                            height: '77.6vh'
                                        }}>
                                            <NoRecordsFound />
                                        </div>
                                    }

                                </div>}
                            </div>}
                        </Card>
                    </div>
                    }

                </div >
            </ div >

            <Modal isOpen={attachmentModal.visible}
                onClose={attachmentModal.hide}>
                <div className='col-7 mt--6'>
                    <div className={'mt-2'}><Input heading={'Note'} value={attachmentName.value} onChange={attachmentName.onChange} /></div>
                    <div className='row mt--4'>
                        <ImagePicker
                            icon={image}
                            size='xl'
                            onSelect={(image) => {
                            }}

                            onSelectImagePickers={(el) => {
                                let array: any = []

                                for (let i = 0; i <= el.length; i++) {

                                    let editPickers = el[i]?.base64?.toString().replace(/^data:(.*,)?/, "")
                                    if (editPickers !== undefined) {
                                        array.push(editPickers)
                                    }
                                }
                                setPhoto(array)
                            }}
                        />
                    </div>
                </div>

                <div className='col-6 pt-2'>
                    <div className=''>
                        <Button text={translate("common.submit")} onClick={addGroupEventAttachment}
                            loading={loginLoader.loader} />
                    </div>
                </div>

            </Modal>

            <Modal size={'sm'} isOpen={userModal.visible} onClose={userModal.hide}>

                <ProfileCard
                    coverPhoto={user_details?.profile_photo}
                    profilePhoto={user_details?.profile_photo}
                    name={user_details?.name}
                    department={user_details?.department}
                    designation={user_details?.designation}
                    company={raised_by_company?.display_name}
                />
            </Modal>
        </div>

    )
}

export { IndividualChat }
