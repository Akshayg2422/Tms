import React from 'react'
import { STATUS_LIST, getObjectFromArrayByKey } from "@Utils";
type statusProps = {
    status: any
  }
function Status({ status }:statusProps) {
    const color = getObjectFromArrayByKey(STATUS_LIST, 'id', status).color
    return <div className="">
      <span style={{ color: color }} className="">{getObjectFromArrayByKey(STATUS_LIST, 'id', status).text} </span>
    </div>
  }
  export {Status}