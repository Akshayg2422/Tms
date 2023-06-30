import React, { useState, forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { H, Image, Card, Modal, Input, Button, DateTimePicker, Back, Alert, ProfileCard, InputHeading, TextAreaInput } from "@Components";
import { getDisplayDateFromMoment, getMomentObjFromServer, getPhoto, getServerTimeFromMoment, capitalizeFirstLetter, TASK_EVENT_ETA, getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, getDates, getDisplayTimeDateMonthYearTime } from '@Utils'
import { icons } from "@Assets";
import { TaskInfoProps } from './interfaces'
import { TaskItemMenu, TaskEventHistory } from "@Modules";
import { translate } from "@I18n";
import { useModal, useInput, useNavigation } from '@Hooks'
import { addTaskEvent, getSelectedReference, getTaskDetails, refreshTaskEvents, selectedVcDetails } from '@Redux'
import { useParams } from 'react-router-dom'
import { CardFooter } from "reactstrap";
import { ROUTES } from "@Routes";

const START_TASK = 1
const END_TASK = 2

const TaskInfo = forwardRef(({ onClick }: TaskInfoProps, ref: any) => {

    const { id ,refer} = useParams()

    const dispatch = useDispatch()
    const { taskDetails, selectedTask ,selectedReferenceDetails , referencesTasks,subTasks,tasks} = useSelector((state: any) => state.TaskReducer);

    const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
    const { title, code, description, by_user, raised_by_company, task_attachments, assigned_to, created_at, eta_time, start_time, end_time } = taskDetails || {};
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
    const [selected,setSelected]=useState()
    const [selectedTaskId,setSelectedTaskId]=useState<boolean>(true)
    

    useEffect(() => {
        getTaskDetailsHandler()
    }, [id])



    useEffect(()=>{
        if(subTasks !==undefined){
            let isSelect
         
        isSelect=subTasks?.some((filter:any)=>filter?.code === selectedReferenceDetails?.code)
        setSelected(isSelect)
        }
        // /
        if(tasks.length>0 ){
            let isSelectedTask
            isSelectedTask=tasks?.some((filter:any)=>(filter?.code === code||taskDetails?.code))
            setSelectedTaskId(isSelectedTask)
           
        }
      

    },[subTasks])
   
    
// console.log(selected,"sssssssssss")
// console.log(selectedReferenceDetails?.refer,":::::::::::::p")
// console.log(selectedTaskId,"selectedTaskId=====>")

    useEffect(() => {
        setEta(eta_time)
    }, [taskDetails])




    function resetValues() {
        editTitle.set('')
        editDescription.set('')
    }


    const editEtaSubmitApiHandler = () => {

        const params = {
            code: id,
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
                    dispatch(refreshTaskEvents())
                    getTaskDetailsHandler();
                },
                onError: () => () => { }
            })
        )
    }


    const getTaskDetailsHandler = () => {
        const params = {
            code: id,
        }
        dispatch(
            getTaskDetails({
                params,
                onSuccess: () => () => { },
                onError: () => () => { }
            })
        )
    }

    function proceedEventTypeApi() {
        const currentTime = getServerTimeFromMoment(getMomentObjFromServer(getDates()))

        const params = {
            ...(actionTask === START_TASK ? { event_type: 'ETS', start_time: currentTime } : { event_type: 'ETE', end_time: currentTime }),
            code: taskDetails?.code,
        }
        dispatch(
            addTaskEvent({
                params,
                onSuccess: (response) => () => {
                    alertModal.hide()
                    getTaskDetailsHandler()
                },
                onError: () => () => {
                    alertModal.hide()
                }
            })
        )
    }


    function editTaskDetailsHandler() {
        const params = {
            code: id,
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
                    editDescription.set('')
                    editTitle.set('')
                },
                onError: () => () => { }
            })
        )
    }
    return (
        <div ref={ref} >
            <Card className={'px-3'}>
                <div>
                    <div className="row">
                        <div className="col ">
                            <div className="row" onClick={()=>{
                                //   dispatch(getSelectedReference({code:code,refer:true}))

          }}>
                                <Back  />
                                <div className="ml-2">
                                    <div>{title && <H tag={"h4"} className="mb-0" text={title} />}</div>
                                      {code && <small>{`#${code}`}</small>}
                                {description && <div className="text-sm mb--2 text-black  ml--4">{capitalizeFirstLetter(description)}</div>}
                                </div>
                            </div>
                        </div>
                        {(selected ===true || selectedTaskId === true || selectedReferenceDetails?.refer ===true) &&    <div className="pointer col-auto" onClick={() => {
                            editTaskModal.show()
                            editTitle.set(title)
                            editDescription.set(description)
                        }}>
                            <Image src={icons.editEta} height={16} width={16} />
                        </div>
}
                    </div>

                    <div className="row mt-3 ">
                        {
                            task_attachments &&
                            task_attachments?.length > 0 && task_attachments?.map
                                ((item, index) => {
                                    return <div
                                        className={`${index !== 0 && 'ml-2'}`}
                                        onClick={(e) => e.preventDefault()}>
                                        <Image
                                            variant={'avatar'}
                                            size={'md'}
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
                        <div className="row mt-4 mr-3">
                            <div className={'align-self-center'}>{raised_by_company?.attachment_logo && <Image variant={'rounded'} size={'sm'} src={getPhoto(raised_by_company?.attachment_logo)} />}</div>
                            <div className="ml-2 align-self-center">
                                <div className="h5 mb-0"> {raised_by_company?.display_name}</div>
                                <div className="text-xs"><span>{`@ ${assigned_to?.name}`} </span></div>
                            </div>
                        </div>
                    </div>

                    <hr className="my-4 mx--3" />

                    {(selected ===true || selectedTaskId === true || selectedReferenceDetails?.refer ===true) &&
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
}



         {(selected ===true || selectedTaskId === true || selectedReferenceDetails?.refer ===true) &&  <div className="col text-right mt-3 ml--3">
                        {(assigned_to?.id === dashboardDetails?.user_details?.id && !start_time) && < Button className={'text-white'} size={'sm'} text={'Start'}
                            onClick={() => {
                                alertModal.show()
                                setActionTask(START_TASK)
                            }} />}
                        {(assigned_to?.id === dashboardDetails?.user_details?.id && start_time && !end_time) && < Button className={'text-white'} size={'sm'} text={'mark as Closed'} onClick={() => {
                            alertModal.show()
                            setActionTask(END_TASK)
                        }} />}
                    </div>
                    }


                </div>
            </Card >

            {/**
             * Edit Eta Modal
             */}
            <Modal title={translate("auth.Edit eta time")!} isOpen={editEtaModal.visible}
                onClose={() => {
                    editEtaModal.hide()
                    resetValues()
                }}
                size={'md'}
            >
                <div className="col-12">

                    <Input
                        type={"text"}
                        heading={translate("common.note")}
                        value={editEtaReason.value}
                        onChange={editEtaReason.onChange}
                    />

                    <DateTimePicker
                        heading={'ETA'}
                        initialValue={getDisplayTimeDateMonthYearTime(getMomentObjFromServer(eta))}
                        type="both"
                        onChange={setEta}
                    />


                </div>
                <div className="col text-right">
                    <Button text={translate('order.Update')} onClick={editEtaSubmitApiHandler} />
                </div>
            </Modal>
            {/**
             * show Event Time Line
             */}
            <Modal title={translate("auth.Latest Events")!} size={'lg'} isOpen={taskEventModal.visible} onClose={taskEventModal.hide} >
                <CardFooter className={'mx--4 mt--4 mb--4'}>
                    <TaskEventHistory />
                </CardFooter>
            </Modal>

            <Modal size={'md'}title={translate('auth.Edit task Details')!} isOpen={editTaskModal.visible} onClose={editTaskModal.hide} >

                <div className="col-12 ">
                    <Input
                        type={"text"}
                        heading={translate("common.title")}
                        value={editTitle.value}
                        onChange={editTitle.onChange}
                    />
               
                    <div >
                    {/* <InputHeading heading={translate('auth.description')}/>
                    <textarea 
                    style={{height:'140px'}}
                        value={editDescription.value}
                        onChange={editDescription.onChange}
                        className="form-control form-control-sm" /> */}
                          <TextAreaInput
               heading={translate('auth.description')!}
                value={editDescription.value}
                onChange={editDescription.onChange}
                className="form-control form-control-sm"
                
                />
                </div>
                </div>
                <div className="text-right pt-3">
                    <Button text={translate('order.Update')} onClick={editTaskDetailsHandler} />
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
                    messageOnClick={ ()=>{
                         dispatch(selectedVcDetails(by_user))
                        goTo( ROUTES['user-company-module']['individual-chat'], false)}}
                />

            </Modal>

            <Alert
            size="md"
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