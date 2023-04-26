import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { H, Image, Card, Modal, Input, Button, DateTimePicker, Back, } from "@Components";
import { getDisplayDateFromMoment, getDisplayDateTimeFromMoment, getMomentObjFromServer, getPhoto, getServerTimeFromMoment, capitalizeFirstLetter, TASK_EVENT_ETA, getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A } from '@Utils'
import { icons } from "@Assets";
import { TaskInfoProps } from './interfaces'
import { TagAndAssignUser, TaskEventHistory } from "@Modules";
import { translate } from "@I18n";
import { useModal, useInput } from '@Hooks'
import { addTaskEvent } from '@Redux'

function TaskInfo({ onClick }: TaskInfoProps) {

    const dispatch = useDispatch()
    const { selectedTask } = useSelector((state: any) => state.TaskReducer);
    const { title, code, description, by_user, raised_by_company, task_attachments, assigned_to, created_at, eta_time } = selectedTask;
    const [eta, setEta] = useState(eta_time)
    const [updatedEta, setUpdatedEta] = useState(eta_time)
    const editEtaModal = useModal(false)
    const editEtaReason = useInput('')
    const taskEventModal = useModal(false)


    const editEtaSubmitApiHandler = () => {
        const params = {
            id: selectedTask.id,
            eta_time: getServerTimeFromMoment(getMomentObjFromServer(eta)),
            event_type: TASK_EVENT_ETA,
            reason: editEtaReason.value
        }

        console.log(JSON.stringify(params) + '====');

        dispatch(
            addTaskEvent({
                params,
                onSuccess: (response) => () => {
                    setUpdatedEta(eta)
                    editEtaReason.set('')
                    editEtaModal.hide();
                },
                onError: (error) => () => { }
            })
        )
    }



    // const submitCurrentStartTime = () => {
    //     const params = {
    //         id: getSubTaskId ? getSubTaskId.id : taskItem?.id,
    //         event_type: "ETS",
    //         start_time: getServerTimeFromMoment(getMomentObjFromServer(currentStartTime)),
    //     };

    //     dispatch(
    //         addTaskEvent({
    //             params,
    //             onSuccess: (response) => () => { setCurrentTimeModal(!currentTimeModal) },
    //             onError: (error) => () => { }
    //         })
    //     );
    // };



    // const submitCurrentEndTime = () => {
    //     const params = {
    //         id: getSubTaskId ? getSubTaskId.id : taskItem?.id,
    //         event_type: "ETE",
    //         end_time: getServerTimeFromMoment(getMomentObjFromServer(currentEndTime)),
    //     }

    //     dispatch(
    //         addTaskEvent({
    //             params,
    //             onSuccess: (response) => () => { },
    //             onError: (error) => () => { }
    //         })
    //     )
    // }

    return (
        <>
            <Card>
                <div className="col">
                    <div className="row justify-content-between">
                        <Back />
                        <TagAndAssignUser />
                    </div>
                    <div className="row justify-content-between mt-3">
                        <div>
                            {title && <H tag={"h4"} className="mb-0" text={title} />}
                            {code && <H tag={"h4"} className="text-muted" text={`# ${code}`} />}

                            <div className="mt-3">
                                {description && <H tag={'h5'} text={capitalizeFirstLetter(description)} />}
                                <div>
                                    {
                                        task_attachments &&
                                        task_attachments?.length > 0 &&
                                        task_attachments?.map((item) => {
                                            return <div
                                                onClick={(e) => e.preventDefault()}>
                                                <Image
                                                    variant={'avatar'}
                                                    src={getPhoto(item?.attachment_file)} /></div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="mr-3">
                            <div>
                                <H className="mb-0 text-uppercase text-muted" tag={"h6"} text={'CREATED AT :'} />
                                <h5 className="text-uppercase ">{getDisplayDateFromMoment(getMomentObjFromServer(created_at))}</h5>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <H className="mb-0 text-uppercase text-muted" tag={"h6"} text={'ETA :'} />
                                    <h5 className="text-uppercase">{getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(updatedEta))}</h5>
                                </div>
                                <div className="row ml-1 mr-3">
                                    <div className="pointer" onClick={editEtaModal.show}>
                                        <Image src={icons.edit} height={18} width={18} />
                                    </div>
                                    <div className="ml-2 pointer" onClick={taskEventModal.show}>
                                        <Image src={icons.calender} height={18} width={18} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-between mt-3 mr-3">
                        <div>
                            <div className="h5 mb-0"> {by_user.name} </div>
                            <div className="mt--1"><small > {by_user.phone} </small></div>
                            <div className="mt--2"><small > {by_user.email} </small></div>
                        </div>

                        <div>
                            <div className="row">
                                {raised_by_company?.attachment_logo && <Image variant={'rounded'} src={getPhoto(raised_by_company?.attachment_logo)} />}
                                <div className="ml-2">
                                    <h4 className="mb-0">{raised_by_company.display_name} </h4>
                                    <div className="mt--2">
                                        <small className="text-xs"> {`@ ${assigned_to.name}`}</small>
                                    </div>
                                    <div className="mt--2">
                                        <small className={'text-xs'}>{raised_by_company.address}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card >
            {/**
             * Edit Eta Modal
             */}
            <Modal isOpen={editEtaModal.visible} onClose={editEtaModal.hide}>
                <DateTimePicker
                    heading={'ETA'}
                    initialValue={getDisplayDateTimeFromMoment(getMomentObjFromServer(eta))}
                    type="both"
                    onChange={setEta}
                />
                <Input
                    type={"text"}
                    heading={translate("common.reason")}
                    value={editEtaReason.value}
                    onChange={editEtaReason.onChange}
                />
                <div className="col text-right">
                    <Button text={'Submit'} onClick={editEtaSubmitApiHandler} />
                </div>
            </Modal>
            {/**
             * show Event Time Line
             */}
            <Modal title={"Latest Events"} size={'lg'} isOpen={taskEventModal.visible} onClose={taskEventModal.hide}>
                <TaskEventHistory />
            </Modal>
        </>
    );
}
export { TaskInfo };