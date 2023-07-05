import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMomentObjFromServer, getDisplayDateFromMomentByType, DD_MMMM_YYYY, HH_MM_A, getDisplayDateFromMoment } from '@Utils'
import {
  addEmployeeTimeline,
  employeeTimeLineStatus,
  getEmployeeTimeline
} from "@Redux";
import { Button, Image, CollapseButton, Modal, Input } from '@Components';
import { icons } from '@Assets';
import { ROUTES } from '@Routes'
import { useInput, useModal, useNavigation } from '@Hooks'
import { translate } from "@I18n";
import moment from 'moment';


function TimeApproval() {
  const dispatch = useDispatch();
  const { goTo } = useNavigation();
  const [formattedShift, setFormattedShift] = useState<any>('')
  const [date, setDate] = useState<any>()
  const [status, setStatus] = useState<any>()
  const addRejectReasonModal = useModal(false)
  const reason = useInput("");



  //start date
  const [startDate, setStartDate] = useState(moment().startOf('week'))
  const [endDate, setEndDate] = useState(moment().endOf('week'))
  const [currentDates, setCurrentDates] = useState(new Date());

  const { employeeTimeline } = useSelector((state: any) => state.UserCompanyReducer);

  useEffect(() => {

    getEmployeesTimeList()
  }, [startDate])


  useEffect(() => {

    if (employeeTimeline && employeeTimeline.length > 0) {
      getDropDownDisplayData()

    }
  }, [employeeTimeline])


  // add time sheet]

  const addEmployeeTimeSheet = (item: any, id: any) => {
    const params = {
      timeline_status: id,
      date: item,
      ...(reason.value && { reason: reason.value })

    }
  
      dispatch(
         employeeTimeLineStatus({
          params,
          onSuccess: (response) => () => {
            addRejectReasonModal.hide()
            
            getEmployeesTimeList()

        },
        onError: (error) => () => {
        }

      })
    )


  }


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
          //     '':
          //     <div>
          //     {el?.timeline_status==='PAL' ?
          //         <div>
          //         <Button size={'sm'} text={'Approved'} onClick={() => {
          //           setSelectApproval(true)

          //           addEmployeeTimeSheet(el.id,'APT')
          //         }} />
          //         <Button size={'sm'} text={'Reject'} onClick={() => {
          //           setSelectReject(true)
          //           addEmployeeTimeSheet(el.id,'REJ')

          //         }} />
          //       </div>
          // :el?.timeline_status==='APT'?<div className='text-primary h5'>Approved</div>:<div className='text-primary h5'>Rejected</div>}
          // </div>

        }

      }
      )
    }
  }

  return (
    <div className='m-3'>
      <Modal

        isOpen={addRejectReasonModal.visible}
        onClose={() => {
          addRejectReasonModal.hide()
        }}
        size='sm'
        title={'Reject Reason'}
      >
        <div className='h4 col text-muted pb-3 '>
          Date : {getDisplayDateFromMomentByType(DD_MMMM_YYYY, getMomentObjFromServer(date))}
        </div>
        <div className="col-12">
          <Input
            placeholder={'Reject Reason'}
            value={reason.value}
            onChange={reason.onChange}
          />
        </div>

        <div className="text-right">
          <Button
            color={"secondary"}
            text={translate("common.cancel")}
            onClick={() => {
              addRejectReasonModal.hide()

            }}
          />
          <Button
            text={translate("common.submit")}
            onClick={() => {
              addEmployeeTimeSheet(date, status)

            }}
          />
        </div>

      </Modal>
      <div className='text-right pb-3'>

        <Button text={'ResubmitRequests'} size={'sm'} onClick={() => {

          goTo(ROUTES['user-company-module']['re-submit-request'])
        }} />

      </div>
      <div className='card  p-4' style={{ flexDirection: 'row' }}>
        <div className="h3">{translate('order.This Week')}</div>
        <div className="h3  col">{`(${startDate.format('MMMM DD, YYYY')} - ${endDate.format('MMMM DD, YYYY')})`}</div>
        <div>
          <Image className="mx-2 pointer" src={icons.previousBackArrow} height={20} width={20} onClick={() => { getPreviousWeekDates() }} />
          <Image className="mx-2 pointer" src={icons.nextArrow} height={20} width={20} onClick={() => { getNextWeekDates() }} />
        </div>
      </div>

      <>

        <div>
          {formattedShift && formattedShift.length > 0 && formattedShift.map((el, index) => {
            return (
              <CollapseButton
                selectedIds={formattedShift[index]?.date}
                title={new Date(formattedShift[index]?.date)}
                tableDataSet={formattedShift[index].taskListedArray}
                displayDataSet={normalizedTableDatas(formattedShift[index].taskListedArray)}
                text={'Approved'}
                ApprovedStatus={formattedShift[index]?.taskListedArray[0]?.timeline_status}
                // selectButtonReject={true}
                selectButton={formattedShift[index]?.taskListedArray[0]?.timeline_status === 'PAL' ? true : false}
                selectButtonReject={formattedShift[index]?.taskListedArray[0]?.timeline_status === 'PAL' ? true : false}
                textReject={'Reject'}
                onClick={() => {

                  addEmployeeTimeSheet(el.date, 'APT')
                  setDate(el.date)
                  setStatus('APT')
                }}
                onClickReject={() => {
                  // addEmployeeTimeSheet(el.date,'REJ')
                  addRejectReasonModal.show()
                  setDate(el.date)
                  setStatus('REJ')
                }}

              />
            )
          })}

        </div>


      </>




    </div>
  )
}

export { TimeApproval }