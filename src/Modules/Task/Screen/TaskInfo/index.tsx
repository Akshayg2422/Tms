import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { H, Image, Card, HomeContainer, Modal, Input, Button } from "@Components";
import { ETA, getDisplayDateFromMoment, getDisplayDateTimeFromMoment, getMomentObjFromServer, getPhoto, getServerTimeFromMoment } from '@Utils'
import { useInput, useNavigation } from "@Hooks";
import { addTaskEvent, getTasks } from "@Redux";
import { icons } from "@Assets";
import { TaskInfoProps } from './interfaces'
import { TagAndAssignUser, Timeline } from "@Modules";

function TaskInfo({ onClick }: TaskInfoProps) {
    const { goBack } = useNavigation();

    const { taskItem, getSubTaskId } = useSelector((state: any) => state.AdminReducer);
    const { taskEvents } = useSelector((state: any) => state.CompanyReducer);
    const dispatch = useDispatch();
    const { title, description, by_user, raised_by_company, task_attachments, assigned_to, created_at, eta_time, order_sequence } = getSubTaskId ? getSubTaskId : taskItem;
    const [editEta, setEditEta] = useState(false)
    const etaMomentObj = getMomentObjFromServer(eta_time);
    const initialEtaValue = getDisplayDateTimeFromMoment(etaMomentObj);
    const editModalName = useInput(initialEtaValue);
    const [timeline, setTimeline] = useState(false)

    useEffect(() => {
        ProceedGetTaskEvents()
    }, [getSubTaskId])


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
            eta_time: getServerTimeFromMoment(getMomentObjFromServer(editModalName.value)),
            event_type: ETA,
        }

        dispatch(
            addTaskEvent({
                params,
                onSuccess: (response) => () => { ProceedGetTaskEvents() },
                onError: (error) => () => { }
            })
        )
        setEditEta(!editEta)
    }



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
                            src={icons.backArrow} /></div>


                    <div className="col-6">
                        <H tag={"h4"} text={title} />
                    </div>
                    <div className="col ml-2">
                        <h6 className="text-uppercase d-flex justify-content-end">{getDisplayDateFromMoment(getMomentObjFromServer(created_at))}<span className="mt--1 d-flex justify-content-end pointer"><TagAndAssignUser /></span></h6>
                    </div>
                </div>
                <H className={'text-muted'} tag={'h5'} text={description} />
                <div className="row align-items-center my-4">
                    <div className="col-5">
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
                    <div className="col">
                        <h6 className="text-uppercase d-flex justify-content-end">
                            {editModalName.value}
                            <span onClick={() => { setEditEta(!editEta) }} className="bi bi-pencil mx-2 pointer"></span>
                            <span onClick={() => { setTimeline(!timeline) }} className="mt-1 text-muted pointer ni ni-active-40"></span>
                        </h6>
                    </div>
                </div>
                <Modal isOpen={editEta}
                    onClose={() => { setEditEta(!editEta) }}
                >
                    <Input className='rounded-pill' heading={'Name'}
                        value={editModalName.value} onChange={editModalName.onChange} />
                    <Button text={'Submit'} className={'rounded-pill px-5'} onClick={() => editEtaSubmitHandler()} />

                </Modal>
                <Modal isOpen={timeline}
                    onClose={() => { setTimeline(!timeline) }}
                >
                    <Timeline/>
                </Modal>
                <div className="row align-items-end my-4">
                    <div className="col">
                        <div className="h5 mb-0"> {by_user?.name} </div>
                        <div className="h5 mb-0"> {by_user?.phone} </div>
                        <div className="h5 mb-0"> {by_user?.email} </div>
                    </div>
                    <div className="col align-self-center mx--4">
                        <div className="col p-0 d-flex justify-content-center mr--2">
                            {raised_by_company?.attachment_logo && <Image variant={'rounded'} src={getPhoto(raised_by_company?.attachment_logo)} />} </div>
                    </div>

                    <div className="col-6">
                        <h6>
                            <div className="h5 mb-0">
                                {raised_by_company?.display_name} </div>
                            <div className="h5 mb-0"> @<span
                                className="h5"> {assigned_to?.name} </span></div>
                            <div className="h5 mb-0"></div>
                            <div className={'text-uppercase text-muted'}>{raised_by_company?.address}</div>
                        </h6>
                    </div>
                    <div className="col"></div>
                </div>
            </Card >
        </HomeContainer >

    );
}

export { TaskInfo };