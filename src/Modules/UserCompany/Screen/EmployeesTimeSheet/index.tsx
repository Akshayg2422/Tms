import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
  getEmployeeTimeline
} from "@Redux";

import { Card, CommonTable, NoDataFound } from '@Components';
import { getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer, DD_MMMM_YYYY } from '@Utils';
import { translate } from "@I18n";
function EmployeesTimeSheet() {
  const dispatch = useDispatch();
  const [employeesTimeSheets, setEmployeesTimeSheets] = useState([])
  const {  selectedEmployee } = useSelector((state: any) => state.UserCompanyReducer);
  const { id,name } = selectedEmployee
  useEffect(() => {
    const params = {emp_id:id }

    dispatch(
      getEmployeeTimeline({
        params,
        onSuccess: (response) => () => {
          setEmployeesTimeSheets(response?.details?.data)
        },
        onError: (error) => () => {

        }

      })

    )

  }, [])


  const normalizedTableData = (data: any) => {
    if (data && data?.length > 0) {
      return data?.map((el: any) => {

        return {
          Date: getDisplayDateFromMomentByType(DD_MMMM_YYYY, getMomentObjFromServer(el?.created_at)),
          Task: <div className=''>{el?.task?.name}</div>,
          Start: getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(el?.start_time)),
          End: getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(el?.end_time)),
          // ETA:getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(el?.eta_time)),
          Status: el?.is_completed ? "complete" : ""

        }
      }
      )

    }

  }
  return (
    <div className='m-3'>
      <Card >
        <div className='h3'>{name}</div>
        <div
           style={{
              
            marginLeft:"-23px",
            marginRight:"-23px"
          }}>
          {employeesTimeSheets ? 
          <CommonTable
            tableDataSet={employeesTimeSheets}
            displayDataSet={normalizedTableData(employeesTimeSheets)}
             />
          : <NoDataFound type={'action'} text={'No Data Found'} />
          }
        </div>
      </Card>

    </div>
  )
}

export { EmployeesTimeSheet }