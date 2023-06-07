import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMomentObjFromServer, getDisplayDateFromMomentByType, DD_MMMM_YYYY, HH_MM_A, getDisplayDateFromMoment } from '@Utils'
import {
  addEmployeeTimeline,
  getEmployeeTimeline
} from "@Redux";
import { Button, Image, CollapseButton, } from '@Components';
import { icons } from '@Assets';
import { ROUTES } from '@Routes'
import { useNavigation } from '@Hooks'
import { translate } from "@I18n";
import moment from 'moment';

function TimeApproval() {
  const dispatch = useDispatch();
  const { goTo } = useNavigation();
  const [formattedShift, setFormattedShift] = useState<any>('')
  const [selectApproval, setSelectApproval] = useState<boolean>(false)
  const [selectReject, setSelectReject] = useState<boolean>(false)



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

 


     const addEmployeeTimeSheet = (item:any,id:any) => {
    const params = {
      timeline_status:id,
       id:item
   
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
          '':
          <div>
          {el?.PENDING_APPROVAL ?
              <div>
              <Button size={'sm'} text={'Approved'} onClick={() => {
                setSelectApproval(true)
                console.log(el.id,"ee")
                addEmployeeTimeSheet(el.id,'APT')
              }} />
              <Button size={'sm'} text={'Reject'} onClick={() => {
                setSelectReject(true)
                addEmployeeTimeSheet(el.id,'REJ')
               
              }} />
            </div>
      :el?.timeline_status==='APT'?<div>Accept</div>:<div>Reject</div>}
      </div>



      }
        
      }
      )
    }
  }

  return (
    <div className='m-3'>
      <div className='card mx--2 p-4' style={{ flexDirection: 'row' }}>
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
            return (
              <CollapseButton
                selectedIds={formattedShift[index]?.date}
                title={new Date(formattedShift[index]?.date)}
                tableDataSet={formattedShift[index].taskListedArray}
                displayDataSet={normalizedTableDatas(formattedShift[index].taskListedArray)}
                selectButton={false}
              />
            )
          })}
        </div>

      </>

    </div>
  )
}

export { TimeApproval }