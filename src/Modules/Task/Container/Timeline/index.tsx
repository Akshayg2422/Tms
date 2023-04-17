import React, { useEffect } from 'react'
import { Card } from '@Components'
import { CardBody, CardHeader } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getTaskHistory } from '@Redux';
import { getDisplayDateFromMoment, getMomentObjFromServer } from '@Utils';

function Timeline() {

    const dispatch = useDispatch();
    const { taskItem, getSubTaskId, taskHistoryList } = useSelector((state: any) => state.AdminReducer);



    const { by_user, event_type, eta_time, created_at, tagged_users, assigned_to } = getSubTaskId ? getSubTaskId : taskHistoryList

    useEffect(() => {
        console.log('121212121212122121')
        getTaskHistoryTimeline()
    }, [getSubTaskId])

    const getTaskHistoryTimeline = () => {

        const params = {
            task_id: getSubTaskId ? getSubTaskId?.id : taskItem?.id
        }
        console.log('1111111111', JSON.stringify(params))
        dispatch(
            getTaskHistory({
                params,
                onSuccess: (response: any) => () => { console.log('getTaskGroupTimeline---------->', response) },
                onError: (error) => () => { console.log('getTaskGroupTimeline---------->', error) },
            })
        );
    }
    console.log('stateeeeeeeeeeeeeeeeeeeeeeeeeee', JSON.stringify(taskHistoryList))

    return (
        <>
            <CardHeader className={'mt--5'}>
                <h5 className="h3 mb-0">Latest Events</h5>
            </CardHeader>
            <CardBody className={'shadow-none mb--4'}>
                <div
                    className="timeline timeline-one-side"
                    data-timeline-axis-style="dashed"
                    data-timeline-content="axis"
                >
                    <div className="timeline-block">
                        <span className="timeline-step badge-success">
                            <i className="ni ni-bell-55" />
                        </span>
                        <div className="timeline-content">
                            <div className="d-flex justify-content-between pt-1">
                                <div>
                                    <span className="text-muted text-sm font-weight-bold">
                                        {by_user?.name}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <small className="text-muted">
                                        <i className="fas fa-clock mr-1" />
                                        {getDisplayDateFromMoment(getMomentObjFromServer(created_at))}
                                    </small>
                                </div>
                            </div>
                            <h6 className="text-sm mt-1 mb-0">
                                {tagged_users?.name}{assigned_to?.name}
                            </h6>
                        </div>
                    </div>
                    <div className="timeline-block">
                        <span className="timeline-step badge-success">
                            <i className="ni ni-bell-55" />
                        </span>
                        <div className="timeline-content">
                            <div className="d-flex justify-content-between pt-1">
                                <div>
                                    <span className="text-muted text-sm font-weight-bold">
                                        {by_user?.name}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <small className="text-muted">
                                        <i className="fas fa-clock mr-1" />
                                        {getDisplayDateFromMoment(getMomentObjFromServer(created_at))}
                                    </small>
                                </div>
                            </div>
                            <h6 className="text-sm mt-1 mb-0">
                                {tagged_users?.name}{assigned_to?.name}
                            </h6>
                        </div>
                    </div>
                    <div className="timeline-block">
                        <span className="timeline-step badge-success">
                            <i className="ni ni-bell-55" />
                        </span>
                        <div className="timeline-content">
                            <div className="d-flex justify-content-between pt-1">
                                <div>
                                    <span className="text-muted text-sm font-weight-bold">
                                        {by_user?.name}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <small className="text-muted">
                                        <i className="fas fa-clock mr-1" />
                                        {getDisplayDateFromMoment(getMomentObjFromServer(created_at))}
                                    </small>
                                </div>
                            </div>
                            <h6 className="text-sm mt-1 mb-0">
                                {tagged_users?.name}{assigned_to?.name}
                            </h6>
                        </div>
                    </div>
                </div>
            </CardBody>

        </>
    )
}

export { Timeline }