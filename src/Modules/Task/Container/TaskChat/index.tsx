import React, { useEffect, useState } from 'react';
import { TaskChatProps } from './interfaces';
import { useSelector, useDispatch } from 'react-redux'
import { getTaskEvents } from '@Redux'
import { TimeLine, Spinner, Image } from '@Components'
import { getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer, INITIAL_PAGE, getPhoto } from '@Utils'
import InfiniteScroll from 'react-infinite-scroll-component';
import { icons } from '@Assets'
import { useWindowDimensions } from '@Hooks'



function TaskChat({ }: TaskChatProps) {

    const dispatch = useDispatch()
    const { selectedTask, refreshTaskEvents } = useSelector((state: any) => state.TaskReducer);
    const [taskEvents, setTaskEvents] = useState([])
    const [taskEventsCurrentPage, setEventsTaskCurrentPage] = useState(INITIAL_PAGE)
    const { height } = useWindowDimensions()


    useEffect(() => {
        getTaskEventsApi(INITIAL_PAGE)
    }, [selectedTask, refreshTaskEvents])



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
            task_id: selectedTask.id,
            page_number
        }

        console.log(JSON.stringify(params) + '======');


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
        const { event_type, by_user, message, eta_time, tagged_users, assigned_to, attachments } = each
        let modifiedData = {}
        switch (event_type) {
            case 'TEM':
                modifiedData = { ...each, icon: icons.message, subTitle: by_user?.name, title: message, }
                break;
            case 'ETA':
                modifiedData = { ...each, icon: icons.clock, subTitle: by_user?.name, title: "ETA Update on " + getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(eta_time)), }
                break;
            case 'TGU':
                let names = tagged_users.map(function (item) {
                    return '@' + item['name'] + " ";
                });
                modifiedData = { ...each, icon: icons.profile, subTitle: by_user?.name, title: "tagged " + names }
                break;

            case 'RGU':
                modifiedData = { ...each, icon: icons.profile, subTitle: by_user?.name, title: "Task Reassigned to " + assigned_to.name }
                break;
            case 'MEA':
                modifiedData = { ...each, icon: icons.pencil, subTitle: by_user?.name, title: attachments.name }
                break;
        }
        return modifiedData
    }


    console.log(JSON.stringify(taskEvents) + '====taskEvents');

    return (
        <div
            id="scrollableDiv"
            style={{
                height: height - 100,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
            }}
        >
            <InfiniteScroll
                dataLength={taskEvents.length}
                hasMore={taskEventsCurrentPage !== -1}
                scrollableTarget="scrollableDiv"
                style={{ display: 'flex', flexDirection: 'column-reverse' }}
                inverse={true}
                loader={<h4>
                    <Spinner />
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
                        return (
                            <TimeLine
                                icon={icon}
                                showDotterLine={showDotLine}
                                title={title} subTitle={subTitle}
                                time={getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(created_at))} >
                                <div className='pt-2'>

                                    {
                                        attachments?.attachments && attachments?.attachments.length > 0 && attachments?.attachments.map(each => {
                                            return <Image className='ml-1 mb-1' src={getPhoto(each.attachment_file)} width={120} height={120} />
                                        })
                                    }
                                </div>
                            </TimeLine>)
                    })
                }
            </InfiniteScroll>
        </div>

    );
}

export { TaskChat }

