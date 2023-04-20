import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { H, Image, Card, HomeContainer, Modal, Input, Button, DateTimePicker } from "@Components";
import { ETA, getDisplayDateFromMoment, getDisplayDateTimeFromMoment, getMomentObjFromServer, getPhoto, getServerTimeFromMoment } from '@Utils'
import { useNavigation } from "@Hooks";
import { addTaskEvent, getTasks } from "@Redux";
import { icons } from "@Assets";
import { TaskInfoProps } from './interfaces'
import { TagAndAssignUser, Timeline } from "@Modules";
import { translate } from "@I18n";

function TaskInfo({ onClick }: TaskInfoProps) {
    const { goBack } = useNavigation();

    const { taskItem, getSubTaskId, tasks, dashboardDetails } = useSelector((state: any) => state.AdminReducer);
    const { taskEvents } = useSelector((state: any) => state.CompanyReducer);
    const dispatch = useDispatch();
    const { title, description, by_user, raised_by_company, task_attachments, assigned_to, created_at, eta_time } = getSubTaskId ? getSubTaskId : taskItem;
    const [editEta, setEditEta] = useState(false)
    const etaMomentObj = getMomentObjFromServer(eta_time);
    const initialEtaValue = getDisplayDateTimeFromMoment(etaMomentObj);
    const [eta, setEta] = useState(initialEtaValue)
    const [timeline, setTimeline] = useState(false)
    const [currentTimeModal, setCurrentTimeModal] = useState(false)
    const [currentStartTime, setCurrentStartTime] = useState<Date>(new Date());
    const [currentEndTime, setCurrentEndTime] = useState<Date>(new Date());

    useEffect(() => {
        ProceedGetTaskEvents()
    }, [getSubTaskId])

    const handleEtaChange = (value: any) => {
        setEta(value);
    };

    const ProceedGetTaskEvents = () => {
        const params = {
            task_id: getSubTaskId ? getSubTaskId.id : taskItem?.id
        }

        dispatch(
            getTasks({
                params,
                onSuccess: (response) => () => { },
                onError: () => () => { },
            })
        );
    };

    const editEtaSubmitHandler = () => {
        const params = {
            id: getSubTaskId ? getSubTaskId.id : taskItem?.id,
            eta_time: getServerTimeFromMoment(getMomentObjFromServer(eta)),
            event_type: ETA,
        }

        dispatch(
            addTaskEvent({
                params,
                onSuccess: (response) => () => { },
                onError: (error) => () => { }
            })
        )
        setEditEta(!editEta)
    }


    useEffect(() => {

        // submitCurrentStartTime();

        const interval = setInterval(() => {
            setCurrentStartTime(new Date());
        }, 1000);

        return () => clearInterval(interval);

    }, [getSubTaskId]);

    const submitCurrentStartTime = () => {
        const params = {
            id: getSubTaskId ? getSubTaskId.id : taskItem?.id,
            event_type: "ETS",
            start_time: getServerTimeFromMoment(getMomentObjFromServer(currentStartTime)),
        };

        dispatch(
            addTaskEvent({
                params,
                onSuccess: (response) => () => { setCurrentTimeModal(!currentTimeModal) },
                onError: (error) => () => { }
            })
        );
    };


    useEffect(() => {

        // submitCurrentEndTime()
        const interval = setInterval(() => {
            setCurrentEndTime(new Date());
        }, 1000);

        return () => clearInterval(interval);

    }, [getSubTaskId]);

    const submitCurrentEndTime = () => {
        const params = {
            id: getSubTaskId ? getSubTaskId.id : taskItem?.id,
            event_type: "ETE",
            end_time: getServerTimeFromMoment(getMomentObjFromServer(currentEndTime)),
        }

        dispatch(
            addTaskEvent({
                params,
                onSuccess: (response) => () => { },
                onError: (error) => () => { }
            })
        )
    }
    // console.log('taskstaskstaskstaskstaskstaskstaskstaskstasks', JSON.stringify(tasks));


    return (
        <HomeContainer>

            <Card className={'mx--3'} style={{ height: '58vh' }}>
                <div className="row align-items-start">
                    <div
                        className={'col-1 m-0 p-0 mr--4 pointer'}
                        onClick={() => { goBack() }}
                    ><Image
                            size={'sm'}
                            variant='rounded'
                            className='bg-white mt--1'
                            src={icons.backArrow} />
                    </div>

                    <div className="col">
                        <H tag={"h4"} text={title} />
                    </div>
                    <div className="col-5 pl-5">
                        <H className={'mx-6 mb--1'} tag={"h5"} text={'CREATED AT :'} />
                        <h6 className="row text-uppercase ml-6 mr--1">{getDisplayDateFromMoment(getMomentObjFromServer(created_at))}
                            <div className="col-3 ml-1  mt--1 pointer"><TagAndAssignUser /></div></h6>
                    </div>
                </div>
                <H className={'text-muted'} tag={'h5'} text={description} />
                <div className="row align-items-center my-4">
                    <div className="col-8 mr-2">
                        {
                            task_attachments &&
                            task_attachments?.length > 0 &&
                            task_attachments?.map((item) => {
                                return <a
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}>
                                    <Image
                                        variant={'avatar'}
                                        src={getPhoto(item?.attachment_file)} /></a>
                            })
                        }
                    </div>
                    <div className="col ml--2">
                        <H className={'mx-5 mb--1'} tag={"h5"} text={'ETA :'} />
                        <h6 className="text-uppercase d-flex justify-content-end">
                            {getDisplayDateTimeFromMoment(getMomentObjFromServer(eta))}
                            <span onClick={() => { setEditEta(!editEta) }} className="bi bi-pencil mx-2 pl-1 pointer"></span>
                            <span onClick={() => { setTimeline(!timeline) }} className="mt-1 text-muted pointer ni ni-active-40"></span>
                        </h6>
                    </div>
                </div>
                <Modal isOpen={editEta}
                    onClose={() => { setEditEta(!editEta) }}
                >
                    <DateTimePicker
                        id="eta-picker"
                        heading="ETA"
                        placeholder={getDisplayDateTimeFromMoment(getMomentObjFromServer(eta))}
                        type="both"
                        onChange={handleEtaChange}
                    />
                    <Input
                        type={"text"}
                        heading={translate("common.reason")}
                    // value={.value}
                    // onChange={.onChange}
                    />
                    <Button text={'Submit'} className={'rounded-pill px-5'} onClick={() => editEtaSubmitHandler()} />

                </Modal>
                <Modal
                    className="modal-content shadow-none overflow-auto overflow-hide"
                    style={{
                        maxHeight: '90vh',
                        // maxWidth: '50vw',
                    }}
                    isOpen={timeline}
                    onClose={() => { setTimeline(!timeline) }}
                >
                    <Timeline />
                </Modal>
                <div className="row align-items-end my-4">
                    <div className="col-4">
                        <div className="h5 mb-0"> {by_user?.name} </div>
                        <div className="h5 mb-0"> {by_user?.phone} </div>
                        <div className="h5 mb-0"> {by_user?.email} </div>
                    </div>
                    <div className="col-1 m-0 p-0 align-self-center">
                        <div className="col p-0 d-flex justify-content-center">
                            {raised_by_company?.attachment_logo && <Image variant={'rounded'} src={getPhoto(raised_by_company?.attachment_logo)} />} </div>
                    </div>

                    <div className="col-4">
                        <h6>
                            <div className="h5 mb-0">
                                {raised_by_company?.display_name} </div>
                            <div className="h5 mb-0"> @<span
                                className="h5"> {assigned_to?.name} </span></div>
                            <div className="h5 mb-0"></div>
                            <div className={'text-uppercase text-muted'}>{raised_by_company?.address}</div>
                        </h6>
                    </div>

                    <div className="row">
                        {tasks && tasks.data.length > 0 && tasks.data.map((task: any) => {
                            // console.log('11',task.assigned_to?.id);
                            // console.log('22',dashboardDetails.user_details?.id);
                            return (
                                task.assigned_to?.id === dashboardDetails.user_details?.id ?
                                    <>
                                        <div className="col">
                                            <Button size={'sm'} text={'Start'} className={'rounded-pill px-3'} onClick={() => setCurrentTimeModal(!currentTimeModal)} />
                                        </div><Modal isOpen={currentTimeModal}
                                            onClose={() => { setCurrentTimeModal(!currentTimeModal); }}
                                        >
                                            <h5 className={''}>Are you sure you want to initiate the task ? </h5>
                                            <div className={'text-right'}>
                                                <Button size={'sm'} text={'Proceed'} className={'rounded-pill'} onClick={() => submitCurrentStartTime()} />
                                            </div>
                                        </Modal><div className="col text-right">
                                            <Button size={'sm'} color={'secondary'} text={'End'} className={'rounded-pill px-3'} onClick={() => submitCurrentEndTime()} />
                                        </div>
                                    </> : null
                            )
                        })}




                    </div>
                </div>
            </Card >
        </HomeContainer >

    );
}

export { TaskInfo };