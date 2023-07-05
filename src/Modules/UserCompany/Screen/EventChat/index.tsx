import React, { useEffect, useState } from 'react';
import { EventChatProps } from './interfaces';
import { useSelector, useDispatch } from 'react-redux'
import { getAttachmentsMessage, } from '@Redux'
import { TimeLine, Spinner, Image, Modal, ImageDownloadButton } from '@Components'
import { getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer, INITIAL_PAGE, getPhoto, getObjectFromArrayByKey, EVENT_STATUS_LIST } from '@Utils'
import InfiniteScroll from 'react-infinite-scroll-component';
import { icons } from '@Assets'
import { useModal, useWindowDimensions } from '@Hooks'
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CardFooter } from 'reactstrap';
// import {  } from '@Components//Component/ImageDownloadButton';


function GetEventChat({ }: EventChatProps) {

    const { id } = useParams();
    const dispatch = useDispatch()
    const { eventsMessage, refreshEventMessage } = useSelector((state: any) => state.TaskReducer);
    const [getEvents, setGetEvents] = useState([])
    const [getEventsCurrentPage, setGetEventsCurrentPage] = useState(INITIAL_PAGE)
    const { height } = useWindowDimensions()
    const [image, setImage] = useState([])
    const imageModal = useModal(false)
    const [corouselIndex, setCorouselIndex] = useState<any>()


    useEffect(() => {
        getAttachmentsMessageApi(INITIAL_PAGE)
    }, [eventsMessage, id, refreshEventMessage])

    function getEventsChatDisplayData(data: any) {
        if (data && data.length > 0) {
            return data.map(each => {
                console.log(each,"tttttttttt")
                return {
                    ...getIconsFromStatus(each)
                }
            })
        }

    }
    const getAttachmentsMessageApi = (page_number: number) => {
        console.log('getAttachmentsMessageApi========>>>', eventsMessage);

        const params = {
            event_id: eventsMessage,
            page_number
        }

        dispatch(
            getAttachmentsMessage({
                params,
                onSuccess: (response: any) => () => {
                    const getEventsResponse = response.details
                    let updatedData = []
                    if (getEventsResponse.data && getEventsResponse.data.length > 0) {
                        if (page_number === 1) {
                            updatedData = getEventsChatDisplayData(getEventsResponse.data)
                        } else {
                            updatedData = getEventsChatDisplayData([...getEvents, ...getEventsResponse.data] as any)
                        }
                    }
                    setGetEvents(updatedData)
                    setGetEventsCurrentPage(getEventsResponse.next_page)
                },
                onError: () => () => { },
            })
        );
    };

    function getIconsFromStatus(each: any) {

        const { event_type, event_by, message, eta_time, tagged_users, assigned_to, attachments, events_status, end_time, start_time } = each
        let modifiedData = {}
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
                modifiedData = { ...each, icon: icons.statusWhiteIcon, subTitle: event_by?.name, title: 'Changed Status to ' + getObjectFromArrayByKey(EVENT_STATUS_LIST, 'id', events_status).text }
                break;
            case 'ETE':
                modifiedData = { ...each, icon: icons.endTime, subTitle: event_by?.name, title: 'Event End time is ' + getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(end_time)) }
                break;
            case 'ETS':
                modifiedData = { ...each, icon: icons.startTime, subTitle: event_by?.name, title: 'Event Start time is ' + getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(start_time)) }
                break;

        }
        return modifiedData
    }


    return (
        <div
            id="scrollableDiv"
            style={{
                height: height - 186,
                display: 'flex',
                flexDirection: 'column-reverse',
            }}
            className={'overflow-auto overflow-hide'}
        >
            <InfiniteScroll
                dataLength={getEvents.length}
                hasMore={getEventsCurrentPage !== -1}
                scrollableTarget="scrollableDiv"
                className='overflow-auto overflow-hide'
                style={{ display: 'flex', flexDirection: 'column-reverse', overflowY: 'auto' }}
                inverse={true}
                loader={<h4>
                    {/* <Spinner /> */}
                </h4>}
                next={() => {
                    console.log('came');

                    console.log(getEventsCurrentPage + '====');
                    if (getEventsCurrentPage !== -1) {
                        getAttachmentsMessageApi(getEventsCurrentPage)
                    }
                }
                }>
                {getEvents && getEvents.length > 0 &&
                    getEvents.map((Events: any, index: number) => {
                        console.log('Events========>', Events);

                        const { icon, title, subTitle, created_at, attachments } = Events
                        const showDotLine = index !== 0
                        const imageUrls = attachments?.attachments?.map(each => getPhoto(each.attachment_file))

                        return (
                            <TimeLine
                                icon={icon}
                                showDotterLine={showDotLine}
                                title={title} subTitle={subTitle}
                                time={getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(created_at))} >

                                <div className='pt-2 col-md-3' onClick={() => {
                                    imageModal.show()
                                    setImage(imageUrls)
                                }} >
                                    {
                                        imageUrls && imageUrls.length > 0 && imageUrls.map((each, index) => {

                                            return (
                                                <div onClick={() => { setCorouselIndex(index) }}>

                                                    <Image className='ml-1 mb-1' src={each} width={100} height={100} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            </TimeLine>)
                    })
                }
            </InfiniteScroll>

            <Modal isOpen={imageModal.visible} onClose={imageModal.hide} size='md'>
                <div className={'mt--5 mb--6 mx--4'}>
                    <Carousel selectedItem={corouselIndex}>

                        {
                            image.map((each, index) => (
                                <>
                                    <div>
                                        <Image
                                            className='ml-2 mr-2'
                                            src={each}
                                            style={{ height: '450px', width: '450px' }}
                                        />
                                    </div>

                                    <CardFooter className={'mt-2'}>
                                        <div className='d-flex justify-content-end mt--6 mr-4 pointer'>
                                            <ImageDownloadButton Url={each} title={each} />
                                        </div>
                                    </CardFooter>
                                </>
                            ))
                        }

                    </Carousel>
                </div>

            </Modal>
        </div>


    );
}

export { GetEventChat }

