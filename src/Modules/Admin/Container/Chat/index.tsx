import { getTicketsEvents } from '@Redux';
import { ChatProps } from './interfaces';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataAndTime, getPhoto } from '@Utils';




function Receive({ item }: any) {

    return (
        <>
            {
                item && item.message &&
                <div className='d-flex justify-content-end'>
                    <div className=" col-5 alert alert-info fade show bg-gradient-info text-white">
                        <div className='row'>
                            <div className='col-6 pb-3'>{item.by_user.name}</div>
                            <div className="col-6 text-xs text-capitalize">
                                {getDataAndTime(item.created_at)}
                            </div>
                        </div>
                        {item.message}
                        <div>
                            {item?.attachments && item.attachments.attachments.map((attach) => {
                                return (
                                    <div className=''>
                                        <div className="col-4 alert alert-info fade show bg-gradient-info text-white" role="alert">{getPhoto(attach.attachment_file)}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            }

            {item.tagged_users?.length > 0 && item.tagged_users.map((taggedElements) => {
                console.log('taggedElements', taggedElements);

                return (
                    <div className='d-flex justify-content-center'>
                        <div>{'@'+ taggedElements.name + 'tagged by '+ item.by_user.name} </div>
                    </div>
                )
            })}


        </>
    )
}

function Sent({ item }: any) {
    const attachments = item.attachments

    return (
        <>
            {
                item && item.message &&
                <div className='d-flex justify-content-start'>
                    <div className=" col-5 alert alert-info fade show bg-gradient-info text-white">
                        <div className='row'>
                            <div className='col-6 pb-3'>{item.by_user.name}</div>
                            <div className="col-6 text-xs text-capitalize">
                                {getDataAndTime(item.created_at)}
                            </div>
                        </div>
                        {item.message}
                        <div>
                            {item?.attachments && item.attachments.attachments.map((attach) => {
                                return (
                                    <div className=''>
                                        <div className="col-4 alert alert-info fade show bg-gradient-info text-white" role="alert">{getPhoto(attach.attachment_file)}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

            }
            {item.tagged_users?.length > 0 && item.tagged_users.map((taggedElements) => {
                console.log('taggedElements', taggedElements);

                return (
                    <div className=''>
                        <div className="col-4 alert alert-info fade show bg-gradient-info text-black" role="alert">{taggedElements.name}</div>
                    </div>
                )
            })}

        </>
    )

}

function Chat({ item }: ChatProps) {

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

