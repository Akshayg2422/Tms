import React, { useState, forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { H, Image, Card, Modal, Input, Button, DateTimePicker, Back, Alert, Divider } from "@Components";
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
    const { title, code, description, by_user, raised_by_company, task_attachments, assigned_to, created_at, eta_time, start_time, end_time, } = taskDetails || {};
    const [eta, setEta] = useState(eta_time)
    const editTitle = useInput(title)
    const editDescription = useInput(description)
    const editEtaModal = useModal(false)
    const editEtaReason = useInput('')
    const editTaskModal = useModal(false)
    const taskEventModal = useModal(false)
    const alertModal = useModal(false)
    const [actionTask, setActionTask] = useState<number>()

    useEffect(() => {
        getTaskDetailsHandler()
    }, [id])


    useEffect(() => {
        setEta(eta_time)
    }, [taskDetails])


    function resetValues() {
        editTitle.set('')
        editDescription.set('')
    }


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


    function editTaskDetailsHandler() {
        const params = {
            id,
            title: editTitle.value,
            description: editDescription.value,
            event_type: "TKE"
        }

        dispatch(
            addTaskEvent({
                params,
                onSuccess: () => () => {
                    editTaskModal.hide()
                    resetValues()
                    getTaskDetailsHandler();

                },
                onError: () => () => { }
            })
        )
    }

    return (
        <div ref={ref} >
            <Card className={'px-3'}>
                <div>
                    <div className="col">
                        <div className="row d-flex justify-content-between">
                            <div className="row">
                                <Back />
                                <div className="ml-3">
                                    <span> {title && <H tag={"h4"} className="mb-0" text={title} />} </span>
                                    {description && <p className="text-muted text-sm mb--2">{capitalizeFirstLetter(description)}</p>}
                                    {code && <small>{`# ${code}`}</small>}
                                </div>
                            </div>
                            <div className="pointer" onClick={() => {
                                editTaskModal.show()
                                editTitle.set(title)
                                editDescription.set(description)
                            }}>
                                <Image src={icons.editEta} height={16} width={16} />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        {
                            task_attachments &&
                            task_attachments?.length > 0 && task_attachments?.map
                                ((item, index) => {
                                    return <div
                                        className={`${index !== 0 && 'ml-2'}`}
                                        onClick={(e) => e.preventDefault()}>
                                        <Image
                                            variant={'avatar'}
                                            size={'lg'}
                                            src={getPhoto(item?.attachment_file)}
                                        />
                                    </div>
                                })
                        }
                    </div>
                    <div className="ml--3 mt-2">
                        <div className="h5 mb-0"> {by_user?.name} </div>
                        <div className="mt--1"><small > {by_user?.phone} </small></div>
                        <div className="mt--2"><small > {by_user?.email} </small></div>
                    </div>

                    <hr className="my-4" />

                    <div className="row mt-2">

                        <div className="col ml--3">
                            {
                                eta_time ?
                                    <>
                                        <H className=" text-uppercase text-muted " tag={"h6"} text={'CREATED AT :'} />
                                        <h5 className="text-uppercase mt--2">{getDisplayDateFromMoment(getMomentObjFromServer(created_at))}</h5>
                                    </>
                                    :
                                    <>
                                        <H className="mb-0 text-uppercase text-muted" tag={"h6"} text={'ETA :'} />
                                        <h5 className="text-uppercase">{getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(eta_time))}</h5>
                                    </>

                            }
                        </div>

                        <div className="row ml-1 mr-3">
                            <div className="pointer" onClick={() => editEtaModal.show()}>
                                {eta_time && <Image src={icons.editEta} height={16} width={16} />}
                            </div>
                            <div className="ml-2 pointer" onClick={() => { taskEventModal.show() }}>
                                <Image src={icons.timeline} height={17} width={17} />
                            </div>
                            <div className="ml-1 pointer" >
                                <TaskItemMenu />
                            </div>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className={'align-self-center'}>{raised_by_company?.attachment_logo && <Image variant={'rounded'} src={getPhoto(raised_by_company?.attachment_logo)} />}</div>
                        <div className="ml-3">
                            <div className="h5 mb-0"> {raised_by_company?.display_name}</div>
                            <div className="text-xs"><span>{`@ ${assigned_to?.name}`} </span></div>
                            <div className="text-xs p-0" style={{ maxWidth: '200px', wordWrap: 'break-word' }}>{raised_by_company?.address}</div>
                        </div>
                    </div>

                    <div className="col text-right mt-3 ml--3">
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

                </div>
            </Card >

            {/**
             * Edit Eta Modal
             */}
            <Modal title="Edit eta time" isOpen={editEtaModal.visible}
                onClose={() => {
                    editEtaModal.hide()
                    resetValues()
                }}
            >
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
                    <Button text={'Update'} onClick={editEtaSubmitApiHandler} />
                </div>
            </Modal>
            {/**
             * show Event Time Line
             */}
            <Modal title={"Latest Events"} size={'lg'} isOpen={taskEventModal.visible} onClose={taskEventModal.hide} >
                <TaskEventHistory />
            </Modal>
            <Modal title={'Edit task Details'} isOpen={editTaskModal.visible} onClose={editTaskModal.hide} >

                <div className="col-6">
                    <Input
                        type={"text"}
                        heading={translate("common.title")}
                        value={editTitle.value}
                        onChange={editTitle.onChange}
                    />
                    <Input
                        type={"text"}
                        heading={translate("auth.description")}
                        value={editDescription.value}
                        onChange={editDescription.onChange}
                    />
                </div>
                <div className="text-right">
                    <Button text={'Update'} onClick={editTaskDetailsHandler} />
                </div>

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