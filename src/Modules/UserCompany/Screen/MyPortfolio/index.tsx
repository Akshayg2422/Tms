import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMomentObjFromServer, getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, validate, ADD_TIME_SHEET_DETAILS, ifObjectExist, DD_MMMM_YYYY, getValidateError, getServerTimeFromMoment, HH_MM_A, getDisplayDateFromMoment } from '@Utils'
import {
  addEmployeeTimeline,
  getAssignedTask,
  getEmployeesl,
  getEmployeeTimeline
} from "@Redux";
import { useDropDown, useDynamicHeight, useInput, useModal } from '@Hooks';
import { Button, Card, CommonTable, DateTimePicker, DropDown, Input, MenuBar, Modal, showToast, Image, CollapseButton, Spinner, NoDataFound,  AutoComplete, TextAreaInput} from '@Components';
import { icons } from '@Assets';
import { ROUTES } from '@Routes'
import { useNavigation } from '@Hooks'
import { INITIAL_PAGE } from '@Utils'
import InfiniteScroll from 'react-infinite-scroll-component';
import { translate } from "@I18n";
import moment from 'moment';

function MyPortfolio() {
  const dispatch = useDispatch();
  const addEtaTime = useModal(false);
  const editEtaTime = useModal(false);
  const { goTo } = useNavigation();
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
  let currentDate = getDisplayDateFromMoment(getMomentObjFromServer(new Date()))
  const { employeeTimeline, employeeTimelineCurrentPages } = useSelector((state: any) => state.UserCompanyReducer);
  const [employeeTimelineDisplayData, setEmployeeTimelineDisplayData] = useState({ keys: [], data: {} })
  const getGroupMenuItem = [
    { id: '0', name: "Edit", icon: icons.edit },

  ]
  useEffect(() => {
    getAssignedTaskList()
    getEmployeesTimeList(INITIAL_PAGE)
  }, [])


  useEffect(() => {

    if (employeeTimeline && employeeTimeline.length > 0) {
      getDropDownDisplayData()

    }
  }, [employeeTimeline])

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


  const getEmployeesTimeList = (page_number: number) => {

    const params = { timeline_by: "", page_number }
    dispatch(
      getEmployeeTimeline({
        params,
        onSuccess: (response) => () => {
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

          const assignedTasks = response?.details
          const assignedDetails = assignedTasks.map((item) => {
            return {
              text: item.title, id: item.id
            }



          })

          const assignedTaskDetails = assignedTasks.map((item) => {
            return {
              name: item.title, id: item.id
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

    setEmployeeTimelineDisplayData({
      keys: Object.keys(modifiedData),
      data: modifiedData
    } as never)
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

    const validation = validate(ADD_TIME_SHEET_DETAILS, params);
    console.log("validation", validation)

    if (ifObjectExist(validation)) {
      dispatch(
        addEmployeeTimeline({
          params,
          onSuccess: (response) => () => {

            addEtaTime.hide()
            getEmployeesTimeList(INITIAL_PAGE)
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
          "Edit": <MenuBar menuData={getGroupMenuItem} onClick={(element) => {

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
          }} />

        }
      }
      )
    }
  }




  return (
    <div className='m-3'>
      {employeeTimelineDisplayData?.keys.length > 0 ?
        <InfiniteScroll
          dataLength={employeeTimelineDisplayData?.keys.length}
          hasMore={employeeTimelineDisplayData?.keys.length !== -1}
          loader={<h4>
            {employeeTimelineCurrentPages === -1 ? '' : <Spinner />}
          </h4>}
          next={() => {
            if (employeeTimelineCurrentPages !== -1) {
              getEmployeesTimeList(employeeTimelineCurrentPages)
            }
          }
          }>

          <div>
            {employeeTimelineDisplayData?.keys && employeeTimelineDisplayData?.keys?.length > 0 && employeeTimelineDisplayData?.keys?.map((el, index) => {

              const dataset = Object.values(employeeTimelineDisplayData?.data)
              return (

                <CollapseButton
                  selectedIds={employeeTimelineDisplayData?.keys[index]}
                  selectedId={currentDate}
                  children={
                    <h5>{employeeTimelineDisplayData?.keys[index]}
                    </h5>}
                  tableDataSet={dataset[index]}
                  displayDataSet={normalizedTableDatas(dataset[index])}
                  onClick={() => {
                    addEtaTime.show()

                  }}
                  text={translate('common.add')!}

                />
              )
            })}
          </div>
        </InfiniteScroll>
        : <div className="vh-100 d-flex d-flex align-items-center justify-content-center my-3">
          <NoDataFound buttonText={translate('common.add')!} isButton />
        </div>
      }

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
            placeholder={translate('auth.description')}
            value={description.value}
            onChange={description.onChange} />
        </div>
        <div className="row">
          <div className="col-6">
            <DateTimePicker
              id="eta-picker"
              placeholder={translate('order.Start Time')!}
              type="both"
              initialValue={startTimeEta}
              onChange={handleStartTimeEtaChange}
            />
          </div>
          <div className="col-6">
            <DateTimePicker
              id="eta-picker"
              type="both"
              initialValue={endTimeEta}
              placeholder={translate("order.end Time")!}
              onChange={handleEndTimeEtaChange}
            />
          </div>
        </div>
        <div className='text-right'>
          <Button
            color={"secondary"}
            text={translate('common.cancel')}
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
            placeholder={'description'}
            value={editDescriptions.value}
            onChange={editDescriptions.onChange} />
        </div>
        <div className="row">
          <div className="col-6">
            <DateTimePicker
              placeholder={'Start Time'}
              type="both"
              initialValue={editStartTimeEta}
              onChange={handleEditStartTimeEtaChange}
            />
          </div>
          <div className="col-6">
            <DateTimePicker
              type="both"
              initialValue={editEndTimeEta}
              placeholder={'End Time'}
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

export { MyPortfolio }