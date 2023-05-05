import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    getEmployeesl,
    getEmployeeTimeline
} from "@Redux";
import { useDropDown, useModal } from '@Hooks';
import { Card, CommonTable, DateTimePicker, DropDown, Modal } from '@Components';

function EmployeeTimeSheet() {
    const dispatch = useDispatch();
    const addEtaTime= useModal(false);
    const employees = useDropDown({})
    const [startTimeEta, setStatTimeEta] = useState("")
  const [endTimeEta, setEndTimeEta] = useState("")
    const [employeesList, setEmployeesList] = useState([])
    const { dashboardDetails,employeeTimelineList } = useSelector((state: any) => state.UserCompanyReducer);
    const { company_branch } = dashboardDetails || ''

    useEffect(() => {
        getEmployeesDataList()
        getEmployeesTimeList()

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

const getEmployeesTimeList=()=>{
    const params={}
    dispatch(
        getEmployeeTimeline({
            params,
            onSuccess:(response)=>()=>{

            },
            onError:(error)=>()=>{

            }

        })

    )
}

const normalizedTableData = (data: any) => {
    if (data && data?.length > 0){
        return data?.map((el: any) => {
            return{



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
                {company_branch?.name}
            </div>
            <div className='col-4'>
                <DropDown
                    className="form-control-sm"
                    heading={'employees'}
                    placeHolder={'employees'}
                    data={employeesList}
                    selected={employees.value}
                    onChange={(item) => {
                        employees.onChange(item)
                        // proceedParams({ task_status: item.id })
                    }}
                />
            </div>


        </div>
        <div>
      {employeeTimelineList &&employeeTimelineList.length>0 &&  <CommonTable
           
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
         onClose={() => {
            addEtaTime.hide();

          }}
          title={'addTimeSheet'}
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