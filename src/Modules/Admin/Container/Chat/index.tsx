import React from 'react'
import { useSelector } from 'react-redux'

function Sent({ items }: any) {
    const { ticketEvents } = useSelector((state: any) => state.CompanyReducer);
    console.log(ticketEvents.data, 'ticketEvents');

    return (
        <>
            {
                ticketEvents && ticketEvents.data.map((eachticketEvents: any, index: number) => {
                    return (

                        <div className='d-flex justify-content-start '>
                            <div className=" col-4 alert alert-info fade show bg-gradient-info text-white" role="alert">{eachticketEvents.message}</div>
                        </div>
                    )
                })
            }
        </>
    )
}

function Receive({ items }: any) {
    return (
        <div className='d-flex justify-content-end mr-sm-5 '>
            <div className=" col-4 alert alert-info fade show bg-gradient-info text-white" role="alert"></div>
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



