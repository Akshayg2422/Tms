import { getTicketsEvents } from '@Redux';
import { ChatProps } from './interfaces';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPhoto } from '@Utils';




function Sent({ item }: any) {


    console.log('ticketEvent------------->', JSON.stringify(item))
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
            {attachments && attachments.length > 0 && attachments.map(() => {
                return (
                    <div className=''>
                        {attachments ? <div className="col-4 alert alert-info fade show bg-gradient-info text-white" role="alert">{getPhoto(item.attachment_file)}</div> : null}
                    </div>
                )
            })}
        </>
    )

}



function Chat({ item }: ChatProps) {
    const dispatch = useDispatch()

    // useEffect(() => {
    //     beginGetTicketEvents()
    // }, []);

    // const { ticketEvents } = useSelector((state: any) => state.CompanyReducer);
    const { dashboardDetails } = useSelector((state: any) => state.AdminReducer);

    // console.log('ticketEvents======', JSON.stringify(ticketEvents));
    // console.log('beginGetTicketEvents------------------------======', JSON.stringify(beginGetTicketEvents));

    // function beginGetTicketEvents() {


    //     if (selectedIssues) {
    //         const params = {
    //             ticket_id: selectedIssues.id,
    //         };

    //         dispatch(
    //             getTicketsEvents({
    //                 params,
    //                 onSuccess: () =>()=> { },
    //                 onError: () =>()=> { }
    //             })
    //         )
    //     }
    // }

    function getChatComponents() {

        const isUser = item.by_user?.id === dashboardDetails.user_details?.id;

        return <>{isUser ? <Sent item={item} /> : <Receive item={item} />}</>;
    }
    return <div>{getChatComponents()}</div>;
}

export { Chat }



