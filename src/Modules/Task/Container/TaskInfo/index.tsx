import React, { useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { H, Image, Card, Modal, Input, Button, DateTimePicker, Back, Alert } from "@Components";
import { getDisplayDateFromMoment, getDisplayDateTimeFromMoment, getMomentObjFromServer, getPhoto, getServerTimeFromMoment, capitalizeFirstLetter, TASK_EVENT_ETA, getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, getDates } from '@Utils'
import { icons } from "@Assets";
import { TaskInfoProps } from './interfaces'
import { TaskItemMenu, TaskEventHistory } from "@Modules";
import { translate } from "@I18n";
import { useModal, useInput, useWindowDimensions } from '@Hooks'
import { addTaskEvent } from '@Redux'

const START_TASK = 1
const END_TASK = 2

const TaskInfo = forwardRef(({ onClick }: TaskInfoProps, ref: any) => {

    const dispatch = useDispatch()
    const { selectedTask } = useSelector((state: any) => state.TaskReducer);
    const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);

    const { title, code, description, by_user, raised_by_company, task_attachments, assigned_to, created_at, eta_time, } = selectedTask;
    const [eta, setEta] = useState(eta_time)
    const [updatedEta, setUpdatedEta] = useState(eta_time)
    const editEtaModal = useModal(false)
    const editEtaReason = useInput('')
    const taskEventModal = useModal(false)
    const alertModal = useModal(false)
    const [actionTask, setActionTask] = useState<number>()
    const { height } = useWindowDimensions()

    const editEtaSubmitApiHandler = () => {
        const params = {
            id: selectedTask.id,
            eta_time: getServerTimeFromMoment(getMomentObjFromServer(eta)),
            event_type: TASK_EVENT_ETA,
            reason: editEtaReason.value
        }

        dispatch(
            addTaskEvent({
                params,
                onSuccess: () => () => {
                    setUpdatedEta(eta)
                    editEtaReason.set('')
                    editEtaModal.hide();
                },
                onError: () => () => { }
            })
        )
    }

    function proceedEventTypeApi() {
        const currentTime = getServerTimeFromMoment(getMomentObjFromServer(getDates()))

        const params = {
            ...(actionTask === START_TASK ? { event_type: 'ETS', start_time: currentTime } : { event_type: 'ETE', end_time: currentTime }),
            id: selectedTask?.id,
        }
        dispatch(
            addTaskEvent({
                params,
                onSuccess: (response) => () => {
                    alertModal.hide()
                },
                onError: () => () => {
                    alertModal.hide()
                }
            })
        )
    }

    return (
        <div ref={ref} >
            <Card style={{
                height: height / 2
            }}>
                <div className="col">
                    <div className="row justify-content-between">
                        <Back />
                        <TaskItemMenu />
                    </div>
                    <div className="row justify-content-between mt-3">
                        <div>
                            {title && <H tag={"h4"} className="mb-0" text={title} />}
                            {code && <H tag={"h4"} className="text-muted" text={`# ${code}`} />}

                            <div className="mt-3">
                                {description && <H tag={'h5'} text={capitalizeFirstLetter(description)} />}
                                <div className="row">
                                    {
                                        task_attachments &&
                                        task_attachments?.length > 0 &&
                                        task_attachments?.map((item) => {
                                            return <div
                                                className="ml-3"
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
                                    <div className="pointer" onClick={() => editEtaModal.show()}>
                                        <Image src={icons.edit} height={18} width={18} />
                                    </div>
                                    <div className="ml-2 pointer" onClick={() => { taskEventModal.show() }}>
                                        <Image src={icons.calender} height={18} width={18} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-between mt-4 mr-3">
                        <div>
                            <div className="h5 mb-0"> {by_user.name} </div>
                            <div className="mt--1"><small > {by_user.phone} </small></div>
                            <div className="mt--2"><small > {by_user.email} </small></div>
                        </div>

                        <div>
                            <div className="row">
                                {raised_by_company?.attachment_logo && <Image variant={'rounded'} src={getPhoto(raised_by_company?.attachment_logo)} />}
                                <div className="ml-2">
                                    <h4 className="mb-0">{raised_by_company?.display_name} </h4>
                                    <div className="mt--2">
                                        <small className="text-xs"> {`@ ${assigned_to?.name}`}</small>
                                    </div>
                                    <div className="mt--2">
                                        <small className={'text-xs'}>{raised_by_company?.address}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col text-right mt-3">
                        {assigned_to?.id === dashboardDetails?.user_details?.id && < Button size={'sm'} text={'Start'}
                            onClick={() => {
                                alertModal.show()
                                setActionTask(START_TASK)
                            }} />}
                        {assigned_to?.id === dashboardDetails?.user_details?.id && < Button size={'sm'} text={'End'} onClick={() => {
                            alertModal.show()
                            setActionTask(END_TASK)
                        }} />}
                    </div>
                </div>
            </Card >

            {/**
             * Edit Eta Modal
             */}
            <Modal isOpen={editEtaModal.visible} onClose={() => { editEtaModal.hide() }} >
                <div className="col-6">
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

                </div>
                <div className="col text-right">
                    <Button text={'Submit'} onClick={editEtaSubmitApiHandler} />
                </div>
            </Modal>
            {/**
             * show Event Time Line
             */}
            <Modal title={"Latest Events"} size={'lg'} isOpen={taskEventModal.visible} onClose={taskEventModal.hide} >
                <TaskEventHistory />
            </Modal>

            <Alert
                title="Are you sure want to start the task?"
                isOpen={alertModal.visible}
                onClose={alertModal.hide}
                primaryOnClick={proceedEventTypeApi}
                secondaryOnClick={alertModal.hide}
            />
        </div>
    );
})
export { TaskInfo };