import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { H, Image, Card, Modal, Input, Button, DateTimePicker, Back, Alert } from "@Components";
import { getDisplayDateFromMoment, getDisplayDateTimeFromMoment, getMomentObjFromServer, getPhoto, getServerTimeFromMoment, capitalizeFirstLetter, TASK_EVENT_ETA, getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, getDates } from '@Utils'
import { icons } from "@Assets";
import { TicketInfoProps } from "./interface";
import { TicketItemMenu, TicketEventHistory } from "@Modules";
import { translate } from "@I18n";
import { useModal, useInput, useWindowDimensions } from '@Hooks'
import { addTicketEvent, getTicketDetails } from '@Redux'
import { useParams } from "react-router-dom";

const START_TASK = 1
const END_TASK = 2

const TicketInfo = ({ onClick }: TicketInfoProps, ref: any) => {

    const { id } = useParams()


    const dispatch = useDispatch()
    const { ticketDetails } = useSelector((state: any) => state.TicketReducer);
    const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
    
    const { title, code, description, by_user, raised_by_company, ticket_attachments, assigned_to, created_at, eta_time, start_time, end_time } = ticketDetails || {};
    const [eta, setEta] = useState(eta_time)
    const editEtaModal = useModal(false)
    const editEtaReason = useInput('')
    const ticketEventModal = useModal(false)
    const alertModal = useModal(false)
    const [actionTask, setActionTask] = useState<number>()
    const { height } = useWindowDimensions()

    useEffect(() => {
        getTicketDetailsHandler()
    }, [id])


    useEffect(() => {
        setEta(eta_time)
    }, [ticketDetails])


    const getTicketDetailsHandler = () => {
        const params = {
        ticket_id: id,
        }
        dispatch(
            getTicketDetails({
                params,
                onSuccess: (success) => () => { },
                onError: (error) => () => { }
            })
        )
    }


    const editEtaSubmitApiHandler = () => {
        const params = {
            id,
            eta_time: getServerTimeFromMoment(getMomentObjFromServer(eta)),
            event_type: TASK_EVENT_ETA,
            reason: editEtaReason.value
        }

        dispatch(
          addTicketEvent({
                params,
                onSuccess: () => () => {
                    editEtaReason.set('')
                    editEtaModal.hide();
                    getTicketDetailsHandler()
                },
                onError: () => () => { }
            })
        )
    }

    function proceedEventTypeApi() {
        const currentTime = getServerTimeFromMoment(getMomentObjFromServer(getDates()))

        const params = {
            ...(actionTask === START_TASK ? { event_type: 'ETS', start_time: currentTime } : { event_type: 'ETE', end_time: currentTime }),
            id: ticketDetails?.id,
        }
        dispatch(
          addTicketEvent({
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
        <div >
            <Card className={'overflow-auto'} 
            style={{
                height: height / 2
            }} 
            >
                <div className="col">
                    <div className="row justify-content-between">
                        <Back />
                        <TicketItemMenu />
                    </div>
                    <div className="row justify-content-between mt-3">
                        <div>
                            {title && <H tag={"h4"} className="mb-0" text={title} />}
                            {code && <H tag={"h4"} className="text-muted" text={`# ${code}`} />}

                            <div className="mt-3">
                                {description && <H tag={'h5'} text={capitalizeFirstLetter(description)} />}
                                <div className="row">
                                    {
                                        ticket_attachments &&
                                        ticket_attachments?.length > 0 && ticket_attachments?.map((item) => {
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
                                    <h5 className="text-uppercase">{ eta_time?getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(eta_time)):''}</h5>
                                </div>
                                <div className="row ml-1 mr-3">
                                    <div className="pointer" onClick={() => editEtaModal.show()}>
                                        <Image src={icons.edit} height={18} width={18} />
                                    </div>
                                    <div className="ml-2 pointer" onClick={() => { ticketEventModal.show() }}>
                                        <Image src={icons.history} height={18} width={18} />
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
            <Modal title={"Latest Events"} size={'lg'} isOpen={ticketEventModal.visible} onClose={ticketEventModal.hide} >
                <TicketEventHistory/>
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
}
export { TicketInfo };