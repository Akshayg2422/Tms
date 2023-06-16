import React, { useEffect, useRef, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader, ListGroup, ListGroupItem } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { AutoComplete, Button, Divider, Dropzone, Image, ImagePicker, Input, InputHeading, Modal, NoRecordsFound, SearchInput, Spinner } from '@Components'
import moment from 'moment'
import { convertToUpperCase, getDisplayTimeFromMoment, getDropDownCompanyUser, getDropDownDisplayData, validate, } from '@Utils'
import { fetchChatEmployeeList, fetchChatMessage, getEmployees, getTokenByUser, handleOneToOneChat, handleOneToOneVcNoti, postChatMessage, selectedVcDetails } from '@Redux'
import { SERVER } from '@Services'
import { icons } from '@Assets'
import { ROUTES } from '@Routes'
import { useDynamicHeight, useInput, useModal, useNavigation } from '@Hooks'
import { translate } from '@I18n'
import { VideoConference } from '../../Container'

function IndividualChat() {
    const { chatMessageData, dashboardDetails, oneToOneChat, employees, settingVcDetails } = useSelector(
        (state: any) => state.UserCompanyReducer
    );
    const { company_branch, user_details, company } = dashboardDetails || ''

    const dynamicHeight: any = useDynamicHeight()

    const [chatText, setChatText] = useState<any>("")
    const [selectedUserDetails, setSelectedUserDetails] = useState<any>(settingVcDetails ? settingVcDetails : '')
    const [openVideoCall, setOpenVideoCall] = useState<any>(false)
    const attachmentModal = useModal(false)
    const attachmentName = useInput('')
    const [employeeList, setEmployeeList] = useState<any>()
    const [selectedUserId, setSelectedUserId] = useState<any>();
    const [oneToOneChatMessage, setOneToOneChatMessage] = useState<any>()
    const dispatch = useDispatch()

    const { goTo } = useNavigation()

    const [photo, setPhoto] = useState<any>([])
    const [selectedNoOfPickers, setSelectedNoOfPickers] = useState<any>()
    const [selectDropzone, setSelectDropzone] = useState<any>([{}])


    // const enterPress = useKeyPress('Enter')
    const [image, setImage] = useState<any>([])
    let currentTime = moment().format("YYYY-MM-DD")
    var fiveMinutesAgoStatus = moment().subtract(5, 'minutes').format("YYYY-MM-DD HH:mm:ss");

    let attach = photo.slice(-selectedNoOfPickers)
    const handleImagePicker = (file: any) => {
        let updatedPhoto = [...selectDropzone, file]
        let newUpdatedPhoto = [...photo, file]
        setSelectDropzone(updatedPhoto)
        setPhoto(newUpdatedPhoto)
    }

    console.log("selectedUserId", selectedUserId)


    useEffect(() => {

        getChatEmployeeList('')
        getCompanyEmployeeApi()

    }, [])

    useEffect(() => {
        if (chatText) {
            // postBatchGroupChat()
        }
    }, [])

    useEffect(() => {
        if (selectedUserDetails) {
            console.log("88888888888888888888888888", selectedUserDetails)
            getChatMessage(selectedUserDetails?.id)
        }
    }, [selectedUserDetails])

    const getChatEmployeeList = (data) => {

        const params = {
            ...(data && { q_many: data })
        }
        dispatch(fetchChatEmployeeList({
            params,
            onSuccess: (success: any) => () => {
                let modifiedData: any = []
                success?.details?.data.map((el) => {
                    if (el.id !== user_details.id) {
                        modifiedData.push(el)
                    }
                })

                setEmployeeList(modifiedData)
                if (!selectedUserDetails) {
                    setSelectedUserDetails(success?.details?.data[0])
                }



            },
            onError: (error: string) => () => {
            },
        }))
    }

    console.log("employeeelist", employeeList)

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
        const params = {
            event_type: "MEA",
            receiver_by: selectedUserDetails?.id,
            chat_attachments: [{ name: attachmentName.value, attachments: attach }],
        };

        if (true) {
            dispatch(postChatMessage({
                params,
                onSuccess: (success: any) => async () => {
                    getChatMessage(selectedUserDetails?.id)
                    setChatText('')
                    attachmentModal.hide()

                },
                onError: (error: string) => () => {
                },
            }))
        } else {

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
            receiver_by: selectedUserDetails?.id
        }
        dispatch(postChatMessage({
            params,
            onSuccess: (success: any) => async () => {


                getChatMessage(selectedUserDetails?.id)
                setChatText('')

            },
            onError: (error: string) => () => {
            },
        }))
    }

    const updateNewEmployeeInChatBox = () => {
        let checkList = employeeList.some(el => { return el.id === selectedUserDetails.id })
        console.log("checkList", checkList)
        !checkList && getChatEmployeeList('')
    }



    const getChatMessage = (data) => {
        const params = {
            emp_id: data
        }
        dispatch(fetchChatMessage({
            params,
            onSuccess: (success: any) => async () => {
                setOneToOneChatMessage(success?.details)
                updateNewEmployeeInChatBox()
            },
            onError: (error: string) => async () => {
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
        dispatch(selectedVcDetails(selectedUserDetails.id))
        const params = {
            id: selectedUserDetails.id,
            user_name: user_details.name,
            email_id: user_details.email,
        }
        dispatch(getTokenByUser({
            params,
            onSuccess: (success: any) => () => {
                console.log("090909090909", success)
                dispatch(handleOneToOneVcNoti(success?.message))

            },
            onError: (error: string) => () => {

            },

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

    console.log("oneToOneChat", oneToOneChat)

    return (
        <div className='container-fluid pt-4'>
            <div
                className=''
            >
                <div className='row'
                >
                    {oneToOneChat && <div className='col-sm-8'

                    >
                        <VideoConference
                            iframeHeight={`${dynamicHeight.dynamicHeight - 510 + 'vh'}`}
                            chatCall={true}
                        />
                    </div>}

                    {<div className={`${!oneToOneChat ? 'col-sm-8' : ' col-sm-4'} p-0 m-0 `}>
                        <Card
                            style={{
                                height: dynamicHeight.dynamicHeight - 50
                            }}>
                            <CardHeader>
                                <div className='row justify-content-between mx-2'>
                                    <div>
                                        <h3>{selectedUserDetails?.name || selectedUserDetails?.text}</h3>
                                    </div>
                                    <div
                                        onClick={() => {
                                            getChatMessage(selectedUserDetails?.id)
                                        }}
                                    >
                                        <i className="bi bi-arrow-clockwise fa-lg text-primary"></i>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody
                                id="scrollableDiv"
                                style={{
                                    height: "100%",
                                    display: 'flex',
                                    flexDirection: 'column-reverse',
                                }}
                                className={'overflow-auto overflow-hide'}
                            >
                                {
                                    oneToOneChatMessage && oneToOneChatMessage?.length > 0 && oneToOneChatMessage?.map((el, index) => {
                                        const date = new Date(el?.created_at);
                                        const formattedDate = displayDate(el?.created_at);

                                        const isFirstMessage = index === 0;
                                        const previousDate: any = !isFirstMessage ? new Date(oneToOneChatMessage[index - 1]?.created_at) : null;
                                        const isFirstMessageOfDay = isFirstMessage || date.toDateString() !== previousDate.toDateString();
                                        const isDifferentDay = !isFirstMessage && date?.getDate() !== previousDate?.getDate();
                                        const dateToShow = isDifferentDay ? formattedDate : null;



                                        console.log("999999999999", dateToShow)
                                        return (
                                            <>
                                                <div className='col'>
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
                                                                <div>
                                                                    <Image
                                                                        width={30}
                                                                        height={30}
                                                                        src={icons.vcCall2}
                                                                    />
                                                                    <span className='ml-2'>
                                                                        <small>
                                                                            {`${getDisplayTimeFromMoment(el?.created_at)}  to  ${getDisplayTimeFromMoment(el?.call_end_time)}`}
                                                                        </small>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }

                                                </div >
                                                <div
                                                    className={`d-flex flex-row ml-2 ${alignChatMessage(el)
                                                        ? " justify-content-end mb-2 pt-2  "
                                                        : " justify-content-start mb-3 pt-2 "
                                                        } mt--3 `}
                                                >
                                                    <div>
                                                        {!alignChatMessage(el) && (el?.message || el?.chat_attachments?.attachments?.length > 0) && (
                                                            <>
                                                                <div className='row '>
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
                                                                    }}
                                                                >
                                                                    <p
                                                                        className={`small px-2   text-wrap bg-lighter text-dark`}
                                                                        style={{
                                                                            maxWidth: '70vh',
                                                                            borderRadius: '0px 8px 8px 8px'
                                                                        }}
                                                                    >
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
                                                                    }}
                                                                >
                                                                    {
                                                                        el?.chat_attachments?.attachments &&
                                                                        <div className='mr-2 pt-2' style={{

                                                                        }}>
                                                                            <Image
                                                                                width={70}
                                                                                height={70}
                                                                                src={SERVER + el?.chat_attachments?.attachment_file}
                                                                            />
                                                                        </div>
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
                                                                    className=""
                                                                    size="sm"
                                                                    src={alignChatMessage(el) && SERVER + el?.event_by?.profile_image || ''}
                                                                    alt="avatar 1"
                                                                />
                                                                <small className='mr-2 pt-1'>
                                                                    <h6
                                                                        style={{
                                                                            fontSize: '12px'
                                                                        }}
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
                                                            <div className=''>
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
                                                                        }}
                                                                    >
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
                                                                    }}
                                                                >
                                                                    {
                                                                        el?.chat_attachments?.attachments &&
                                                                        <div className='mr-2 pt-2' style={{

                                                                        }}>
                                                                            <Image
                                                                                width={70}
                                                                                height={70}
                                                                                src={SERVER + el?.chat_attachments?.attachment_file}
                                                                            />
                                                                        </div>
                                                                    }
                                                                </div>}
                                                            </div>}
                                                    </div >
                                                </div>

                                            </>
                                        )
                                    })

                                }


                            </CardBody>
                            <CardFooter className=''>
                                <div className='d-flex'>
                                    <div className=''>
                                        <Button color={'white'} size={'lg'} variant={'icon-rounded'} icon={icons.upload} onClick={attachmentModal.show} />
                                    </div>
                                    <input type="text"
                                        style={{
                                            borderRadius: '15px'
                                        }}
                                        placeholder='write message'
                                        className="form-control form-control-md mx-3 "
                                        id="exampleFormControlInput1"
                                        autoComplete="off"
                                        onChange={(val) => {
                                            setChatText(val.target.value)
                                        }}
                                        value={chatText}
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
                                                    addChatMessage()
                                                }} />
                                        </div>

                                    </div>
                                    <div
                                        className=" mr-1 ml-2 pointer"
                                        style={{
                                            marginTop: '7px'
                                        }}
                                        onClick={() => {
                                            getUserToken()
                                            dispatch(handleOneToOneChat(true))
                                        }}
                                    >
                                        <i className="bi bi-camera-video-fill fa-lg"></i>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>}
                    {!oneToOneChat && <div className='col-sm-4'>
                        <Card
                            className=' '
                            style={{
                                height: dynamicHeight.dynamicHeight - 50,
                            }}

                        >
                            <CardHeader className=''>
                                <div className='mt--2'>
                                    <h3>{"Members"}</h3>
                                    <div className='mb--4'>
                                        {/* <SearchInput
                                            defaultValue=''
                                            onSearch={(search) => {
                                                getChatEmployeeList(search)
                                            }} /> */}
                                        <AutoComplete
                                            variant={'custom'}
                                            data={getDropDownCompanyUser(employees)}
                                            selected={selectedUserId}
                                            onChange={(item) => {
                                                setSelectedUserId(item)
                                                setSelectedUserDetails(item)


                                            }}
                                        />
                                    </div>
                                </div>
                            </CardHeader>

                            {<div className={` overflow-auto overflow-hide `}
                                style={{ height: "90vh" }}

                            >

                                {employeeList && employeeList?.length > 0 ?
                                    employeeList?.map((item: any) => {
                                        return (
                                            <div className={`pointer `}
                                                onClick={() => {
                                                    setSelectedUserDetails(item)
                                                }}
                                            >
                                                {
                                                    <ListGroup className={`list  `} flush>
                                                        <ListGroupItem className={`pl--2  ${item?.id === selectedUserDetails?.id ? 'bg-primary ' : ''} mx-2`}
                                                            style={{
                                                                borderRadius: '10px'
                                                            }}
                                                        >
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
                                                                        <h4 className={`${item?.id === selectedUserDetails?.id ? 'text-black' : 'text-muted'} mb-0 h5`}>
                                                                            {convertToUpperCase(item?.name)}
                                                                        </h4>
                                                                    </small>

                                                                </div>
                                                                <div className={'row align-items-center ml-5 mt--1 pb-2'}>
                                                                    <div className={`h6 mb-0 text-uppercase  ${item?.id === selectedUserDetails?.id ? 'text-black' : 'text-muted'}`} >{item?.department ? item?.department?.name : '-'}</div>
                                                                    <div className={`${item?.id === selectedUserDetails?.id ? 'text-black' : 'text-muted'} mt--1`}><Image src={icons.verticalLine} height={12} width={7} /></div>
                                                                    <div className={`h6 mb-0 text-uppercase ${item?.id === selectedUserDetails?.id ? 'text-black' : 'text-muted'}`}>{item?.designation ? item?.designation?.name : '-'}</div>
                                                                </div>
                                                            </div>
                                                        </ListGroupItem>
                                                    </ListGroup >

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
                        </Card>
                    </div>}
                </div >

            </ div >
            <Modal isOpen={attachmentModal.visible}
                onClose={attachmentModal.hide}>
                <div className='col-7 mt--6'>
                    <div className={'mt-2'}><Input heading={'Note'} value={attachmentName.value} onChange={attachmentName.onChange} /></div>
                    <div className='row mt--4'>
                        <ImagePicker
                            noOfFileImagePickers={3}
                            icon={image}
                            size='xl'
                            onSelect={(image) => {
                                let file = image.toString().replace(/^data:(.*,)?/, "")
                                handleImagePicker(file)
                            }}

                            onSelectImagePicker={(el) => {
                                setSelectedNoOfPickers(el?.length)

                            }}
                        />
                    </div>
                </div>

                <div className='col-6 pt-2'>
                    <div className=''>
                        <Button text={translate("common.submit")} onClick={addGroupEventAttachment} />
                    </div>
                </div>

            </Modal>
        </div >
    )
}

export { IndividualChat }