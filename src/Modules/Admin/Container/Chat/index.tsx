import { getTicketsEvents } from '@Redux';
import { ChatProps } from './interfaces';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPhoto } from '@Utils';




function Sent({ item }: any) {

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
    console.log('0000000000000000000000000',item)

    const { dashboardDetails } = useSelector((state: any) => state.AdminReducer);

    function getChatComponents() {

        const isUser = item.by_user?.id === dashboardDetails.user_details?.id;

        return <>{isUser ? <Receive item={item} /> : <Sent item={item} />}</>;
    }
    return <div>{getChatComponents()}</div>;
}

export { Chat }

// This is a functional component named "Chat" which receives a prop named "item" of type ChatProps. 
// The component is using Redux's useSelector hook to retrieve data from the state, specifically the "dashboardDetails" property 
// from the "AdminReducer" slice of the state.
// The component defines a function named "getChatComponents()" which determines whether the chat message was sent by the user or 
// received from another user. This is done by checking if the "id" property of the user who sent the message matches the "id" 
// property of the currently logged in user (retrieved from the "dashboardDetails" object in the state).
// Based on the result of this check, the function returns either the "Receive" or "Sent" component, 
// passing the "item" prop to the appropriate component.
// The component returns a div that renders the result of the "getChatComponents()" function.

