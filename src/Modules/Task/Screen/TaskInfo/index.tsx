
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { H, Image, Card, HomeContainer, Modal, Input, Button } from "@Components";
import { ETA, getDisplayDateFromMoment, getDisplayDateTimeFromMoment, getMomentObjFromServer, getPhoto, getServerTimeFromMoment } from '@Utils'
import { useInput, useNavigation } from "@Hooks";
import { addTaskEvent, getTaskEvents } from "@Redux";
import { TagAndAssignUser } from "../TagAndAssignUser";

function TaskInfo() {

    const { taskItem } = useSelector((state: any) => state.AdminReducer);
    const dispatch = useDispatch();
    const { title, description, by_user, raised_by_company, task_attachments, assigned_to, created_at, eta_time } = taskItem;

    const [editEta, setEditEta] = useState(false)
    const etaMomentObj = getMomentObjFromServer(eta_time);
    const initialEtaValue = getDisplayDateTimeFromMoment(etaMomentObj);
    const editModalName = useInput(initialEtaValue);

    useEffect(() => {
        ProceedGetTaskEvents()
    }, [])


    const ProceedGetTaskEvents = () => {
        const params = {
            task_id: taskItem?.id
        }

        dispatch(
            getTaskEvents({
                params,
                onSuccess: (response) => () => { },
                onError: () => () => { },
            })
        );
    };

    const editEtaSubmitHandler = () => {
        const params = {
            id: taskItem.id,
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
                    <div className="col">
                        <H tag={"h3"} text={title} />
                        <h3 className="text-sm text-muted">{description}</h3>
                    </div>
                    <div className="col-6 "></div>
                    <div className="col-2 mr--9 mt-1"><h6>{getDisplayDateFromMoment(getMomentObjFromServer(created_at))}</h6></div>
                    <div className="col ">
                        <TagAndAssignUser />
                    </div>
                </div>
                <div className="row align-items-center my-4">
                    <div className="col">
                        {
                            task_attachments &&
                            task_attachments?.length > 0 && task_attachments?.map((item) => {
                                return <a
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}>
                                    <Image
                                        variant={'avatar'}
                                        src={getPhoto(item?.attachment_file)} /></a>
                            })
                        }
                    </div>
                    <div className="col"></div>
                    <div className="col">
                        <h6 className="text-uppercase d-flex justify-content-end">{getDisplayDateTimeFromMoment(getMomentObjFromServer(eta_time))}<span style={{cursor:'pointer'}} onClick={() => { setEditEta(!editEta) }} className="bi bi-pencil mx-2"></span></h6>
                    </div>
                </div>
                <Modal isOpen={editEta}
                    onClose={() => { setEditEta(!editEta) }}
                >
                    <Input className='rounded-pill' heading={'Name'} value={editModalName.value} onChange={editModalName.onChange} />
                    <Button text={'Submit'} className={'rounded-pill px-5'} onClick={() => editEtaSubmitHandler()} />

                </Modal>
                <div className="row align-items-end my-5">
                    <div className="col">
                        <div className="h5 mb-0"> {by_user?.name} </div>
                        <div className="h5 mb-0"> {by_user?.phone} </div>
                        <div className="h5 mb-0"> {by_user?.email} </div>
                    </div>
                    <div className="col align-self-center mx--4">
                        <div className="col d-flex  justify-content-center mr--2"> <Image variant={'rounded'} src={getPhoto(raised_by_company?.attachment_logo)} /> </div>
                    </div>

                    <div className="col-6">
                        <h6>
                            <div className="h5 mb-0"> {raised_by_company?.display_name} </div>
                            <div className="h5 mb-0"> @<span className="h5"> {assigned_to?.name} </span></div>
                            <div className="h5 mb-0"></div>
                            <div className={'text-uppercase  text-muted'}>{raised_by_company?.address}</div>
                        </h6>
                    </div>
                    <div className="col">

                    </div>
                </div>
            </Card>
        </HomeContainer>

    );
}

export { TaskInfo };


