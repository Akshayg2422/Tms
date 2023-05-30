import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Collapse,

} from "reactstrap";
import { AuthContainerProps } from "./interfaces";
import { NoRecordsFound, Table, Button } from '@Components';

function CollapseButton({ title, children, displayDataSet, tableDataSet, tableOnClick, text, onClick, childrenS, selectedIds, selectedId }: AuthContainerProps) {
  const [openedCollapses, setOpenedCollapses] = useState<any>([selectedId])
  const collapsesToggle = (collapse) => {
    let openedCollapser = openedCollapses;
    if (openedCollapses.includes(collapse)) {
      setOpenedCollapses([])
    } else {
      setOpenedCollapses([collapse])

    }
  };


  return (
    <div className="accordion">

      <Card className="card-plain">

        <CardHeader
          role="tab"
          onClick={() => collapsesToggle(selectedIds)}

        // aria-expanded={openedCollapses.includes(
        //   "collapseOne"
        // )} 
        >
          <div className='row'>
            <div className='col'>
              {children}
              {/* <h4>{title}</h4> */}
            </div>
            <div className='col-auto mr-4'>
              <Button className={'text-white'} text={text} size='sm' onClick={onClick} />
            </div>
          </div>
        </CardHeader>

        <Collapse
          role="tabpanel"
          isOpen={openedCollapses.includes(selectedIds)}
        >
          <CardBody>
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