import React from 'react'

function Sent({ items }: any) {
    return (
        <div className='d-flex justify-content-start '>
            <div className=" col-4 alert alert-info fade show bg-gradient-white text-info" role="alert"> send</div>
        </div>
    )
}

function Receive({ items }: any) {
    return (
        <div className='d-flex justify-content-end mr-sm-5 '>
            <div className=" col-4 alert alert-info fade show bg-gradient-white text-info" role="alert">receive</div>
        </div>
    )
}

function Chat() {
    return (
        <div>
            <Sent />
            <Receive />
        </div>
    )
}

export { Chat }



