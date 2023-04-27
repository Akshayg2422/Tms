import React, { useEffect } from 'react';
import { TaskChatProps } from './interfaces';
import { useSelector, useDispatch } from 'react-redux'
import { getDataAndTime } from '@Utils';
import { getTaskEvents } from '@Redux'
import { TimeLine, Spinner } from '@Components'
import { getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer, INITIAL_PAGE } from '@Utils'
import InfiniteScroll from 'react-infinite-scroll-component';
import { log } from 'console';


function Send({ item, showDotLine }: any) {
    const { created_at, event_type } = item
    return (
        <div className='d-flex  justify-content-end'>
            <div className='col-5'>
                <TimeLine rtl showDotterLine={showDotLine} title={event_type} time={getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(created_at))} />
            </div>
        </div>
    )
}

function Receive({ item, showDotLine }: any) {
    const { created_at, event_type } = item
    return (
        <div className='d-flex'>
            <div className='col-5'>
                <TimeLine showDotterLine={showDotLine} title={event_type} time={getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(created_at))} />
            </div>
        </div>
    )
}

function TaskChat({ }: TaskChatProps) {

    const dispatch = useDispatch()

    const { taskEvents, selectedTask, taskEventsCurrentPages } = useSelector((state: any) => state.TaskReducer);
    const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);

    useEffect(() => {
        getTaskEventsApi(INITIAL_PAGE)
    }, [selectedTask])



    const getTaskEventsApi = (page_number: number) => {
        const params = {
            task_id: selectedTask.id,
            page_number
        }
        dispatch(
            getTaskEvents({
                params,
                onSuccess: () => () => { },
                onError: () => () => { },
            })
        );
    };

    return (
        <div>
            {taskEvents && taskEvents.length > 0 &&
                <InfiniteScroll
                    dataLength={taskEvents.length}
                    hasMore={taskEventsCurrentPages !== -1}
                    loader={<h4>
                        <Spinner />
                    </h4>}
                    next={() => {
                        console.log('came' + taskEventsCurrentPages)
                        if (taskEventsCurrentPages !== -1) {
                            getTaskEventsApi(taskEventsCurrentPages)
                        }
                    }
                    }>
                    {
                        taskEvents.map((task: any, index: number) => {
                            const { by_user } = task
                            const isUser = by_user?.id === dashboardDetails?.user_details?.id;
                            const showDotLine = index !== taskEvents.length - 1
                            return <div>{isUser ? <Send item={task} showDotLine={showDotLine} /> : <Receive item={task} showDotLine={showDotLine} />}</div>
                        })
                    }
                </InfiniteScroll>
            }
        </div >
    );
}

export { TaskChat }

