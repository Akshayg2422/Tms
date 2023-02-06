import { getTicketsEvents } from '@Redux';
import { ChatProps } from './interfaces';


import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Sent({ item }: any) {
    const dispatch = useDispatch()
    const { selectedIssues } = useSelector((state: any) => state.AdminReducer);
    const { ticketEvents } = useSelector((state: any) => state.CompanyReducer);
    console.log(ticketEvents, "_____")
    console.log(ticketEvents?.data, 'ticketEvents');

    useEffect(() => {
        const params = {
            ticket_id: selectedIssues.id,
        };
        dispatch(
            getTicketsEvents({
                params,
                onSuccess: () => { },
                onFailure: () => { }
            })
        )
    }, [])

    console.log('ticketEvent------------->', JSON.stringify(ticketEvents))
    return (
        <>
            {
                ticketEvents && ticketEvents.data.map((eachticketEvents: any, index: number) => {
                    return (
                        <div className='d-flex justify-content-end'>
                            {ticketEvents ? <div className=" col-4 alert alert-info fade show bg-gradient-info text-white">{eachticketEvents.message}</div> : null}
                        </div>
                    )
                })
            }
        </>
    )
}

function Receive({ item }: any) {
    const attachments = item.attachments


    return (
        <>
            {attachments && attachments.map(() => {
                return (
                    <div className=''>
                        {attachments?<div className=" col-4 alert alert-info fade show bg-gradient-info text-white" role="alert">receive</div>:null}
                    </div>
                )

            })

            }
        </>
    )

}


function Chat({ item }: ChatProps) {
    console.log('iteeeeeeeeeeeeeeeeeeeee',item)
    const { dashboardDetails } = useSelector((state: any) => state.AdminReducer);

    console.log(JSON.stringify(dashboardDetails) + '======');

    function getChatComponents() {
        const isUser = item === '8a5fdb3a-33c9-47c1-8cac-5bd54b33fef5';

        return <>{isUser ? <Sent item={item} /> : <Receive item={item} />}</>;
    }
    return <div>{getChatComponents()}</div>;
}

export { Chat }



