import React, { useState, forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { H, Image, Card, Modal, Input, Button, DateTimePicker, Back, Alert } from "@Components";
import { getDisplayDateFromMoment, getMomentObjFromServer, getPhoto, getServerTimeFromMoment, capitalizeFirstLetter, TASK_EVENT_ETA, getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, getDates, getDisplayTimeDateMonthYearTime } from '@Utils'
import { icons } from "@Assets";
import { TaskInfoProps } from './interfaces'
import { TaskItemMenu, TaskEventHistory, ProgressBarEta } from "@Modules";
import { translate } from "@I18n";
import { useModal, useInput, useWindowDimensions } from '@Hooks'
import { addTaskEvent, getTaskDetails } from '@Redux'
import { useParams } from 'react-router-dom'

const START_TASK = 1
const END_TASK = 2

const TaskInfo = forwardRef(({ onClick }: TaskInfoProps, ref: any) => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const { taskDetails } = useSelector((state: any) => state.TaskReducer);
    const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
    const { title, code, description, by_user, raised_by_company, task_attachments, assigned_to, created_at, eta_time, start_time, end_time } = taskDetails || {};
    const [eta, setEta] = useState(eta_time)
    const editEtaModal = useModal(false)
    const editEtaReason = useInput('')
    const taskEventModal = useModal(false)
    const alertModal = useModal(false)
    const [actionTask, setActionTask] = useState<number>()
    const { height } = useWindowDimensions()
    const percentComplete = 91
    const etaTime = new Date();
    const actualFinishTime = new Date();
    useEffect(() => {
        getTaskDetailsHandler()
    }, [id])


    useEffect(() => {
        setEta(eta_time)
    }, [taskDetails])

  
    const editEtaSubmitApiHandler = () => {
        
        const params = {
            id,
            eta_time: getServerTimeFromMoment(getMomentObjFromServer(eta)),
            event_type: TASK_EVENT_ETA,
            reason: editEtaReason.value
        }

        dispatch(
            addTaskEvent({
                params,
                onSuccess: () => () => {
                    editEtaReason.set('')
                    editEtaModal.hide();
                    getTaskDetailsHandler();
                },
                onError: () => () => { }
            })
        )
    }


    const getTaskDetailsHandler = () => {
        const params = {
            task_id: id,
        }
        dispatch(
            getTaskDetails({
                params,
                onSuccess: (success) => () => { },
                onError: (error) => () => { }
            })
        )
    }

    function proceedEventTypeApi() {
        const currentTime = getServerTimeFromMoment(getMomentObjFromServer(getDates()))

        const params = {
            ...(actionTask === START_TASK ? { event_type: 'ETS', start_time: currentTime } : { event_type: 'ETE', end_time: currentTime }),
            id: taskDetails?.id,
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
            <Card>
                <div className="row justify-content-between mt--3">
                    <Back />
                    <TaskItemMenu />
                </div>
                <Card style={{ height: height / 2 }}
                    className={'col mb--4 shadow-none p-0 overflow-auto overflow-hide'}>

                    <div className="row justify-content-between mt--2">
                        <div>
                            {title && <H tag={"h4"} className="mb-0" text={title} />}
                            {code && <H tag={"h4"} className="text-muted" text={`# ${code}`} />}

                            <div className="mt-3">
                                {description && <H tag={'h5'} text={capitalizeFirstLetter(description)} />}
                                <div className="row">
                                    {
                                        task_attachments &&
                                        task_attachments?.length > 0 && task_attachments?.map
                                            ((item) => {
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
                                    <h5 className="text-uppercase">{getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(eta_time))}</h5>
                                </div>
                                <div className="row ml-1 mr-3">
                                    <div className="pointer" onClick={() => editEtaModal.show()}>
                                        <Image src={icons.editEta} height={16} width={16} />
                                    </div>
                                    <div className="ml-2 pointer" onClick={() => { taskEventModal.show() }}>
                                        <Image src={icons.timeline} height={17} width={17} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-between mt-4 mr-3">
                        <div>
                            <div className="h5 mb-0"> {by_user?.name} </div>
                            <div className="mt--1"><small > {by_user?.phone} </small></div>
                            <div className="mt--2"><small > {by_user?.email} </small></div>
                        </div>

                        <div className="row mt--2">
                            <div className={'align-self-center'}>{raised_by_company?.attachment_logo && <Image variant={'rounded'} src={getPhoto(raised_by_company?.attachment_logo)} />}</div>
                            <div className="ml-2">
                                <div className="h5 mb-0"> {raised_by_company?.display_name}</div>
                                <div className="text-xs"><span>{`@ ${assigned_to?.name}`} </span></div>
                                <div className="text-xs p-0" style={{ maxWidth: '200px', wordWrap: 'break-word' }}>{raised_by_company?.address}</div>
                            </div>
                        </div>

                    </div>
                    <div className="col text-right mt-3">
                        {(assigned_to?.id === dashboardDetails?.user_details?.id && !start_time) && < Button size={'sm'} text={'Start'}
                            onClick={() => {
                                alertModal.show()
                                setActionTask(START_TASK)
                            }} />}
                        {(assigned_to?.id === dashboardDetails?.user_details?.id && start_time && !end_time) && < Button size={'sm'} text={'End'} onClick={() => {
                            alertModal.show()
                            setActionTask(END_TASK)
                        }} />}
                    </div>

                    <div className="">
                        <ProgressBarEta
                            percentComplete={percentComplete}
                            eta={etaTime}
                            actualFinishTime={actualFinishTime}
                        />
                    </div>


                </Card>
            </Card >

            {/**
             * Edit Eta Modal
             */}
            <Modal isOpen={editEtaModal.visible} onClose={() => { editEtaModal.hide() }} >
                <div className="col-6">
                    <DateTimePicker
                        heading={'ETA'}
                        initialValue={getDisplayTimeDateMonthYearTime(getMomentObjFromServer(eta))}
                        type="both"
                        onChange={setEta}
                    />
                    <Input
                        type={"text"}
                        heading={translate("common.note")}
                        value={editEtaReason.value}
                        onChange={editEtaReason.onChange}
                    />

                </div>
                <div className="col text-right">
                    <Button text={translate("common.submit")} onClick={editEtaSubmitApiHandler} />
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