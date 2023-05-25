import React, { useState, forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { H, Image, Card, Modal, Input, Button, DateTimePicker, Back, Alert, Divider } from "@Components";
import { getDisplayDateFromMoment, getMomentObjFromServer, getPhoto, getServerTimeFromMoment, capitalizeFirstLetter, TASK_EVENT_ETA, getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, getDates, getDisplayTimeDateMonthYearTime } from '@Utils'
import { icons } from "@Assets";
import { TaskInfoProps } from './interfaces'
import { TaskItemMenu, TaskEventHistory, ProgressBarEta, Comments } from "@Modules";
import { translate } from "@I18n";
import { useModal, useInput, useWindowDimensions, useNavigation } from '@Hooks'
import { addTaskEvent, getTaskDetails } from '@Redux'
import { useParams } from 'react-router-dom'
import { CardBody, CardHeader, CardImg, Col, Row } from "reactstrap";
import { ROUTES } from "@Routes";

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
    const userModal = useModal(false)
    const { goTo } = useNavigation()

    useEffect(() => {
        getTaskDetailsHandler()
    }, [id])


    useEffect(() => {
        setEta(eta_time)
    }, [taskDetails])

    console.log('111111111111111111--------------->', JSON.stringify(taskDetails));



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
                    <div className={'row ml-1 justify-content-between'}>
                        <div className="row mt-4 pointer" onClick={() => userModal.show()}>
                            <div className={'align-self-center'}>{by_user?.profile_photo && <Image size={'sm'} variant={'rounded'} src={getPhoto(by_user?.profile_photo)} />}</div>
                            <div className={'ml-2 align-self-center'}>
                                <div className="h5 mb-0"> {by_user?.name}</div>
                            </div>
                        </div>
                        <div className="row mt-2 mr-3">
                            <div className={'align-self-center'}>{raised_by_company?.attachment_logo && <Image variant={'rounded'} src={getPhoto(raised_by_company?.attachment_logo)} />}</div>
                            <div className="ml-2 align-self-center">
                                <div className="h5 mb-0"> {raised_by_company?.display_name}</div>
                                <div className="text-xs"><span>{`@ ${assigned_to?.name}`} </span></div>
                            </div>
                        </div>
                    </div>

                    <hr className="my-4 mx--3" />

                    <div className="row mt-2">

                        <div className="col ml--3">
                            {
                                eta_time ?
                                    <>
                                        <H className="mb-0 text-uppercase text-muted" tag={"h6"} text={'ETA :'} />
                                        <h5 className="text-uppercase">{getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(eta_time))}</h5>
                                    </>
                                    :
                                    <>
                                        <H className=" text-uppercase text-muted " tag={"h6"} text={'CREATED AT :'} />
                                        <h5 className="text-uppercase mt--2">{getDisplayDateFromMoment(getMomentObjFromServer(created_at))}</h5>
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

            <Modal size={'sm'} isOpen={userModal.visible} onClose={userModal.hide}>

                <div className="card-profile p-2 mx--3 mb--4 mt--5">
                    <CardImg
                        // style={{ maxHeight: '200px' }}
                        src={by_user?.profile_photo && 'https://cdn.britannica.com/48/222648-050-F4D0A2D8/President-of-India-A-P-J-Abdul-Kalam-2007.jpg'}
                    />
                    <Row className="justify-content-center">
                        <Col>
                            <div className="card-profile-image">
                                <Image
                                    variant="rounded"
                                    size={'xxl'}
                                    className="rounded-circle pointer"
                                    style={{ height: '150px', width: '150px' }}
                                    src={by_user?.profile_photo ? by_user?.profile_photo : 'https://cdn.britannica.com/48/222648-050-F4D0A2D8/President-of-India-A-P-J-Abdul-Kalam-2007.jpg'}
                                />
                            </div>
                        </Col>
                    </Row>
                    <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                        <div className="d-flex justify-content-between">
                            <Button
                                className={"mr-4 px-2 text-white"}
                                text={'Connect'}
                                color={'info'}
                                onClick={() => { goTo(ROUTES["auth-module"].otp) }}
                                size={'sm'}
                            />
                            <Button
                                text={'Message'}
                                className="float-right px-2"
                                color="default"
                                onClick={(e) => e.preventDefault()}
                                size={'sm'}
                            />
                        </div>
                    </CardHeader>
                    <CardBody className="pt-0">

                        <div className="text-center mt-3">
                            <h5 className="h3">
                                {by_user?.name}
                            </h5>
                            <div className="h5">
                                <i className="ni business_briefcase-24 mr-2" />
                                {by_user?.department.name} - {by_user?.designation.name}
                            </div>
                            <div>
                                <i className="ni education_hat mr-2" />
                                {raised_by_company?.display_name}
                            </div>
                        </div>
                    </CardBody>
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