import { getTicketsEvents } from '@Redux';
import { ChatProps } from './interfaces';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Sent({ item }: any) {
    const dispatch = useDispatch()

    // console.log('ticketEvent------------->', JSON.stringify(item))
    return (
        <>
            {
                item && item.map((eachticketEvents: any, index: number) => {
                    return (
                        <div className='d-flex justify-content-end'>
                            {item ? <div className=" col-4 alert alert-info fade show bg-gradient-info text-white">{eachticketEvents.message}</div> : null}
                        </div>
                    )
                })
            }
        </>
    )
}

function Receive({ item }: any) {
    console.log(item)
    const attachments = item.attachments

    return (
        <>
            {attachments && attachments.map(() => {
                return (
                    <div className=''>
                        {attachments ? <div className=" col-4 alert alert-info fade show bg-gradient-info text-white" role="alert">receive</div> : null}
                    </div>
                )
            })}
        </>
    )

}


function Chat({ item }: ChatProps) {

    const { ticketEvents } = useSelector((state: any) => state.CompanyReducer);

    console.log('ticketEvents======', JSON.stringify(ticketEvents));

    function getChatComponents() {

        const isUser = item === '78e9247d-6386-49c4-9d3c-cb16157d6a69';

        return <>{isUser ? <Sent item={ticketEvents?.data} /> : <Receive item={ticketEvents?.data} />}</>;
    }
    return <div>{getChatComponents()}</div>;
}

export { Chat }



