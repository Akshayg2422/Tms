import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTaskEventHistory } from '@Redux';
import { getDisplayDateFromMoment, getDisplayDateTimeFromMoment, getMomentObjFromServer } from '@Utils';
import { TaskEventHistoryProps } from './interfaces'
import { TimeLine } from '@Components'

function TaskEventHistory({ }: TaskEventHistoryProps) {

    const dispatch = useDispatch();
    const { selectedTask, taskEventHistories } = useSelector((state: any) => state.TaskReducer);

    useEffect(() => {
        getTaskEventHistoryApi()
    }, [])

    const getTaskEventHistoryApi = () => {

        const params = {
            task_id: selectedTask.id,
        }

        dispatch(
            getTaskEventHistory({
                params,
                onSuccess: () => () => { },
                onError: () => () => { },
            })
        );
    }


    return (
        <div>
            {
                taskEventHistories && taskEventHistories?.length > 0 && taskEventHistories?.map((taskEvent: any, index: number) => {
                    const { by_user, created_at, tagged_users, assigned_to, event_type } = taskEvent
                    const show = index !== taskEventHistories.length - 1
                    return (
                        <TimeLine showDotterLine={show} title={by_user?.name} time={getDisplayDateFromMoment(getMomentObjFromServer(created_at))}>
                            <h6 className="text-sm mt-1 mb-0">
                                {tagged_users && tagged_users.length > 0 && tagged_users.map((taggedUser: any) => {
                                    return (
                                        <div>{taggedUser.name}</div>
                                    )
                                })}
                            </h6>
                            <h6 className="text-sm mt-1 mb-0">
                                {assigned_to?.name}
                            </h6>
                            <h6 className="text-sm mt-1 mb-0">
                                {event_type}
                            </h6>
                        </TimeLine >
                    )

                })
            }
        </div >
    )
}

export { TaskEventHistory }