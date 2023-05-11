import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTicketEventHistory } from '@Redux';
import { HDD_MMMM_YYYY_HH_MM_A, TICKET_STATUS_LIST, getDisplayDateFromMoment, getDisplayDateFromMomentByType, getMomentObjFromServer, getObjectFromArrayByKey } from '@Utils';
import { TicketEventHistoryProps } from './interface';
import { TimeLine } from '@Components'
import { icons } from '@Assets';

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
                },
            })
        );
    }

    function getIconsFromStatus(each: any) {
        const { event_type, by_user, message, eta_time, tagged_users, assigned_to, attachments, ticket_status, start_time, end_time } = each
        let modifiedData = {}
        switch (event_type) {
            case 'TEM':
                modifiedData = { ...each, icon: icons.message, subTitle: by_user?.name, title: message, }
                break;
            case 'ETA':
                modifiedData = { ...each, icon: icons.clock, subTitle: by_user?.name, title: "ETA Updated on " + getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(eta_time)), }
                break;
            case 'TGU':
                let names = tagged_users.map(function (item) {
                    return '@' + item['name'] + " ";
                });
                modifiedData = { ...each, icon: icons.profile, subTitle: by_user?.name, title: "tagged " + names }
                break;
            case 'RGU':
                modifiedData = { ...each, icon: icons.profile, subTitle: by_user?.name, title: "Task Reassigned to " + assigned_to.name }
                break;
            case 'MEA':
                modifiedData = { ...each, icon: icons.pencil, subTitle: by_user?.name, title: attachments.name }
                break;
            case 'RTS':
                modifiedData = { ...each, icon: icons.pencil, subTitle: by_user?.name, title: 'User Attached Reference Task' }
                break;
            case 'EVS':
                modifiedData = { ...each, icon: icons.pencil, subTitle: by_user?.name, title: 'Changed Status to ' + getObjectFromArrayByKey(TICKET_STATUS_LIST, 'id', ticket_status)?.text }
                break;
            case 'ETE':
                modifiedData = { ...each, icon: icons.pencil, subTitle: by_user?.name, title: 'Task End time is ' + getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(end_time)) }
                break;
            case 'ETS':
                modifiedData = { ...each, icon: icons.pencil, subTitle: by_user?.name, title: 'Task Start time is ' + getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(start_time)) }
                break;
        }
        return modifiedData
    }

    return (
        <div>
             {
                ticketEventHistories && ticketEventHistories?.length > 0 && ticketEventHistories?.map((ticketEvent: any, index: number) => {
                    const { icon, subTitle, title, created_at }: any = getIconsFromStatus(ticketEvent)
                    const show = index !== ticketEventHistories.length - 1
                    return (
                        <TimeLine icon={icon} subTitle={subTitle} showDotterLine={show} title={title} time={getDisplayDateFromMoment(getMomentObjFromServer(created_at))}>  </TimeLine >
                    )
                })
            } 
        </div >
    )
}

export { TicketEventHistory }