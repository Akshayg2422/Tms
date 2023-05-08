import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMomentObjFromServer, getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, validate, ADD_TIME_SHEET_DETAILS, ifObjectExist, DD_MMMM_YYYY, getValidateError } from '@Utils'
import {
  addEmployeeTimeline,
  getAssignedTask,
  getEmployeesl,
  getEmployeeTimeline
} from "@Redux";
import { useDropDown, useModal } from '@Hooks';
import { Button, Card, CommonTable, DateTimePicker, DropDown, MenuBar, Modal, showToast } from '@Components';
import { icons } from '@Assets';

function MyPortfolio() {
  const dispatch = useDispatch();
  const addEtaTime = useModal(false);
  const editEtaTime = useModal(false);
  const employees = useDropDown({})
  const assignedTaskSelect = useDropDown({})
  const [startTimeEta, setStatTimeEta] = useState("")
  const [endTimeEta, setEndTimeEta] = useState("")
  const editAssignedTaskSelect = useDropDown({})
  const [editStartTimeEta, setEditStatTimeEta] = useState("")
  const [assignedTasksId, setAssignedTaskId] = useState("")
  const [editEndTimeEta, setEditEndTimeEta] = useState("")
  const [assignedTaskList, setAssignedTaskList] = useState([])
  const { dashboardDetails, employeeTimelineList } = useSelector((state: any) => state.UserCompanyReducer);
  const { user_details } = dashboardDetails || ''
  const getGroupMenuItem = [
    { id: '0', name: "Edit", icon: icons.edit },

  ]
  console.log(editStartTimeEta,editEndTimeEta)


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


  const getEmployeesTimeList = () => {
    const params = {}
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
   function restValue(){
    setStatTimeEta('')
    setEndTimeEta('')
    addEtaTime.hide()
    assignedTaskSelect.onChange({})

   }

   function editRestValue(){
    setEditStatTimeEta('')
    setEditEndTimeEta('')
    editAssignedTaskSelect.onChange({})
    editEtaTime.hide()
    setAssignedTaskId('')

   }


  const getAssignedTaskList = () => {

    const params = {}
    dispatch(
      getAssignedTask({
        params,
        onSuccess: (response: any) => () => {

          const assignedTask = response?.details
          const assignedDetails = assignedTask.map((item) => {
            return {
              text: item.title, id: item.id
            }

          })
          setAssignedTaskList(assignedDetails)
        },
        onError: () => () => { }
      })
    )
  }

  const addEmployeeTimeSheet = () => {
    console.log('ppppp')
    const editAssignedId=editAssignedTaskSelect?.value?.id
    const assignedTaskId=assignedTaskSelect?.value?.id
    const params = {
      task_id: editAssignedId||assignedTaskId,
      start_time:editStartTimeEta||startTimeEta,
      end_time:editEndTimeEta||endTimeEta,
      ...(assignedTasksId &&{ id:assignedTasksId})
    }
    console.log(params,"ppppppp")
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
          Task: <div className=''>{el?.task?.name}</div>,
          Start: getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(el?.start_time)),
          End: getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(el?.end_time)),
          // ETA:getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(el?.eta_time)),
          Status: el?.is_completed ? "complete" : "",
          "Edit": <MenuBar menuData={getGroupMenuItem} onClick={(element) => {
            console.log(el,"ee")
            const{start_time,end_time,task,id}=el
            if (element.id === '0') {
              setEditStatTimeEta(start_time)
              setEditEndTimeEta(end_time)
              editAssignedTaskSelect.onChange(task)
              setAssignedTaskId(id)
              editEtaTime.show()
            }
          }} />
        }
      }
      )
    }

  }

  return (
    <div className='m-3'>
      <Card >
        <div>
          <div className='h4 text-muted'>
            {user_details?.name}
          </div>

          <div className="row">
            <div className="col-5">
              <h3>{'Date'}</h3>
            </div>
            <div className='col'>
              <h3>{'hours'}</h3>
            </div>
            <div className="text-right mr-3 ">
              <Button
                text={'Add'}
                size={"sm"}
                onClick={() => {
                  addEtaTime.show()
                  
                }}

              />

            </div>
          </div>


        </div>
        <div>
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
        title={'addTimeSheet'}
      >
        <div>
          <DropDown
            heading={'AssignedTask'}
            selected={assignedTaskSelect.value}
            placeHolder={'please select a task priority...'}
            data={assignedTaskList}
            onChange={assignedTaskSelect.onChange}
          />
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
            onClick={()=>restValue()}
            className='text-cente'
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
        <div className="row">
          <div className="col-6">
            <DateTimePicker
              id="eta-picker"
              placeholder={'Start Time'}
              type="both"
              value={editStartTimeEta}
              onChange={ handleEditStartTimeEtaChange}
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
            onClick={()=>editRestValue()}
            className='text-cente'
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