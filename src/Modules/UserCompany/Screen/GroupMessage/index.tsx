import React, { useEffect, useState } from 'react';
import { GroupMessageProps } from './interfaces';
import { useSelector, useDispatch } from 'react-redux'
import { getGroupMessage } from '@Redux'
import { TimeLine, Spinner, Image, Modal, Card, ImageDownloadButton } from '@Components'
import { getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer, INITIAL_PAGE, getPhoto, getObjectFromArrayByKey, GROUP_STATUS_LIST } from '@Utils'
import InfiniteScroll from 'react-infinite-scroll-component';
import { icons } from '@Assets'
import { useModal, useWindowDimensions } from '@Hooks'
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function GroupMessage({ }: GroupMessageProps) {

    const { id } = useParams();
    const dispatch = useDispatch()
    // const [isConfirming, setIsConfirming] = useState(false);
    const { refreshGroupEvents, selectedGroupChatCode } = useSelector((state: any) => state.UserCompanyReducer);
    const [groupEvents, setGroupEvents] = useState([])
    const [GroupCurrentPage, setGroupCurrentPage] = useState(INITIAL_PAGE)
    const { height } = useWindowDimensions()
    const [image, setImage] = useState([])
    const imageModal = useModal(false)


    useEffect(() => {
        getGroupMessageApi(INITIAL_PAGE)
    }, [refreshGroupEvents, selectedGroupChatCode])

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
            group_id: selectedGroupChatCode,
            page_number
        }

        if (selectedGroupChatCode) {
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
                modifiedData = { ...each, icon: icons.message, subTitle: event_by?.name, title: message, }
                break;
            case 'ETA':
                modifiedData = { ...each, icon: icons.clock, subTitle: event_by?.name, title: "ETA Updated on " + getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(eta_time)), }
                break;
            case 'TGU':
                let names = tagged_users.map(function (item) {
                    return '@' + item['name'] + " ";
                });
                modifiedData = { ...each, icon: icons.taggedUserWhiteIcon, subTitle: event_by?.name, title: "tagged " + names }
                break;

            case 'RGU':
                modifiedData = { ...each, icon: icons.reassignedUserWhiteIcon, subTitle: event_by?.name, title: "Task Reassigned to " + assigned_to.name }
                break;
            case 'MEA':
                modifiedData = { ...each, icon: icons.attachmentWhiteIcon, subTitle: event_by?.name, title: attachments.name }
                break;
            case 'RTS':
                modifiedData = { ...each, icon: icons.referenceTaskWhiteIcon, subTitle: event_by?.name, title: 'User Attached Reference Task' }
                break;
            case 'EVS':
                modifiedData = { ...each, icon: icons.statusWhiteIcon, subTitle: event_by?.name, title: 'Changed Status to ' + getObjectFromArrayByKey(GROUP_STATUS_LIST, 'id', group_status).text }
                break;
        }
        return modifiedData
    }

    // const handleDelete = () => {
    //     onDelete();
    //     setIsConfirming(false);
    // };

    // const toggleConfirmation = () => {
    //     setIsConfirming((prevState) => !prevState);
    // };

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
                        {/* <Spinner /> */}
                    </h4>}
                    next={() => {

                        if (GroupCurrentPage !== -1) {
                            getGroupMessageApi(GroupCurrentPage)
                        }
                    }
                    }>

                    {groupEvents && groupEvents.length > 0 &&
                        groupEvents.map((task: any, index: number) => {
                            const { icon, title, subTitle, created_at, attachments } = task
                            const showDotLine = index !== 0
                            const imageUrls = attachments?.attachments?.map(each => getPhoto(each.attachment_file))
                            console.log("==============>Task", task);



                            return (
                                <TimeLine
                                    icon={icon}
                                    showDotterLine={showDotLine}
                                    title={title} subTitle={subTitle}
                                    time={getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(created_at))} >

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
                                                <ImageDownloadButton Url={imageUrls} title={title} />
                                            )

                                        }
                                    </div>
                                    {/* <div>
                                        {!isConfirming ? (
                                            <button onClick={toggleConfirmation}>Delete</button>
                                        ) : (
                                            <div>
                                                <p>Are you sure you want to delete?</p>
                                                <button onClick={handleDelete}>Yes</button>
                                                <button onClick={toggleConfirmation}>No</button>
                                            </div>
                                        )}
                                    </div> */}



                                </TimeLine>)
                        })
                    }
                </InfiniteScroll>


            </div>
            <Modal isOpen={imageModal.visible} onClose={imageModal.hide} size='lg'>
                <Carousel >
                    {
                        image.map(each => {
                            return <Image
                                className='ml-1 mb-1'
                                src={each}
                                height={'100%'}
                                width={'100%'}
                            />
                        })
                    }
                </Carousel>
            </Modal>
        </>


    );
}

export { GroupMessage }

function onDelete() {
    throw new Error('Function not implemented.');
}

