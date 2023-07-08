import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Collapse,

} from "reactstrap";
import { AuthContainerProps } from "./interfaces";
import { NoRecordsFound, Table, Button, ImageIcon } from '@Components';
import { Tabs, Image } from "@Components";
import { icons } from '@Assets';

function CollapseButton({ title, children, displayDataSet, tableDataSet, tableOnClick, text, onClick, childrenS, selectedIds, selectedId, selectButton = true, taskStatus,
  selectButtonReject = false, textReject,
  onClickReject, ApprovedStatus ,textEnable,onClickEnable,enableButton=false}: AuthContainerProps) {
  const [openedCollapses, setOpenedCollapses] = useState<any>([selectedId])
  let currentDate = new Date()
  let currentDay = currentDate.getDate()
  let currentMonth = currentDate.getMonth()
  let currentYear = currentDate.getFullYear()
  let dateFormate 
if(currentDay<=9){
dateFormate = `${currentYear}-${0}${currentMonth + 1}-${0}${currentDay}`
}
else{
dateFormate = `${currentYear}-${0}${currentMonth + 1}-${currentDay}`

}

  useEffect(() => {
    collapsesToggle(dateFormate)

  }, [])
  const collapsesToggle = (collapse) => {

    let openedCollapser = openedCollapses;
    if (openedCollapses.includes(collapse)) {
      setOpenedCollapses([])
    } else {
      setOpenedCollapses([collapse])

    }
  };



  const year = title.getFullYear();
  const month = title.toLocaleString('default', { month: 'long' });
  const date = title.getDate();

  const formattedDate = `${month} ${date}, ${year}`

  return (
    <div >

      <Card className="card-plain">

        <div>

          <CardHeader
            role="tab"
          // onClick={() => collapsesToggle(selectedIds)}

          // aria-expanded={openedCollapses.includes(
          //   "collapseOne"
          // )} 
          >
            <div className='row'>
              <div className='col'>
                {formattedDate}
              </div>

              {taskStatus && <div className='row'>
                <div className='text-sm text-muted'>Reason :</div>
                <div className='text-sm pl-2  text-primary '>
                  {taskStatus}
                </div>
              </div>
              }

              <div className='col-auto pl-5 row'>



                {selectButtonReject ? <div className='col-auto '>
                  <Button className={'text-white'} text={textReject} size='sm' onClick={onClickReject} />
                </div> : <div className='h5 text-primary mr-5'>
                  {ApprovedStatus === 'APT' ? "Approved" : ApprovedStatus === 'REJ' ? 'Reject' : ''}

                </div>
                }

                {selectButton && <div className='col-auto '>
                  <Button className={'text-white'} text={text} size='sm' onClick={onClick} />
                </div>
                }

{enableButton&& <div className='col-auto'>
                  <Button className={'text-white'} text={textEnable} size='sm' onClick={onClickEnable} />
                </div>
                }

              </div>


              <div className='mr-2 col-auto pointer' onClick={() => collapsesToggle(selectedIds)}>
                <ImageIcon src={icons.downArrowBlack} height={12} width={12} />

              </div>


            </div>



          </CardHeader>




        </div>

        <Collapse
          role="tabpanel"
          isOpen={openedCollapses.includes(selectedIds)}
        >

          <CardBody className='pb-6 shadow-none'>
            {childrenS}
            <div style={{

              marginLeft: "-23px",
              marginRight: "-23px"
            }}>
              {displayDataSet && displayDataSet.length > 0 ? <Table tableDataSet={tableDataSet} displayDataSet={displayDataSet} tableOnClick={tableOnClick} /> : <NoRecordsFound />}

            </div>
          </CardBody>
        </Collapse>

      </Card>

    </div>

  )
}

export { CollapseButton }