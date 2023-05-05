import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
  addEmployeeTimeline,
    getEmployeesl,
    getEmployeeTimeline
} from "@Redux";
import { useDropDown, useModal } from '@Hooks';
import { Button, Card, CommonTable, DateTimePicker, DropDown, Modal } from '@Components';

function MyPortfolio() {
    const dispatch = useDispatch();
    const addEtaTime= useModal(false);
    const employees = useDropDown({})
    const [startTimeEta, setStatTimeEta] = useState("")
  const [endTimeEta, setEndTimeEta] = useState("")
    // const [employeesList, setEmployeesList] = useState([])
    const { dashboardDetails,employeeTimelineList } = useSelector((state: any) => state.UserCompanyReducer);
    const {user_details} = dashboardDetails || ''

    useEffect(() => {
     
        getEmployeesTimeList()

    }, [])

    const handleStartTimeEtaChange = (value: any) => {
        setStatTimeEta(value)
      };
    
      const handleEndTimeEtaChange = (value: any) => {
        setEndTimeEta(value)
      };
 

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


const addEmployeeTimeSheet=()=>{
  const params={
task_id : "ddfc9aa8-6606-4b97-ad78-87ed28dcb931",
start_time:startTimeEta,
end_time :endTimeEta,
  }
  dispatch(
      addEmployeeTimeline({
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
              onClick={()=>{
                addEtaTime.show()
              }}
             
            />
          
          </div>
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
         size={'md'}
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
          <div className='text-right'>
            <Button
            color={"secondary"}
            text={"cancle"}
            onClick={addEtaTime.hide}
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

export {MyPortfolio}