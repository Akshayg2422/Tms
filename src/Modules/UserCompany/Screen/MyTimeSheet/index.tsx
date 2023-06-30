import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMomentObjFromServer, getDisplayDateFromMomentByType, validate, ADD_TIME_SHEET_DETAILS, ifObjectExist, DD_MMMM_YYYY, getValidateError, getServerTimeFromMoment, HH_MM_A, getDisplayDateFromMoment, EDIT_TIME_SHEET_DETAILS } from '@Utils'
import {
  addEmployeeTimeline,
  addEnableRequest,
  employeeTimeLineStatus,
  getAssignedTask,
  getEmployeeTimeline
} from "@Redux";
import { useDropDown, useDynamicHeight, useInput, useModal } from '@Hooks';
import { Button, DateTimePicker, DropDown, Input, MenuBar, Modal, showToast, Image, CollapseButton, AutoComplete, TextAreaInput } from '@Components';
import { icons } from '@Assets';
import { ROUTES } from '@Routes'
import { useNavigation } from '@Hooks'
import { translate } from "@I18n";
import moment from 'moment';

function MyTimeSheet() {
  const dispatch = useDispatch();
  const addEtaTime = useModal(false);
  const editEtaTime = useModal(false);
  const enableModal = useModal(false);
  const { goTo } = useNavigation();
  const reason = useInput("");
  const [startTimeEta, setStatTimeEta] = useState<any>("")
  const [endTimeEta, setEndTimeEta] = useState<any>("")
  const editAssignedTaskSelect = useDropDown({})
  const [editStartTimeEta, setEditStatTimeEta] = useState<any>("")
  const [assignedTasksId, setAssignedTaskId] = useState("")
  const [editEndTimeEta, setEditEndTimeEta] = useState<any>("")
  const [assignedTaskList, setAssignedTaskList] = useState([])
  const description = useInput("");
  const [assignedTaskDetails, setAssignedTaskDetails] = useState([])
  const [selectedTask, setSelectedTask] = useState<any>('')
  const editDescriptions = useInput('')
  const [formattedShift, setFormattedShift] = useState<any>('')
  const [approved, setApproved] = useState<any>(true)
  const [Enable, setEnable] = useState<any>('')
  let currentDate = new Date()
  let currentDay = currentDate.getDate()
  let currentMonth = currentDate.getMonth()
  let currentYear = currentDate.getFullYear()

  let dateFormate = `${currentYear}-${0}${currentMonth + 1}-${currentDay}`

  //start date
  const [startDate, setStartDate] = useState(moment().startOf('week'))
  const [endDate, setEndDate] = useState(moment().endOf('week'))
  const [currentDates, setCurrentDates] = useState(new Date());

  const { employeeTimeline ,dashboardDetails} = useSelector((state: any) => state.UserCompanyReducer);

  const getGroupMenuItem = [
    { id: '0', name: translate("common.Edit"), icon: icons.edit },
    { id: '1', name: 'Delete', icon: icons.delete },

  ]
   const  data=['2023-06-18','2023-06-19','2023-06-20']



  useEffect(() => {

    getEmployeesTimeList()
  }, [startDate])

  useEffect(() => {
    getAssignedTaskList()
  }, [])


  useEffect(() => {

    if (employeeTimeline && employeeTimeline.length > 0) {
      getDropDownDisplayData()

    }
  }, [employeeTimeline])

  //start  date end date

  const getDatesBetween = (startDate, endDate) => {
    const dates: any = [];
    const currentDate = moment(startDate);

    while (currentDate.isSameOrBefore(endDate, "day")) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate.add(1, "day");
    }

    return dates;

  };

  //shift with date
  const dateWithTask = () => {
    const convertedShift: any = []
    getDatesBetween(startDate, endDate) && getDatesBetween(startDate, endDate).length > 0 &&
      getDatesBetween(startDate, endDate).map((date: any) => {
        const normalizedShift = {
          date: date,

        }
        convertedShift.push(normalizedShift)
      })


    return convertedShift
  }


  ///working tester


  const getPreviousWeekDates = () => {
    const updatedDate = new Date(currentDates);
    updatedDate.setDate(updatedDate.getDate() - 7);
    setCurrentDates(updatedDate);
    displayWeekDates(updatedDate);
  };

  const getNextWeekDates = () => {
    const updatedDate = new Date(currentDates);
    updatedDate.setDate(updatedDate.getDate() + 7);
    setCurrentDates(updatedDate);
    displayWeekDates(updatedDate);
  };

  const displayWeekDates = (date) => {
    const currentDay = date.getDay();
    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - currentDay);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    setStartDate(moment(startDate))
    setEndDate(moment(endDate))

  };

  const dateWithTasks = (response: any) => {
    const TaskWithDates = [...dateWithTask()]

    let modifiedData = [...TaskWithDates]

    let consolidatedShift = modifiedData.map(each => {

      const taskListedArray = response?.filter(filter => {
        return moment(filter?.created_at).format("YYYY-MM-DD") === each.date
      })
      return { ...each, taskListedArray }

    })

    setFormattedShift(consolidatedShift)

  }

  const handleStartTimeEtaChange = (value: any) => {
    setStatTimeEta(value)

  };

  const handleEndTimeEtaChange = (value: any) => {
    setEndTimeEta(value)

  };

  const handleEditStartTimeEtaChange = (value: any) => {

    setEditStatTimeEta(value)
  };

  const handleEditEndTimeEtaChange = (value: any) => {

    setEditEndTimeEta(value)
  };

  const handleEditDescription = (value: any) => {
    editDescriptions.set(value)

  };

  const getEmployeesTimeList = () => {

    const params = {
      from_date: startDate.format("YYYY-MM-DD"),
      to_date: endDate.format("YYYY-MM-DD")
    }
    dispatch(
      getEmployeeTimeline({
        params,
        onSuccess: (response) => () => {


          dateWithTasks(response.details)
        },
        onError: (error) => () => {

        }
      })

    )
  }


  const reSubmitEmployeeTimeSheet = (item: any) => {
    const params = {
      // timeline_status:id,
      date: item,
      is_resubmitted: true

    }

    dispatch(
      employeeTimeLineStatus({
        params,
        onSuccess: (response) => () => {

          getEmployeesTimeList()

        },
        onError: (error) => () => {
        }

      })
    )


  }

  const addTimelineEnableRequest = () => {

    const params = {
      requested_date: Enable,
      reason: reason.value

    }

    dispatch(
      addEnableRequest({
        params,
        onSuccess: (response) => () => {
          enableModal.hide()
          // getEmployeesTimeList()
          reason.set('')

        },
        onError: (error) => () => {
        }

      })
    )

  }


  function restValue() {
    setStatTimeEta('')
    setEndTimeEta('')
    addEtaTime.hide()
    setSelectedTask('')
  }

  function editRestValue() {
    setEditStatTimeEta('')
    setEditEndTimeEta('')
    editAssignedTaskSelect.onChange({})
    editEtaTime.hide()
    setAssignedTaskId('')

  }


  const getAssignedTaskList = () => {

    const params = {

    }
    dispatch(
      getAssignedTask({
        params,
        onSuccess: (response: any) => () => {

          const assignedTasks = response?.details?.data
          const assignedDetails = assignedTasks.map((item) => {
            return {
              text: item.title, id: item.id
            }

          })

          const assignedTaskDetails = assignedTasks.map((item) => {
            return {
              text: item.title, id: item.id
            }
          })
          setAssignedTaskDetails(assignedTaskDetails)

          setAssignedTaskList(assignedDetails)
        },
        onError: () => () => { }
      })
    )
  }



  function getDropDownDisplayData() {
    const updatedData = [...employeeTimeline]
    const modifiedData = {}
    updatedData.forEach(each => {
      const { created_at } = each
      const date = getDisplayDateFromMoment(getMomentObjFromServer(created_at))
      if (modifiedData[date] !== undefined) {
        modifiedData[date] = [...modifiedData[date], each]
      } else {
        modifiedData[date] = [each]
      }
    })

  }


  const deleteTimeLineTask = (id: any) => {
    const params = {
      id: id,
      is_deleted: true
    }
    dispatch(
      addEmployeeTimeline({
        params,
        onSuccess: (response) => () => {

          getEmployeesTimeList()

        },
        onError: (error) => () => {
        }

      })
    )
  }

  const addEmployeeTimeSheet = () => {

    const editAssignedId = editAssignedTaskSelect?.value?.id
    const assignedTaskId = selectedTask?.id
    const params = {
      task_id: editAssignedId || assignedTaskId,
      start_time: editStartTimeEta ? getServerTimeFromMoment(getMomentObjFromServer(editStartTimeEta)) : startTimeEta,
      end_time: editEndTimeEta ? getServerTimeFromMoment(getMomentObjFromServer(editEndTimeEta)) : endTimeEta,
      ...(assignedTasksId && { id: assignedTasksId }),
      description: editDescriptions?.value || description?.value
    }

    const validation = validate(editEndTimeEta ? EDIT_TIME_SHEET_DETAILS : ADD_TIME_SHEET_DETAILS, params);
    

    if (ifObjectExist(validation)) {
      dispatch(
        addEmployeeTimeline({
          params,
          onSuccess: (response) => () => {

            addEtaTime.hide()
            getEmployeesTimeList()
            restValue()
            editRestValue()

          },
          onError: (error) => () => {
          }

        })
      )
    }
    else {

      showToast(getValidateError(validation));
    }

  }

  const normalizedTableDatas = (data: any) => {
    if (data && data?.length > 0) {

      return data?.map((el: any) => {

        return {
          Date: getDisplayDateFromMomentByType(DD_MMMM_YYYY, getMomentObjFromServer(el?.created_at)),
          Task: <div data-toggle="tooltip" title={el?.task?.name} onClick={() => { goTo(ROUTES["task-module"]["tasks-details"] + '/' + el?.task?.id); }}>{el?.task?.code}</div>,
          Description: el?.description,
          Start_Time: getDisplayDateFromMomentByType(HH_MM_A, getMomentObjFromServer(el?.start_time)),
          End_Time: getDisplayDateFromMomentByType(HH_MM_A, getMomentObjFromServer(el?.end_time)),
          Status: el?.is_completed ? "complete" : "",
          "Edit":
            <div ><MenuBar menuData={getGroupMenuItem} onClick={(element) => {

              const { start_time, end_time, task, id, description } = el
              const tasks = { id: task.id, text: task.name }

              if (element.id === '0') {
                setEditStatTimeEta(getDisplayDateFromMoment(getMomentObjFromServer(start_time)))
                setEditEndTimeEta(getDisplayDateFromMoment(getMomentObjFromServer(end_time)))
                editAssignedTaskSelect.onChange(tasks)
                setAssignedTaskId(id)
                editEtaTime.show()
                handleEditDescription(description)
              }
              if (element.id === '1') {

                deleteTimeLineTask(id)

              }


            }} />
            </div>

        }
      }
      )
    }
  }




  return (
    <div className='m-3'>

      <div className='card  p-4' style={{ flexDirection: 'row' }}>
        <div className="h3">{translate('order.This Week')}</div>
        <div className="h3  col">{`(${startDate.format('MMMM DD, YYYY')} - ${endDate.format('MMMM DD, YYYY')})`}</div>
        <div>
          <Image className="mx-2" src={icons.previousBackArrow} height={20} width={20} onClick={() => { getPreviousWeekDates() }} />
          <Image className="mx-2" src={icons.nextArrow} height={20} width={20} onClick={() => { getNextWeekDates() }} />
        </div>
      </div>

      <>

        <div>
          {formattedShift && formattedShift.length > 0 && formattedShift.map((el, index) => {
            // console.log(formattedShift[index]?.date,"datata====>")

            const filterDate=dashboardDetails?.freezed_dates&& dashboardDetails?.freezed_dates.some((el:any)=>el===formattedShift[index]?.date)
            // console.log(filterDate,"filterDate")
            return (
              <CollapseButton
                selectedIds={formattedShift[index]?.date}
                title={new Date(formattedShift[index]?.date)}
                tableDataSet={formattedShift[index].taskListedArray}
                displayDataSet={normalizedTableDatas(formattedShift[index].taskListedArray)}
                onClick={() => {
                  addEtaTime.show()
                }}
                enableButton={
                  filterDate?false:formattedShift[index]?.date===dateFormate?false:formattedShift[index]?.date>dateFormate?false:true}
                // selectButtonReject={true}
                // selectButton={
                //   formattedShift[index]?.taskListedArray[0]?.timeline_status === 'APT' ? false :formattedShift[index]?.date===dateFormate?true:false
                // }
                selectButton={
                  filterDate?false:formattedShift[index]?.taskListedArray[0]?.timeline_status === 'APT' ? false :formattedShift[index]?.date===dateFormate?true:false
                }
                // selectButtonReject={
                //   formattedShift[index]?.taskListedArray[0]?.timeline_status === 'APT' ? false :formattedShift[index]?.taskListedArray[0]?.timeline_status === 'PAL' ?false:formattedShift[index]?.date===dateFormate?true:false
                // }

                selectButtonReject={
                  filterDate?false:formattedShift[index]?.taskListedArray[0]?.timeline_status === 'APT' ? false :formattedShift[index]?.taskListedArray[0]?.timeline_status === 'PAL' ?false:formattedShift[index]?.date===dateFormate?true:false
                }
                textReject={'Submit'}
                onClickReject={() => {
                  reSubmitEmployeeTimeSheet(formattedShift[index]?.date)
                }}
                text={translate('common.add')!}
                taskStatus={el?.taskListedArray[0]?.reason}
                textEnable={'Enable'}
                onClickEnable={() => {
                  setEnable(formattedShift[index]?.date)
                  enableModal.show()

                }}

              />
            )
          })}
        </div>

      </>

      {/*enable modal  */}

      <Modal

        isOpen={enableModal.visible}
        onClose={() => {
          enableModal.hide()
        }}
        size='sm'
        title={'Enable Request'}

      > 
        <div className="col-12">
          {/* <Input
            placeholder={'Enable Reason'}
            value={reason.value}
            onChange={reason.onChange}
          /> */}
           <TextAreaInput
               heading={'Enable Reason'}
               value={reason.value}
            onChange={reason.onChange}
                className="form-control form-control-sm"
                
                />
        </div>

        <div className="text-right">
          <Button
            color={"secondary"}
            text={translate("common.cancel")}
            onClick={() => {
              enableModal.hide()

            }}
          />
          <Button
            text={translate("common.submit")}
            onClick={() => {

              addTimelineEnableRequest()


            }}
          />
        </div>

      </Modal>



      {/* add modal */}
      <Modal
        isOpen={addEtaTime.visible}
        size={'md'}
        onClose={() => {
          restValue()
        }}
        title={translate('auth.addTimeSheet')!}
      >


        {
          <AutoComplete
            heading={translate('auth.task')!}
            data={assignedTaskDetails}
            selected={selectedTask}
            onChange={(item) => {
              setSelectedTask(item)

            }}
          />}
        <div>
          <TextAreaInput
            heading={translate('auth.description')!}
            placeholder={translate('auth.description')!}
            value={description.value}
            onChange={description.onChange} />
        </div>
        <div className="row">
          <div className="col-6">
            <DateTimePicker
              id="eta-picker"
              placeholder={translate('order.Start Time')!}
              type="time"
              initialValue={startTimeEta}
              onChange={handleStartTimeEtaChange}
            />
          </div>
          <div className="col-6">
            <DateTimePicker
              id="eta-picker"
              type="time"
              initialValue={endTimeEta}
              placeholder={translate('order.end Time')!}
              onChange={handleEndTimeEtaChange}
            />
          </div>
        </div>
        <div className='text-right'>
          <Button
            color={"secondary"}
            text={translate("product.cancel")}
            onClick={() => restValue()}
            className='text-center text-white'
          />
          <Button
            className={'text-white'}
            text={translate('common.submit')}
            onClick={() => {
              addEmployeeTimeSheet()
            }}
          />
        </div>

      </Modal>

      {/* edit */}
      <Modal
        isOpen={editEtaTime.visible}
        size={'md'}
        onClose={() => {
          editEtaTime.hide();
          editRestValue()
        }}
        title={translate('auth.editTimeSheet')!}
      >
        <div>
          <DropDown
            heading={translate('auth.assignedTask')}
            selected={editAssignedTaskSelect.value}
            placeHolder={editAssignedTaskSelect.value.text}
            data={assignedTaskList}
            onChange={editAssignedTaskSelect.onChange}
          />
        </div>
        <div>
          <TextAreaInput
            heading={translate('auth.description')!}
            placeholder={translate('auth.description')}
            value={editDescriptions.value}
            onChange={editDescriptions.onChange} />
        </div>
        <div className="row">
          <div className="col-6">
            <DateTimePicker
              placeholder={translate('order.Start Time')!}
              type="time"
              initialValue={editStartTimeEta}
              onChange={handleEditStartTimeEtaChange}
            />
          </div>
          <div className="col-6">
            <DateTimePicker
              type="time"
              initialValue={editEndTimeEta}
              placeholder={translate('order.end Time')!}
              onChange={handleEditEndTimeEtaChange}
            />
          </div>
        </div>
        <div className='text-right'>
          <Button
            color={"secondary"}
            text={translate("common.cancel")}
            onClick={() => editRestValue()}
            className='text-center text-white'
          />
          <Button
            className={'text-white'}
            text={translate('common.submit')}
            onClick={() => {
              addEmployeeTimeSheet()
            }}
          />
        </div>

      </Modal>
    </div>
  )
}

export { MyTimeSheet }