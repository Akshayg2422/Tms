import React from 'react'

function CalenderView() {
  return (
    <div><div className="card card-calendar">
    <div className="card-body p-3">
      <div className="calendar" data-bs-toggle="calendar" id="calendar"></div>
    </div>
  </div></div>
  )
}

export {CalenderView}