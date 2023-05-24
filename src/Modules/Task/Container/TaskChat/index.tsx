import React, { useEffect, useState } from 'react';
import { TaskChatProps } from './interfaces';
import { useSelector, useDispatch } from 'react-redux'
import { getTaskEvents } from '@Redux'
import { TimeLine, Spinner, Image, Modal } from '@Components'
import { getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer, INITIAL_PAGE, getPhoto, getObjectFromArrayByKey, TASK_STATUS_LIST } from '@Utils'
import InfiniteScroll from 'react-infinite-scroll-component';
import { icons } from '@Assets'
import { useModal, useWindowDimensions } from '@Hooks'
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


function TaskChat({ }: TaskChatProps) {

    const { id } = useParams();
    const dispatch = useDispatch()
    const { refreshTaskEvents } = useSelector((state: any) => state.TaskReducer);
    const [taskEvents, setTaskEvents] = useState([])
    const [taskEventsCurrentPage, setEventsTaskCurrentPage] = useState(INITIAL_PAGE)
    const { height } = useWindowDimensions()
    const [image, setImage] = useState([])
    const imageModal = useModal(false)


    useEffect(() => {
        getTaskEventsApi(INITIAL_PAGE)
    }, [refreshTaskEvents, id])

    function getTaskEventsDisplayData(data: any) {
        if (data && data.length > 0) {
            return data.map(each => {
                return {
                    ...getIconsFromStatus(each)
                }
            })
        }

    }
    const getTaskEventsApi = (page_number: number) => {
        const params = {
            task_id: id,
            page_number
        }

        dispatch(
            getTaskEvents({
                params,
                onSuccess: (response: any) => () => {
                    const taskEventsResponse = response.details
                    let updatedData = []
                    if (taskEventsResponse.data && taskEventsResponse.data.length > 0) {
                        if (page_number === 1) {
                            updatedData = getTaskEventsDisplayData(taskEventsResponse.data)
                        } else {
                            updatedData = getTaskEventsDisplayData([...taskEvents, ...taskEventsResponse.data] as any)
                        }
                    }
                    setTaskEvents(updatedData)
                    setEventsTaskCurrentPage(taskEventsResponse.next_page)
                },
                onError: () => () => { },
            })
        );
    };

    function getIconsFromStatus(each: any) {

        const { event_type, by_user, message, eta_time, tagged_users, assigned_to, attachments, task_status } = each
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
                modifiedData = { ...each, icon: icons.taggedUserWhiteIcon, subTitle: by_user?.name, title: "tagged " + names }
                break;

            case 'RGU':
                modifiedData = { ...each, icon: icons.reassignedUserWhiteIcon, subTitle: by_user?.name, title: "Task Reassigned to " + assigned_to.name }
                break;
            case 'MEA':
                modifiedData = { ...each, icon: icons.attachmentWhiteIcon, subTitle: by_user?.name, title: attachments.name }
                break;
            case 'RTS':
                modifiedData = { ...each, icon: icons.referenceTaskWhiteIcon, subTitle: by_user?.name, title: 'User Attached Reference Task' }
                break;
            case 'EVS':
                modifiedData = { ...each, icon: icons.statusWhiteIcon, subTitle: by_user?.name, title: 'Changed Status to ' + getObjectFromArrayByKey(TASK_STATUS_LIST, 'id', task_status).text }
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
                dataLength={taskEvents.length}
                hasMore={taskEventsCurrentPage !== -1}
                scrollableTarget="scrollableDiv"
                className='overflow-auto overflow-hide'
                style={{ display: 'flex', flexDirection: 'column-reverse', overflowY: 'auto' }}
                inverse={true}
                loader={<h4>
                    {/* <Spinner /> */}
                </h4>}
                next={() => {
                    console.log('came');

                    console.log(taskEventsCurrentPage + '====');
                    if (taskEventsCurrentPage !== -1) {
                        getTaskEventsApi(taskEventsCurrentPage)
                    }
                }
                }>
                {taskEvents && taskEvents.length > 0 &&
                    taskEvents.map((task: any, index: number) => {
                        const { icon, title, subTitle, created_at, attachments } = task
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
                                }} >
                                    <div>
                                        {
                                            imageUrls && imageUrls.length > 0 && imageUrls.map(each => {
                                                return <Image className='ml-1 mb-1' src={each} width={100} height={100} />
                                            })
                                        }
                                    </div>
                                </div>
                            </TimeLine>)
                    })
                }
            </InfiniteScroll>

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
        </div>


    );
}

export { TaskChat }

