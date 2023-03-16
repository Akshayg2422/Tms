import React from 'react'

interface TableProps {
  tableDataSet?: Array<{}>;
  displayDataSet?: Array<{}>;
  tableOnClick?: (event: any, index: number, item: object) => void;
  tableValueOnClick?: (event: any, index: number, item: object, elv: string) => void;
}

function Table({ tableDataSet, displayDataSet, tableOnClick, tableValueOnClick }: TableProps) {

  const renderTableHeader = () => {
    if (displayDataSet) {
      const header = Object.keys(displayDataSet[0])
      return header.map(key => {
        return <th scope="col" key={key}>{key}</th>
      })
    }
  }

  function renderTableValue(eachObject: object) {
    return Object.keys(eachObject).map((key: string) => {
      let value = eachObject[key as keyof object]
      return <td style={{ whiteSpace: 'pre-wrap' }} key={key} ><span>{value}</span></td>
    })
  }





  return (
    <div className="table-responsive">
      <table className="table align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            {
              renderTableHeader()
            }
          </tr>
        </thead>
        <tbody>
          {displayDataSet && displayDataSet.length > 0 &&
            displayDataSet.map((each_table_obj: object, idx: number) => {
              return (
                <tr key={idx} onClick={(e) => {
                  if (tableOnClick) {
                    e.preventDefault();
                    e.stopPropagation();
                    tableOnClick(e, idx, each_table_obj)
                  }
                }}>
                  {renderTableValue(each_table_obj)}
                </tr>)
            })
          }
        </tbody>
      </table>
    </div>
  )

}

export { Table }