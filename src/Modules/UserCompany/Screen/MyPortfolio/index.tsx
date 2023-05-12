import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMomentObjFromServer, getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, validate, ADD_TIME_SHEET_DETAILS, ifObjectExist, DD_MMMM_YYYY, getValidateError, getServerTimeFromMoment, HH_MM_A } from '@Utils'
import {
  addEmployeeTimeline,
  getAssignedTask,
  getEmployeesl,
  getEmployeeTimeline
} from "@Redux";
import { useDropDown, useDynamicHeight, useInput, useModal } from '@Hooks';
import { Button, Card, CommonTable, DateTimePicker, DropDown, Input, MenuBar, Modal, showToast, Image } from '@Components';
import { icons } from '@Assets';
import AutoSearchInput from '@Components//Core/AutoSearchInput';

function MyPortfolio() {
  const dispatch = useDispatch();
  const addEtaTime = useModal(false);
  const editEtaTime = useModal(false);
  // const employees = useDropDown({})
  // const assignedTaskSelect = useDropDown({})
  const [showTaskGroup, setShowTaskGroup] = useState(false);
  const [startTimeEta, setStatTimeEta] = useState<any>("")
  const [endTimeEta, setEndTimeEta] = useState<any>("")
  const editAssignedTaskSelect = useDropDown({})
  const [editStartTimeEta, setEditStatTimeEta] = useState<any>("")
  const [assignedTasksId, setAssignedTaskId] = useState("")
  const [editEndTimeEta, setEditEndTimeEta] = useState<any>("")
  const [assignedTaskList, setAssignedTaskList] = useState([])
  const description = useInput("");
    const [assignedTaskDetails,setAssignedTaskDetails]=useState([])
  const [selectedTask, setSelectedTask] = useState<any>('')
  const editDescriptions = useInput('')
  const dynamicHeight: any = useDynamicHeight()

  const { dashboardDetails, employeeTimelineList} = useSelector((state: any) => state.UserCompanyReducer);
  const {  assignedTask } = useSelector((state: any) => state.TaskReducer);
  const { user_details } = dashboardDetails || ''
  const getGroupMenuItem = [
    { id: '0', name: "Edit", icon: icons.edit },

  ]
  useEffect(() => {

    getEmployeesTimeList()
    getAssignedTaskList()

  }, [])

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
    const params = { timeline_by: "" }
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

          const assignedTaskDetails=assignedTasks.map((item) => {
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

  const addEmployeeTimeSheet = () => {

    const editAssignedId = editAssignedTaskSelect?.value?.id
    const assignedTaskId = selectedTask?.id
    const params = {
      task_id: editAssignedId || assignedTaskId,
      start_time:getServerTimeFromMoment(getMomentObjFromServer(editStartTimeEta))  ||getServerTimeFromMoment(getMomentObjFromServer(startTimeEta)) ,
      end_time: getServerTimeFromMoment(getMomentObjFromServer(editEndTimeEta))  ||getServerTimeFromMoment(getMomentObjFromServer( endTimeEta)),
      ...(assignedTasksId && { id: assignedTasksId }),
      description: editDescriptions?.value || description?.value
    }

    const validation = validate(ADD_TIME_SHEET_DETAILS, params);

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
  const normalizedTableData = (data: any) => {
    if (data && data?.length > 0) {

      return data?.map((el: any) => {

        return {

          Date: getDisplayDateFromMomentByType(DD_MMMM_YYYY, getMomentObjFromServer(el?.created_at)),
          Task: <div data-toggle="tooltip" title={el?.task?.name}>Hover over me</div>,
          Description: el?.description,
          Start_Time: getDisplayDateFromMomentByType(HH_MM_A, getMomentObjFromServer(el?.start_time)),
          End_Time: getDisplayDateFromMomentByType(HH_MM_A, getMomentObjFromServer(el?.end_time)),
          // ETA:getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(el?.eta_time)),
          Status: el?.is_completed ? "complete" : "",
          "Edit": <MenuBar menuData={getGroupMenuItem} onClick={(element) => {
       
            const { start_time, end_time, task, id, description } = el
            const tasks = { id: task.id, text: task.name }
          

            if (element.id === '0') {

              setEditStatTimeEta(start_time)
              setEditEndTimeEta(end_time)
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
      <Card
      // style={{ height: showTaskGroup ? dynamicHeight.dynamicHeight : '5em' }}
      >
        <div>

          <div className="row">
            <div className="col">
              <h5>{'Date:'}</h5>
              <h5>{'Hours:'}</h5>

            </div>

            <div className="text-right mr-3 ">
              <Button
                text={'Add'}
                size={"sm"}
                onClick={() => {
                  addEtaTime.show()

                }}

              />

              <Image src={icons.downArrowBlack} height={13} width={13}
                onClick={() => {

                  setShowTaskGroup(!showTaskGroup)
                  if (!showTaskGroup) {
                    getEmployeesTimeList()

                  }

                }}
              />

            </div>
          </div>


        </div>
        <div style={{

          marginLeft: "-23px",
          marginRight: "-23px"
        }}>
          {employeeTimelineList && employeeTimelineList.length > 0 && <CommonTable

            tableDataSet={employeeTimelineList}
            displayDataSet={normalizedTableData(employeeTimelineList)}
            tableOnClick={(idx, index, item) => {

            }}

          />
          }
        </div>
      </Card>

      <Modal
        isOpen={addEtaTime.visible}
        size={'md'}
        onClose={() => {
          restValue()
        }}
        title={'AddTimeSheet'}
      >
        {/* <div>
          <DropDown
            heading={'Task'}
            selected={assignedTaskSelect.value}
            placeHolder={'please select a task priority...'}
            data={assignedTaskList}
            onChange={assignedTaskSelect.onChange}
          />
        </div> */}

        {<AutoSearchInput
          heading={'Task'}
          placeholder={'please select a task...'}
          data={assignedTaskDetails}
          // variant={true}
          onSelect={(item) => {
            setSelectedTask(item)

          }}


        />
        }


        <div>
          <Input
            heading={'description'}
            placeHolder={'description'}
            value={description.value}
            onChange={description.onChange} />
        </div>
        <div className="row">
          <div className="col-6">
            <DateTimePicker
              id="eta-picker"
              placeholder={'Start Time'}
              type="both"
              value={startTimeEta}
              onChange={handleStartTimeEtaChange}
            />
          </div>
          <div className="col-6">
            <DateTimePicker
              id="eta-picker"
              type="both"
              value={endTimeEta}
              placeholder={'End Time'}
              onChange={handleEndTimeEtaChange}
            />
          </div>
        </div>
        <div className='text-right'>
          <Button
            color={"secondary"}
            text={"cancle"}
            onClick={() => restValue()}
            className='text-center'
          />
          <Button
            text={"submit"}
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
        title={'editTimeSheet'}
      >
        <div>
          <DropDown
            heading={'AssignedTask'}
            selected={editAssignedTaskSelect.value}
            placeHolder={'please select a task priority...'}
            data={assignedTaskList}
            onChange={editAssignedTaskSelect.onChange}
          />
        </div>
        <div>
          <Input
            heading={'description'}
            placeHolder={'description'}
            value={editDescriptions.value}
            onChange={editDescriptions.onChange} />
        </div>
        <div className="row">
          <div className="col-6">
            <DateTimePicker
              id="eta-picker"
              placeholder={'Start Time'}
              type="both"
              value={editStartTimeEta}
              onChange={handleEditStartTimeEtaChange}
            />
          </div>
          <div className="col-6">
            <DateTimePicker
              id="eta-picker"
              type="both"
              value={editEndTimeEta}
              placeholder={'End Time'}
              onChange={handleEditEndTimeEtaChange}
            />
          </div>
        </div>
        <div className='text-right'>
          <Button
            color={"secondary"}
            text={"cancle"}
            onClick={() => editRestValue()}
            className='text-center'
          />
          <Button
            text={"submit"}
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