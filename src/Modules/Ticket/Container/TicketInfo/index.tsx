import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { H, Image, Card, Modal, Input, Button, DateTimePicker, Back, Alert, TextAreaInput, ProfileCard, ImageIcon, P } from "@Components";
import { getDisplayDateFromMoment, getDisplayDateTimeFromMoment, getMomentObjFromServer, getPhoto, getServerTimeFromMoment, capitalizeFirstLetter, TASK_EVENT_ETA, getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, getDates } from '@Utils'
import { icons } from "@Assets";
import { TicketInfoProps } from "./interface";
import { TicketItemMenu, TicketEventHistory } from "@Modules";
import { translate } from "@I18n";
import { useModal, useInput, useWindowDimensions, useLoader, useNavigation } from '@Hooks'
import { addTicketEvent, getTicketDetails, selectedVcDetails } from '@Redux'
import { useParams } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { ROUTES } from "@Routes";

const START_TASK = 1
const END_TASK = 2

const TicketInfo = ({ onClick }: TicketInfoProps, ref: any) => {


    const loginLoader = useLoader(false)
    const updateLoader=useLoader(false)
    const { goTo } = useNavigation()
    const { id } = useParams()
    const dispatch = useDispatch()
    const { ticketDetails, selectedTicket } = useSelector((state: any) => state.TicketReducer);
    const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);

    const { title, code, description, by_user, raised_by_company, ticket_attachments, assigned_to, created_at, eta_time, start_time, end_time } = ticketDetails || {};
    const editTitle = useInput(title)
    const editDescription = useInput(description)
    const [eta, setEta] = useState(eta_time)
    const editEtaModal = useModal(false)
    const editEtaReason = useInput('')
    const ticketEventModal = useModal(false)
    const userModal = useModal(false)
    const editTicketModal = useModal(false)
    const alertModal = useModal(false)
    const [actionTask, setActionTask] = useState<number>()
    const { height } = useWindowDimensions()


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


    const editTicketApiHandler = () => {
        const params = {
            code: id,
            title: editTitle.value,
            description: editDescription.value,
            event_type: "TKE"
        }
        updateLoader.show()
        dispatch(
            
            addTicketEvent({
                params,
                onSuccess: () => () => {
                    updateLoader.hide()
                    editTicketModal.hide()
                    // resetValues()
                    getTicketDetailsHandler();
                    editDescription.set('')
                    editTitle.set('')
                },
                onError: () => () => {
                    updateLoader.hide()
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
            <Card className={'overflow-auto overflow-hide'}
                style={{
                    height: height / 2
                }}
            >
                <div className="col ">
                    <div className="row justify-content-between">
                        <div className=" row ">
                            <div className="col">
                                <Back />
                            </div>
                            <div className=" pt-1">
                                {title && <H tag={"h4"} className="mb-0" text={title} />}
                                {code && <small className="mt-0">{`#${code}`}</small>}
                            </div>

                        </div>
                        <div onClick={()=>{ editTicketModal.show()
                                editTitle.set(title)
                                editDescription.set(description)}}>

                      
                        <ImageIcon src={icons.editEta} height={16} width={16} />
                        </div>

                    </div>
                    <div className="row justify-content-between mt-3">

                        <div >
                            {description && <div className="text-sm text-muted mb-2">{capitalizeFirstLetter(description)}</div>}
                            {
                                <PhotoProvider>
                                    <div className={'pointer'}>
                                        {
                                            ticket_attachments && ticket_attachments.length > 0 &&
                                            ticket_attachments?.map((item: any, index: number) => (
                                                <PhotoView src={getPhoto(item?.attachment_file)}>
                                                    <Image
                                                        className={index === 0 ? 'ml-0' : "ml-1"}
                                                        variant={'avatar'}
                                                        size={'md'}
                                                        src={getPhoto(item?.attachment_file)} />
                                                </PhotoView>

                                            ))
                                        }
                                    </div>
                                </PhotoProvider>
                            }
                        </div>

                    </div>
                    <div className={'row justify-content-between mt-2'}>
                        <div className="row mt-2  pointer ml-1 " onClick={userModal.show}>
                            <div className={'align-self-center mr-2'}>
                                {by_user?.profile_photo && <Image size={'sm'} variant={'rounded'} src={getPhoto(by_user?.profile_photo)} />}
                            </div>
                            <div className={'align-self-center'}>
                                <div className="h5 mb-0"> {by_user?.name}</div>
                            </div>
                        </div>
                        <div className="row mt-3 mr-3">
                            <div className={'align-self-center '}>
                                {raised_by_company?.attachment_logo && <Image variant={'rounded'} size={'sm'} src={getPhoto(raised_by_company?.attachment_logo)} />
                                }</div>
                            <div className="align-self-center">
                                <div className="h5 mb-0 ml-2"> {raised_by_company?.display_name}</div>
                                {assigned_to?.name !== undefined && <div className="text-xs ml-2"><span>{`@ ${assigned_to?.name}`} </span></div>}
                            </div>
                        </div>
                    </div>
                    <hr className="my-3 mx--1" />

                    <div className="row mt-2">

                        <div className="col">
                            {
                                eta_time ?
                                    <>
                                        <H className="mb-0 text-uppercase text-muted " tag={"h6"} text={'ETA :'} />
                                        <h5 className="text-uppercase">{getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(eta_time))}</h5>
                                    </>
                                    :
                                    <>
                                        <H className=" text-uppercase text-muted " tag={"h6"} text={'CREATED AT :'} />
                                        <h5 className="text-uppercase mt--2">{getDisplayDateFromMoment(getMomentObjFromServer(created_at))}</h5>
                                    </>

                            }
                        </div>

                        <div className="col-auto">
                            <div className="row">
                                <div className="pointer" onClick={() => editEtaModal.show()}>
                                    {eta_time && <ImageIcon src={icons.editEta} height={16} width={16} />}
                                </div>
                                <div className="ml-3 pointer" onClick={() => { ticketEventModal.show() }}>
                                    <ImageIcon src={icons.timeline} height={17} width={17} />
                                </div>
                                <div className="ml-2 pointer" >
                                    <TicketItemMenu />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </Card >

            {/* edit ticket modal */}

            <Modal size={'md'} title={translate('auth.EditTicketDetails')!} isOpen={editTicketModal.visible} onClose={editTicketModal.hide} >

                <Input
                    type={"text"}
                    heading={translate("common.title")}
                    value={editTitle.value}
                    onChange={editTitle.onChange}
                />
                <div >

                    <TextAreaInput
                        heading={translate('auth.description')!}
                        value={editDescription.value}
                        onChange={editDescription.onChange}
                        className="form-control form-control-sm"

                    />
                </div>

                <div className="text-right pt-3">
                    <Button text={translate('order.Update')}
                        loading={updateLoader.loader}
                        onClick={editTicketApiHandler} />
                </div>

            </Modal>

            {/**
             * Edit Eta Modal
             */}
            <Modal isOpen={editEtaModal.visible} onClose={() => { editEtaModal.hide() }} >
                <div className="col-6">

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

            <Modal size={'sm'} isOpen={userModal.visible} onClose={userModal.hide}>

                <ProfileCard
                    coverPhoto={by_user?.profile_photo}
                    profilePhoto={by_user?.profile_photo}
                    name={by_user?.name}
                    department={by_user?.department?.name}
                    designation={by_user?.designation?.name}
                    company={raised_by_company?.display_name}
                    userId={by_user?.id}
                    messageOnClick={() => {
                        dispatch(selectedVcDetails(by_user))
                        goTo(ROUTES['user-company-module']['individual-chat'], false)
                    }}
                />

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