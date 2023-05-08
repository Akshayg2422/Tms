import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    getEmployeesl,
    getEmployeeTimeline
} from "@Redux";
import { useDropDown, useModal } from '@Hooks';
import { Card, CommonTable, DateTimePicker, DropDown, Modal } from '@Components';
import { getDisplayDateFromMomentByType , HDD_MMMM_YYYY_HH_MM_A ,getMomentObjFromServer, DD_MMMM_YYYY} from '@Utils';
import { translate } from "@I18n";

function EmployeeTimeSheet() {
    const dispatch = useDispatch();
    const addEtaTime= useModal(false);
    const employees = useDropDown({})
    const [startTimeEta, setStatTimeEta] = useState("")
  const [endTimeEta, setEndTimeEta] = useState("")
    const [employeesList, setEmployeesList] = useState([])
    const [employeesTimeSheets,setEmployeesTimeSheets]=useState([])
    const { dashboardDetails,employeeTimelineList } = useSelector((state: any) => state.UserCompanyReducer);
    const { company_branch } = dashboardDetails || ''

    useEffect(() => {
        getEmployeesDataList()
     
    }, [])

    const handleStartTimeEtaChange = (value: any) => {
        setStatTimeEta(value)
      };
    
      const handleEndTimeEtaChange = (value: any) => {
        setEndTimeEta(value)
      };
    const getEmployeesDataList=()=>{
        const params = {}
        dispatch(
            getEmployeesl({
                params,
                onSuccess: (response: any) => () => {
                    let employees: any = [];
                    const employeesData = response.details
                    employeesData.forEach((item) => {
                        employees = [...employees, { ...item, text: item.name }]
                    })
                    setEmployeesList(employees)
                },
                onError: (error) => () => {
                },
            })

        )
    }



const getEmployeesTimeList=(item:any)=>{
    const params={emp_id:item?.id}
    if(item?.id){
    dispatch(
        getEmployeeTimeline({
            params,
            onSuccess:(response)=>()=>{
                setEmployeesTimeSheets(response?.details)
            },
            onError:(error)=>()=>{

            }

        })

    )
    }
}



const normalizedTableData = (data: any) => {
    if (data && data?.length > 0){
        return data?.map((el: any) => {
        
            return{

              Date:getDisplayDateFromMomentByType(DD_MMMM_YYYY, getMomentObjFromServer(el?.created_at)),
              Task:<div className=''>{el?.task?.name}</div>,
              Start:getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(el?.start_time)),
              End:getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(el?.end_time)),
              // ETA:getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(el?.eta_time)),
              Status:el?.is_completed?"complete":""

            } }
        )

    }

}

    return (
        <div className='m-3'>
        <Card >
        <div>
            <div className='h4 text-muted'>
                {company_branch?.name}
            </div>
            <div className='col-4'>
                <DropDown
                    className="form-control-sm"
                    heading={translate("auth.employees")}
                    placeHolder={'employees'}
                    data={employeesList}
                    selected={employees.value}
                    onChange={(item) => {
                        employees.onChange(item)
                        getEmployeesTimeList(item)
                    }}
                />
            </div>
        </div>
        <div>
      {employeesTimeSheets &&employeesTimeSheets.length>0 &&  <CommonTable
           
            tableDataSet={employeesTimeSheets}
            displayDataSet={normalizedTableData(employeesTimeSheets)}
            tableOnClick={(idx, index, item) => {
              
              }}
          />
      }
        </div>
        </Card>
        <Modal
         isOpen={addEtaTime.visible}
         onClose={() => {
            addEtaTime.hide();
          }}
          title={translate("auth.addTimeSheet")!}
        >
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

        </Modal>
        </div>
    )
}

export { EmployeeTimeSheet }