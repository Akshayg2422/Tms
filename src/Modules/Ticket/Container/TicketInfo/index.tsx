import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { H, Image, Card, Modal, Input, Button, DateTimePicker, Back, Alert, TextAreaInput } from "@Components";
import { getDisplayDateFromMoment, getDisplayDateTimeFromMoment, getMomentObjFromServer, getPhoto, getServerTimeFromMoment, capitalizeFirstLetter, TASK_EVENT_ETA, getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, getDates } from '@Utils'
import { icons } from "@Assets";
import { TicketInfoProps } from "./interface";
import { TicketItemMenu, TicketEventHistory } from "@Modules";
import { translate } from "@I18n";
import { useModal, useInput, useWindowDimensions, useLoader } from '@Hooks'
import { addTicketEvent, getTicketDetails } from '@Redux'
import { useParams } from "react-router-dom";

const START_TASK = 1
const END_TASK = 2

const TicketInfo = ({ onClick }: TicketInfoProps, ref: any) => {


    const loginLoader = useLoader(false)

    const { id } = useParams()
    const dispatch = useDispatch()
    const { ticketDetails, selectedTicket } = useSelector((state: any) => state.TicketReducer);
    const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);

    const { title, code, description, by_user, raised_by_company, ticket_attachments, assigned_to, created_at, eta_time, start_time, end_time } = ticketDetails || {};
    const [eta, setEta] = useState(eta_time)
    const editEtaModal = useModal(false)
    const editEtaReason = useInput('')
    const ticketEventModal = useModal(false)
    const alertModal = useModal(false)
    const [actionTask, setActionTask] = useState<number>()
    const { height } = useWindowDimensions()
    console.log(selectedTicket, "selectedTicket====>")

    useEffect(() => {
        getTicketDetailsHandler()
    }, [id])


    useEffect(() => {
        setEta(eta_time)
    }, [ticketDetails])

    const editEtaSubmitApiHandler = () => {
        const params = {
            id: selectedTicket?.id,
            eta_time: getServerTimeFromMoment(getMomentObjFromServer(eta)),
            event_type: TASK_EVENT_ETA,
            reason: editEtaReason.value
        }
        loginLoader.show()

        console.log("eta==========>>>", eta)
        dispatch(
            addTicketEvent({
                params,
                onSuccess: () => () => {
                    loginLoader.hide()
                    editEtaReason.set('')
                    editEtaModal.hide();
                    getTicketDetailsHandler()
                },
                onError: () => () => {
                    loginLoader.hide()
                }
            })
        )
    }



    const getTicketDetailsHandler = () => {
        const params = {
            code: id,
        }
        dispatch(
            getTicketDetails({
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
            code: ticketDetails?.id,
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
                        <div className="ml--2">
                            <Back />
                        </div>
                        <TicketItemMenu />
                    </div>

                    <div className="mt--4 ml-2">
                        {title && <H tag={"h4"} className="mb-0" text={title} />}
                    </div>
                    <div className="mt--0 ml-2">
                        {code && <H tag={"h4"} className="text-muted" text={`# ${code}`} />}
                    </div>

                    <div className="row justify-content-between mt-3">
                        <div>
                            <div className="mt-3 ml--1">
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
                                                    src={getPhoto(item?.attachment_file)} />

                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="mr-3 row">

                            <div className="mt-3">

                                { eta_time ?

                                    <div>
                                        <H className="mb-0 text-uppercase text-muted" tag={"h6"} text={'ETA :'} />
                                        <h5 className="text-uppercase">{getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(eta_time))}</h5>
                                    </div>
                                    :
                                    <div>
                                        <H className="mb-0 text-uppercase text-muted" tag={"h6"} text={translate('common.CREATED AT :')} />
                                        <h5 className="text-uppercase ">{getDisplayDateFromMoment(getMomentObjFromServer(created_at))}</h5>
                                    </div>
                                }

                            </div>

                            <div className="row ml-3 pt-4 mr-3">
                                <div className="pointer" onClick={() => editEtaModal.show()}>
                                    <Image src={icons.edit} height={18} width={18} />
                                </div>
                                <div className="ml-2 pointer" onClick={() => { ticketEventModal.show() }}>
                                    <Image src={icons.history} height={18} width={18} />
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
                                {raised_by_company?.attachment_logo && <Image variant={'rounded'}
                                    src={getPhoto(raised_by_company?.attachment_logo)} />}
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
                    {/* <div className="col text-right mt-3">
                        {assigned_to?.id === dashboardDetails?.user_details?.id && < Button size={'sm'} text={'Start'}
                            onClick={() => {
                                alertModal.show()
                                setActionTask(START_TASK)
                            }} />}
                        {assigned_to?.id === dashboardDetails?.user_details?.id && < Button size={'sm'} text={'End'} onClick={() => {
                            alertModal.show()
                            setActionTask(END_TASK)
                        }} />}
                    </div> */}
                </div>
            </Card >

            {/**
             * Edit Eta Modal
             */}
            <Modal isOpen={editEtaModal.visible} onClose={() => { editEtaModal.hide() }} >
                <div className="col-6">
                    {/* <Input
                        type={"text"}
                        heading={translate("common.reason")}
                        value={editEtaReason.value}
                        onChange={editEtaReason.onChange}
                    /> */}
                    <TextAreaInput
                        heading={translate("common.reason")!}
                        value={editEtaReason.value}
                        onChange={editEtaReason.onChange}
                        className="form-control form-control-sm"

                    />
                    <DateTimePicker
                        heading={'ETA'}
                        initialValue={getDisplayDateTimeFromMoment(getMomentObjFromServer(eta))}
                        type="both"
                        onChange={setEta}
                    />


                </div>
                <div className="col text-right">
                    <Button text={translate('common.submit')}
                        loading={loginLoader.loader}
                        onClick={editEtaSubmitApiHandler} />
                </div>
            </Modal>
            {/**
             * show Event Time Line
             */}
            <Modal title={translate("auth.Latest Events")!} size={'lg'} isOpen={ticketEventModal.visible} onClose={ticketEventModal.hide} >
                <TicketEventHistory />
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