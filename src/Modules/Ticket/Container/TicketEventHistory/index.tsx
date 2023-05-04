import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTicketEventHistory } from '@Redux';
import { getDisplayDateFromMoment, getMomentObjFromServer } from '@Utils';
import { TicketEventHistoryProps } from './interface';
import { TimeLine } from '@Components'

function TicketEventHistory({ }: TicketEventHistoryProps) {

    const dispatch = useDispatch();
    const { selectedTicket, ticketEventHistories } = useSelector((state: any) => state.TicketReducer);

    useEffect(() => {
        getTicketEventHistoryApi()
    }, [])

    const getTicketEventHistoryApi = () => {

        const params = {
            ticket_id: selectedTicket.id,
        }

        dispatch(
            getTicketEventHistory({
                params,
                onSuccess: () => () => { },
                onError: (error) => () => { 
                    console.log("error",error)
                },
            })
        );
    }


  

    return (
        <div>
           
             {/* {
                ticketEventHistories && ticketEventHistories?.length > 0 && ticketEventHistories?.map((ticketEvent: any, index: number) => {
                    const { by_user, created_at, tagged_users, assigned_to, event_type } = ticketEvent
                    const show = index !== ticketEventHistories.length - 1
                    return (
                        <TimeLine showDotterLine={show} title={by_user?.name} time={getDisplayDateFromMoment(getMomentObjFromServer(created_at))}>
                            <h6 className="text-sm mt-1 mb-0">
                                {tagged_users && tagged_users.length > 0 && tagged_users.map((taggedUser: any) => {
                                    return (
                                        <div>{taggedUser.name}</div>
                                    )
                                })}
                            </h6>
                            <h6 className="text-sm mt-1 mb-0">
                                {assigned_to?.name}
                            </h6>
                            <h6 className="text-sm mt-1 mb-0">
                                {event_type}
                            </h6>
                        </TimeLine >
                    )
                })
            }  */}
        </div >
    )
}

export { TicketEventHistory }