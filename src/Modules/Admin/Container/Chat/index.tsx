import React from 'react'
import { useSelector } from 'react-redux'
import { Send } from '../Send';

function Sent({ items }: any) {
   
    const { ticketEvents } = useSelector((state: any) => state.CompanyReducer);
    console.log(ticketEvents,"_____")
    console.log(ticketEvents?.data, 'ticketEvents');
    return (
        <>
            {
                ticketEvents && ticketEvents.data.map((eachticketEvents: any, index: number) => {
                    return (
                        <div className='d-flex justify-content-end'>
                            <div className=" col-4 alert alert-info fade show bg-gradient-info text-white">{eachticketEvents.message}</div>
                        </div>
                    )
                })
            }
        </>
    )
}

function Receive({ items }: any) {
    return (
        <div className=''>
            <div className=" col-4 alert alert-info fade show bg-gradient-info text-white" role="alert">receive</div>
        </div>
    )
}

function Chat() {
    return (
        <div>
            <Receive />
            <Sent />
        </div>
    )
}

export { Chat }



