import React, { useEffect, useState } from 'react';
import { GroupMessageProps } from './interfaces';
import { useSelector, useDispatch } from 'react-redux'
import { addGroupMessage, getGroupMessage } from '@Redux'
import { Image, Modal, showToast, Button, Dropzone, GroupChat, Spinner,ImageDownloadButton } from '@Components'
import { getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer, INITIAL_PAGE, getPhoto, getObjectFromArrayByKey, GROUP_STATUS_LIST } from '@Utils'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInput, useModal, useWindowDimensions } from '@Hooks'
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { title } from 'process';
import { translate } from '@I18n';

function GroupMessage({selectedGroup }: GroupMessageProps) {

    const { id } = useParams();
    const dispatch = useDispatch()
    const { refreshGroupEvents, selectedGroupChatCode, dashboardDetails,chatGroups } = useSelector((state: any) => state.UserCompanyReducer);
    const [groupEvents, setGroupEvents] = useState([])
    const [GroupCurrentPage, setGroupCurrentPage] = useState(INITIAL_PAGE)
    const { height } = useWindowDimensions()
    const [image, setImage] = useState([])
    const imageModal = useModal(false)
    const deleteModal = useModal(false)
    const editModal = useModal(false)
    const message = useInput('')
    const [selectDropzone, setSelectDropzone] = useState<any>([{ id: "1" }]);
    const [photo, setPhoto] = useState<any>([]);
    const [selectMessage, setSelectMessage] = useState<any>(undefined)
    const { user_details } = dashboardDetails
    const [currentDay, setCurrentDay] = useState('');



    useEffect(() => {
        getGroupMessageApi(INITIAL_PAGE)
    }, [refreshGroupEvents, selectedGroupChatCode,selectedGroup])

    function getGroupEventsDisplayData(data: any) {
        if (data && data.length > 0) {
            return data.map(each => {
                return {
                    ...getIconsFromStatus(each)
                }
            })
        }
    }

    const getGroupMessageApi = (page_number: number) => {
        const params = {
            group_id:selectedGroup,
            page_number
        }
         console.log( selectedGroupChatCode,"kkkkkkvvv")
         console.log(params,"ppppppppp")

        if (selectedGroup) {
            dispatch(
                getGroupMessage({
                    params,
                    onSuccess: (response: any) => () => {
                        const groupEventsResponse = response.details
                        let updatedData = []
                        if (groupEventsResponse.data && groupEventsResponse.data.length > 0) {
                            if (page_number === 1) {
                                updatedData = getGroupEventsDisplayData(groupEventsResponse.data)
                            } else {
                                updatedData = getGroupEventsDisplayData([...groupEvents, ...groupEventsResponse.data] as any)
                            }
                        }
                        setGroupEvents(updatedData)
                        setGroupCurrentPage(groupEventsResponse.next_page)
                    },
                    onError: () => () => { },
                })
            );
        }

    };

    function getIconsFromStatus(each: any) {

        const { event_type, by_user, message, eta_time, tagged_users, assigned_to, attachments, group_status, event_by } = each
        let modifiedData = {}

        console.log(JSON.stringify(each));


        switch (event_type) {
            case 'TEM':
                modifiedData = { ...each, subTitle: event_by?.name, title: message, }
                break;
            case 'ETA':
                modifiedData = { ...each, subTitle: event_by?.name, title: "ETA Updated on " + getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(eta_time)), }
                break;
            case 'TGU':
                let names = tagged_users.map(function (item) {
                    return '@' + item['name'] + " ";
                });
                modifiedData = { ...each, subTitle: event_by?.name, title: "tagged " + names }
                break;

            case 'RGU':
                modifiedData = { ...each, subTitle: event_by?.name, title: "Task Reassigned to " + assigned_to.name }
                break;
            case 'MEA':
                modifiedData = { ...each, subTitle: event_by?.name, title: attachments.name }
                break;
            case 'RTS':
                modifiedData = { ...each, subTitle: event_by?.name, title: 'User Attached Reference Task' }
                break;
            case 'EVS':
                modifiedData = { ...each, subTitle: event_by?.name, title: 'Changed Status to ' + getObjectFromArrayByKey(GROUP_STATUS_LIST, 'id', group_status).text }
                break;
        }
        return modifiedData
    }

    let attach = photo.slice(-2, 4)

    const handleImagePicker = (index: number, file: any) => {
        let newUpdatedPhoto = [...photo, file];
        setPhoto(newUpdatedPhoto);
    };

    const proceedEditHandler = () => {
        const params = {
            id: selectMessage?.id,
            edited_message: message?.value
        }

        dispatch(
            addGroupMessage({
                params,
                onSuccess: (response: any) => () => {
                    if (response.success) {
                        showToast(response.message, 'success')
                        editModal.hide()
                        getGroupMessageApi(INITIAL_PAGE)

                    }
                },
                onError: (error) => () => {
                    showToast(error.error_message)
                },
            })
        );

    }


    console.log("====dashboard==", dashboardDetails)

    function proceedDeleteHandler() {
        const params = {
            id: selectMessage?.id,
            is_deleted: true
        }

        dispatch(
            addGroupMessage({
                params,
                onSuccess: (response: any) => () => {
                    if (response.success) {
                        showToast(response.message, 'success')
                        deleteModal.hide()
                        getGroupMessageApi(INITIAL_PAGE)
                    }
                },
                onError: (error) => () => {
                    showToast(error.error_message)
                },
            })
        );

    }
    let previousDate = '';

    return (
        <>
            <div
                id="scrollableDiv"
                style={{
                    height: height - 185,
                    display: 'flex',
                    flexDirection: 'column-reverse',
                }}
                className={'overflow-auto overflow-hide'}
            >
                <InfiniteScroll
                    dataLength={groupEvents.length}
                    hasMore={GroupCurrentPage !== -1}
                    scrollableTarget="scrollableDiv"
                    style={{ display: 'flex', flexDirection: 'column-reverse' }}
                    className={'overflow-auto overflow-hide'}
                    inverse={true}
                    loader={<h4>
                        <div className={'d-flex justify-content-center'}><Spinner /></div>
                    </h4>}
                    next={() => {

                        if (GroupCurrentPage !== -1) {
                            getGroupMessageApi(GroupCurrentPage)
                        }
                    }
                    }>


                    {groupEvents && groupEvents.length > 0 &&
                        groupEvents.map((item: any, index: number) => {
                            const { title, subTitle, created_at, attachments, event_by } = item

                            const imageUrls = attachments?.attachments?.map((each: { attachment_file: any; }) => getPhoto(each.attachment_file))
                            const loginUser = user_details?.id === event_by?.id

                            const timeString = getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(created_at));
                            const time = timeString.split(',')[1].trim();

                            const dateString = getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(created_at));
                            const date: any = dateString.split(',')[0].trim();

                            const getCurrentDay = (date: any) => {
                                const currentDate = new Date(date);
                                const options: any = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
                                return currentDate.toLocaleDateString('en-US', options);
                            };

                            const renderDate = (date !== previousDate) ? date : '';
                            previousDate = date;
                            const startDay = getCurrentDay(renderDate);



                            return (
                                <GroupChat
                                    profileImage={event_by?.profile_image}
                                    title={title}
                                    subTitle={subTitle}
                                    time={time}
                                    date={startDay}
                                    isEdit={loginUser}
                                    isDelete={loginUser}
                                    editOnClick={() => {
                                        setSelectMessage(item)
                                        editModal.show()
                                        message.set(title)
                                        setSelectDropzone(attachments.attachments)

                                    }}
                                    deleteOnClick={() => {
                                        setSelectMessage(item)
                                        deleteModal.show()
                                    }}
                                >

                                    <div className='pt-2' onClick={() => {
                                        imageModal.show()
                                        setImage(imageUrls)
                                    }} >
                                        {
                                            imageUrls && imageUrls.length > 0 && imageUrls.map(each => {
                                                return <Image className='ml-1 mb-1' src={each} width={100} height={100} />
                                            })
                                        }
                                    </div>

                                    <div>
                                        {
                                            imageUrls && imageUrls.length > 0 && (
                                                <ImageDownloadButton Url={imageUrls} title={title} className={"fa fa-download mt-1"} />
                                            )

                                        }
                                    </div>

                                </GroupChat>)
                        })
                    }
                </InfiniteScroll>

            </div>
            <Modal isOpen={imageModal.visible} onClose={imageModal.hide} size='lg'>
                <Carousel >

                    {
                        image.map((each, index) => (
                            <div>
                                <Image
                                    className='ml-1 mb-1'
                                    src={each}
                                    height={'100%'}
                                    width={'100%'}
                                />
                                <div className='d-flex justify-content-end'>
                                    <ImageDownloadButton Url={each} title={each} className={'fa fa-download mr-5'} />
                                </div>
                            </div>
                        ))
                    }

                </Carousel>

            </Modal>

            <Modal size={'lg'} title={translate('common.Edit Chat')!} isOpen={editModal.visible} onClose={editModal.hide} >

                <div className="col-md col-lg">

                    <div className='col-md col-lg'>
                        <textarea value={message.value} className="form-control form-control-sm" onChange={message.onChange}></textarea>
                    </div>

                    <div className="col">
                        <label className={`form-control-label`}>
                            {/* {translate("auth.attach")} */}
                            {translate("common.attach")}
                        </label>
                    </div>

                    <div className="row col-8 mx-1 ">
                        {selectDropzone &&
                            selectDropzone.map((el: any, index: number) => {
                                return (
                                    <Dropzone
                                        variant="ICON"
                                        icon={getPhoto(el?.attachment_file)}
                                        size="xl"
                                        onSelect={(image) => {
                                            let file = image.toString().replace(/^data:(.*,)?/, "");
                                            handleImagePicker(index, file);
                                            setSelectDropzone([{ id: "1" }, { id: "2" }]);
                                        }}
                                    />
                                );
                            })}
                    </div>
                </div>

                <div className="row justify-content-end">
                    <div className="col-md-5 col-lg-3 ">
                        <Button
                            className={'text-white'}
                            block
                            text={translate("order.Update")}
                            onClick={proceedEditHandler}
                        />
                    </div>
                </div>

            </Modal>
            <Modal isOpen={deleteModal.visible} size={'md'} onClose={deleteModal.hide}>
                <div>
                    <div className="h4"> {translate("errors.Are you sure you want to delete?")} </div>
                    <div className="row d-flex justify-content-end">
                        <Button className={'text-white'} text={'Delete'}
                            onClick={proceedDeleteHandler}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}

export { GroupMessage }


