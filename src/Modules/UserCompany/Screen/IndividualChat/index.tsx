import React, { useEffect, useRef, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader, ListGroup, ListGroupItem } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Divider, Dropzone, Image, Input, InputHeading, Modal, NoRecordsFound, SearchInput, Spinner } from '@Components'
import moment from 'moment'
import { convertToUpperCase, getDisplayTimeFromMoment, } from '@Utils'
import { fetchChatEmployeeList, fetchChatMessage, getEmployees, postChatMessage } from '@Redux'
import { SERVER } from '@Services'

function IndividualChat() {


    const [chatText, setChatText] = useState<any>("")
    const [selectedBatchGroup, setSelectedBatchGroup] = useState<any>()
    const [selectedUserDetails, setSelectedUserDetails] = useState<any>()
    const [employeeList, setEmployeeList] = useState<any>()
    const [isOpenUploadImageModal, setIsOpenUploadImageModal] = useState<any>(false)
    const dispatch = useDispatch()
    const { employeeListData, employeesNumOfPages, chatMessageData, dashboardDetails } = useSelector(
        (state: any) => state.UserCompanyReducer
    );
    const { company_branch, user_details, company } = dashboardDetails || ''


    // const enterPress = useKeyPress('Enter')
    const dynamicHeight: any = 100
    const fileInputRef = useRef<any>();
    const [image, setImage] = useState<any>([])
    let currentTime = moment().format("YYYY-MM-DD")
    var fiveMinutesAgoStatus = moment().subtract(5, 'minutes').format("YYYY-MM-DD HH:mm:ss");

    const batchGroupChatDetails: any = [{}]



    useEffect(() => {

        getChatEmployeeList('')

    }, [])

    useEffect(() => {
        if (chatText) {
            // postBatchGroupChat()
        }
    }, [])

    useEffect(() => {
        getChatMessage(selectedUserDetails?.id)
    }, [selectedUserDetails])

    const getChatEmployeeList = (data) => {

        const params = {
            ...(data && { q_many: data })
        }
        dispatch(fetchChatEmployeeList({
            params,
            onSuccess: (success: any) => () => {
                let modifiedData:any = []
                success?.details?.data.map((el) => {
                    if (el.id !== user_details.id) {
                        modifiedData.push(el)
                    }
                })

                setEmployeeList(modifiedData)
                getChatMessage(success?.details?.data[0]?.id)
                setSelectedUserDetails(success?.details?.data[0])

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

    // const getEmployesList = (data) => {
    //     const params = {
    //         "q_many": data
    //     }
    //     dispatch(getEmployees({
    //         params,
    //         onSuccess: (success: any) => () => {
    //             setEmployeeList(success?.details?.data)
    //             getChatMessage(success?.details?.data[0]?.id)
    //             setSelectedUserDetails(success?.details?.data[0])

    //         },
    //         onError: (error: string) => () => {
    //         },
    //     }))
    // }


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



    const getChatMessage = (data) => {
        const params = {
            emp_id: data
        }
        dispatch(fetchChatMessage({
            params,
            onSuccess: (success: any) => () => {


            },
            onError: (error: string) => () => {
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

    console.log("selectedUserDetails", selectedUserDetails)

    // const findLastActiveAt = (value) => {

    //     if (value) {
    //         const convert = moment(value).format("YYYY-MM-DD")

    //         if (fiveMinutesAgoStatus < convert) {
    //             return ''
    //         }
    //         else {

    //             if (convert === currentTime) {
    //                 return <></>
    //             }
    //             else {
    //                 return <></>
    //             }
    //         }
    //     }

    //     else {
    //         return ''
    //     }

    // }

    return (
        <div className='container-fluid pt-4'>
            <div
                className=''

            >
                <div className='row'>

                    <div className={` col-sm-8  p-0 m-0 `}>
                        <Card
                            style={{
                                height: "100vh"
                            }}>
                            <CardHeader>
                                <div className='row justify-content-between mx-2'>
                                    <h3>{selectedUserDetails?.name}</h3>
                                    <div className=''
                                        onClick={() => {
                                            // setShowActiveStatus(!showActiveStatus)
                                        }}
                                    >
                                        <i className="bi bi-people-fill text-primary fa-lg pointer"></i>
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
                                    chatMessageData && chatMessageData?.length > 0 && chatMessageData?.map((el, index) => {
                                        const date = new Date(el?.created_at);
                                        const formattedDate = displayDate(el?.created_at);

                                        const isFirstMessage = index === 0;
                                        const previousDate: any = !isFirstMessage ? new Date(chatMessageData[index - 1]?.created_at) : null;
                                        const isFirstMessageOfDay = isFirstMessage || date.toDateString() !== previousDate.toDateString();
                                        const isDifferentDay = !isFirstMessage && date?.getDate() !== previousDate?.getDate();
                                        // const dateToShow = isFirstMessageOfDay ? "Today" : isDifferentDay ? formattedDate : null;
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

                                                </div >
                                                <div
                                                    className={`d-flex flex-row ml-2 ${alignChatMessage(el)
                                                        ? " justify-content-end mb-2 pt-2  "
                                                        : " justify-content-start mb-3 pt-2 "
                                                        } mt--3 `}
                                                >
                                                    <div>
                                                        {!alignChatMessage(el) && (el?.message || el?.attachments?.length > 0) && (
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
                                                                <div className={`row ${alignChatMessage(el) ? "mr-1" : 'ml-1 mt--2 mb-3'}`}
                                                                    style={{
                                                                        maxWidth: '70vh'
                                                                    }}
                                                                >
                                                                    {
                                                                        el?.attachments && el?.attachments.map((it) => {
                                                                            return (
                                                                                <div className='mr-2 pt-2' style={{

                                                                                }}>
                                                                                    <Image
                                                                                        width={70}
                                                                                        height={70}
                                                                                        src={''}
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>

                                                            </div>}
                                                        {alignChatMessage(el) && (el?.message || el?.attachments?.length > 0) && (
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
                                                                            <div className="h5 text-primary mb--1 pt-2">
                                                                                {el?.by_user?.name}
                                                                            </div>
                                                                        )}

                                                                        {el?.message !== "" && <div className="p-1">{el?.message}</div>}
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
                                                                        el.attachments && el.attachments.map((it) => {
                                                                            return (
                                                                                <div className='mr-2 pt-2' style={{

                                                                                }}>
                                                                                    <Image
                                                                                        width={70}
                                                                                        height={70}
                                                                                        src={(it?.attachmgetImageUrlent_file)}
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        })
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
                                    {/* <Image
                                            variant='rounded'
                                            size='md'
                                            src={dashboardDetails?.user_details?.photo}
                                            alt="avatar 1"
                                        /> */}
                                    <div className=''>
                                        <i className="bi bi-plus-circle-fill text-primary fa-2x pointer"
                                            onClick={() => {
                                                setIsOpenUploadImageModal(!isOpenUploadImageModal)
                                            }}
                                        ></i>
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
                                            marginTop: '9px'
                                        }}
                                        onClick={() => {
                                            addChatMessage()
                                        }}
                                    >
                                        <div>

                                            <i className={`fas fa-paper-plane text-info fa-lg pointer`}

                                            ></i>
                                        </div>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>

                    </div>
                    {<div className='col-sm-4'>
                        <Card
                            className=' '
                            style={{
                                height: "100vh",
                            }}

                        >
                            <CardHeader className=''>
                                <h3>{"nottu"}</h3>
                                <div className=''>
                                    <SearchInput onSearch={(search) => {
                                        getChatEmployeeList(search)
                                    }} />
                                </div>
                            </CardHeader>

                            {<div className={`mt-1 overflow-auto overflow-hide `}
                                style={{ height: "90vh" }}

                            >

                                {employeeList && employeeList?.length > 0 ?
                                    employeeList?.map((item: any) => {
                                        return (
                                            <div className='pointer'
                                                onClick={() => {
                                                    setSelectedUserDetails(item)
                                                }}
                                            >
                                                {/* {isLoading &&
                                                    <div className="mt--6 ml--3">
                                                        <Spinner />
                                                    </div>
                                                } */}

                                                {
                                                    <ListGroup className="list my--3" flush>
                                                        <ListGroupItem className="ml--2">
                                                            <div className="row align-items-center ml-2">
                                                                <img
                                                                    style={{
                                                                        objectFit: "fill",
                                                                        // opacity: activeStatus(item?.last_active_time) ? '' : "0.4",/
                                                                        borderRadius: '50%',
                                                                        width: '12%',
                                                                        height: '0%'
                                                                    }}
                                                                    alt="..."
                                                                    src={item?.profile_image ? SERVER + item?.profile_image : SERVER + item?.profile_pic}
                                                                />
                                                                <small className='ml-3 '>
                                                                    <h4 className={`text-${activeStatus(item?.last_active_time) ? 'black' : ""} mb-0 h5`}>
                                                                        {convertToUpperCase(item?.name)}
                                                                    </h4>
                                                                    {/* <div className="row m-0">
                                                                        <span className={`text-${activeStatus(item?.last_active_time) ? 'success' : "muted"} mr-1`}>●</span>
                                                                        <h6 className={`text-${activeStatus(item?.last_active_time) ? 'success' : 'muted'} ls-1`} style={{ marginTop: 6 }}>{item?.last_active_time && activeStatus(item?.last_active_time) ? 'ONLINE' : 'OFFLINE'}</h6>
                                                                    </div> */}
                                                                    <div>
                                                                        {/* <h6>{item.last_active_time ? activeStatus(item.last_active_time) ? "" : `Last active:  ${findLastActiveAt(item.last_active_time)}` : ''}</h6> */}
                                                                        {/* <h6>
                                                                                {item.last_active_time ?
                                                                                    activeStatus(item.last_active_time) ? "" :
                                                                                        <span className="text-muted">Last Active: {findLastActiveAt(item.last_active_time)}</span> :
                                                                                    ''}
                                                                            </h6> */}
                                                                    </div>
                                                                </small>

                                                                {/* </div> */}
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
        </div >
    )
}

export { IndividualChat }