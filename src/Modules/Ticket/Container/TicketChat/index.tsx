import React, { useEffect, useState } from 'react';
import { TicketChatProps } from './interface';
import { useSelector, useDispatch } from 'react-redux'
import { getTicketsEvents } from '@Redux'
import { TimeLine, Spinner, Image, Modal,  ImageDownloadButton} from '@Components'
import { getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer, INITIAL_PAGE, getPhoto, getObjectFromArrayByKey, TICKET_STATUS_LIST } from '@Utils'
import InfiniteScroll from 'react-infinite-scroll-component';
import { icons } from '@Assets'
import { useModal, useWindowDimensions } from '@Hooks'
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";




function TicketChat({ }: TicketChatProps) {

    const { id } = useParams();

    const dispatch = useDispatch()
    const { refreshTicketEvents } = useSelector((state: any) => state.TicketReducer);
    const [ticketEvents, setTicketEvents] = useState([])
    const imageModal = useModal(false)
    const [image, setImage] = useState([])
    const [ticketEventsCurrentPage, setEventsTicketCurrentPage] = useState(INITIAL_PAGE)
    const { height } = useWindowDimensions()


    useEffect(() => {
        getTicketEventsApi(INITIAL_PAGE)
    }, [refreshTicketEvents, id])



    function getTicketEventsDisplayData(data: any) {
        if (data && data.length > 0) {
            return data.map(each => {
                return {
                    ...getIconsFromStatus(each)
                }
            })

        }

    }
    const getTicketEventsApi = (page_number: number) => {
        const params = {
            code: id,
            page_number
            
        }

        dispatch(
            getTicketsEvents({
                params,
                onSuccess: (response: any) => () => {
                    const ticketEventsResponse = response.details
                    let updatedData = []
                    if (ticketEventsResponse.data && ticketEventsResponse.data.length > 0) {
                        if (page_number === 1) {
                            updatedData = getTicketEventsDisplayData(ticketEventsResponse.data)
                        } else {
                            updatedData = getTicketEventsDisplayData([...ticketEvents, ...ticketEventsResponse.data] as any)
                        }
                    }
                    setTicketEvents(updatedData)
                    setEventsTicketCurrentPage(ticketEventsResponse.next_page)

                },
                onError: () => () => { },
            })
        );
    };

    function getIconsFromStatus(each: any) {
        const { event_type, by_user, message, eta_time, tagged_users, assigned_to, attachments, ticket_status } = each

        let modifiedData = {}
        switch (event_type) {
            case 'TEM':
                modifiedData = { ...each, icon: icons.message, subTitle: by_user?.name, title: message, }
                break;
            case 'ETA':
                modifiedData = { ...each, icon: icons.clock, subTitle: by_user?.name, title: "ETA Updated on " + getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(eta_time)), }
                break;
            case 'TGU':
                let names = tagged_users.map(function (item) {
                    return '@' + item['name'] + " ";
                });
                modifiedData = { ...each, icon: icons.profile, subTitle: by_user?.name, title: "tagged " + names }
                break;

            case 'RGU':
                modifiedData = { ...each, icon: icons.profile, subTitle: by_user?.name, title: "Ticket Reassigned to " + assigned_to.name }
                break;
            case 'MEA':
                modifiedData = { ...each, icon: icons.pencil, subTitle: by_user?.name, title: attachments.name }
                break;
            case 'RTS':
                modifiedData = { ...each, icon: icons.pencil, subTitle: by_user?.name, title: 'User Attached Reference Ticket' }
                break;
            case 'EVS':
                modifiedData = { ...each, icon: icons.pencil, subTitle: by_user?.name, title: 'Changed Status to ' + getObjectFromArrayByKey(TICKET_STATUS_LIST, 'id', ticket_status).text }
                break;
        }
        return modifiedData
    }

    return (
        <div
            id="scrollableDiv"
            style={{
                height: height - 100,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
            }}
            className={'overflow-auto overflow-hide'}
        >
            <InfiniteScroll
                className={'overflow-auto overflow-hide'}
                dataLength={ticketEvents.length}
                hasMore={ticketEventsCurrentPage !== -1}
                scrollableTarget="scrollableDiv"
                style={{ display: 'flex', flexDirection: 'column-reverse', overflowY: "auto" }}
                inverse={true}
                loader={<h4>
                    <Spinner />
                </h4>}
                next={() => {
                    if (ticketEventsCurrentPage !== -1) {
                        getTicketEventsApi(ticketEventsCurrentPage)
                    }
                }
                }>

                {ticketEvents && ticketEvents.length > 0 &&
                    ticketEvents.map((ticket: any, index: number) => {
                        const { icon, title, subTitle, created_at, attachments } = ticket
                        const showDotLine = index !== 0
                        const imageUrls = attachments?.attachments?.map(each => getPhoto(each.attachment_file))

                        return (
                            <TimeLine
                                icon={icon}
                                showDotterLine={showDotLine}
                                title={title} subTitle={subTitle}
                                time={getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(created_at))} >

                                <div className='pt-2' onClick={() => {
                                    imageModal.show()
                                    setImage(imageUrls)
                                    console.log('mnsbvhdfggu ,cmnbjgyh')
                                }} >

                                    <div>

                                        {
                                            imageUrls && imageUrls.length > 0 && imageUrls.map(each => {
                                                console.log('knfn kf kf ,',each)

                                                return (<Image className='ml-1 mb-1' src={each} width={100} height={100}
                                                 />
                                                )
                                            })

                                        }
                                    </div>
                                    
                                </div>
                                
                                <div>
                                        {
                                            imageUrls && imageUrls.length > 0 && (
                                                <ImageDownloadButton Url={imageUrls} title={title} />
                                            )

                                        }
                                    </div>
                            </TimeLine>)
                    })
                }
            </InfiniteScroll>

            <Modal isOpen={imageModal.visible} onClose={imageModal.hide} size='md'>
                <Carousel 
                >
                    
                    {
                        image.map(each => {
                        
                            return (<Image
                                className='ml-1 mb-1'
                                src={each}
                                height={'90%'}
                                width={'80%'}
                            />
                            )
                        })
                    }
                </Carousel>


            </Modal>




        </div>

    );
}

export { TicketChat }

