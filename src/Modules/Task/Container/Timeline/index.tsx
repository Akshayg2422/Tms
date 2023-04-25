import React, { useEffect } from 'react'
import { CardBody, CardHeader } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getTaskHistory } from '@Redux';
import { getDisplayDateFromMoment, getMomentObjFromServer } from '@Utils';

function Timeline() {

    const dispatch = useDispatch();
    const { taskItem, getSubTaskId, taskHistoryList } = useSelector((state: any) => state.AdminReducer);


    useEffect(() => {
        getTaskHistoryTimeline()
    }, [getSubTaskId])

    const getTaskHistoryTimeline = () => {

        const params = {
            task_id: getSubTaskId ? getSubTaskId.id : taskItem?.id
        }
        dispatch(
            getTaskHistory({
                params,
                onSuccess: (response: any) => () => { },
                onError: (error) => () => { },
            })
        );
    }


    return (
        <>
            <CardHeader className={'mt--5'}>
                <h5 className="h3 mb-0">Latest Events</h5>
            </CardHeader>
            {
                taskHistoryList && taskHistoryList.data?.length > 0 && taskHistoryList.data?.map((el: any) => {
                    return (
                        <>

                            <CardBody className={'shadow-none mb--4'}>
                                <div
                                    className="timeline timeline-one-side my--3"
                                    data-timeline-axis-style="dashed"
                                    data-timeline-content="axis"
                                >
                                    {el.event_type === 'TGU' ?
                                        <div className="timeline-block">
                                            <span className="timeline-step badge-success">
                                                <i className="ni ni-bell-55" />
                                            </span>
                                            <div className="timeline-content">
                                                <div className="d-flex justify-content-between pt-1">
                                                    <div>
                                                        <span className="text-muted text-sm font-weight-bold">
                                                            {el.by_user?.name}
                                                        </span>
                                                    </div>
                                                    <div className="text-right">
                                                        <small className="text-muted">
                                                            <i className="fas fa-clock mr-1" />
                                                            {getDisplayDateFromMoment(getMomentObjFromServer(el.created_at))}
                                                        </small>
                                                    </div>
                                                </div>
                                                <h6 className="text-sm mt-1 mb-0">
                                                    {el.tagged_users && el.tagged_users.length > 0 && el.tagged_users.map((taggedUser) => {
                                                        return (
                                                            <div>{taggedUser.name}</div>
                                                        )
                                                    })}
                                                </h6>
                                                <h6 className="text-sm">
                                                    {el.event_type === 'TGU' ? <small className={'text-muted'}>TAGGED USERS</small> : null}

                                                </h6>
                                            </div>
                                        </div> : null
                                    }

                                    {el.event_type === 'RGU' ?
                                        <div className="timeline-block">
                                            <span className="timeline-step badge-info">
                                                <i className="ni ni-bell-55" />
                                            </span>
                                            <div className="timeline-content">
                                                <div className="d-flex justify-content-between pt-1">
                                                    <div>
                                                        <span className="text-muted text-sm font-weight-bold">
                                                            {el.by_user?.name}
                                                        </span>
                                                    </div>
                                                    <div className="text-right">
                                                        <small className="text-muted">
                                                            <i className="fas fa-clock mr-1" />
                                                            {getDisplayDateFromMoment(getMomentObjFromServer(el.created_at))}
                                                        </small>
                                                    </div>
                                                </div>
                                                <h6 className="text-sm mt-1 mb-0">
                                                    {el.assigned_to?.name}
                                                </h6>
                                                <h6 className="text-sm">
                                                    {el.event_type === 'RGU' ? <small className={'text-muted'}>REASSIGNED USER</small> : null}
                                                </h6>
                                            </div>
                                        </div> : null}
                                </div>
                            </CardBody>

                        </>
                    )
                })
            }

        </>
    )
}

export { Timeline }