import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTaskEventHistory } from '@Redux';
import { HDD_MMMM_YYYY_HH_MM_A, TASK_STATUS_LIST, getDisplayDateFromMoment, getDisplayDateFromMomentByType, getDisplayDateTimeFromMoment, getMomentObjFromServer, getObjectFromArrayByKey } from '@Utils';
import { TaskEventHistoryProps } from './interfaces'
import { TimeLine } from '@Components'
import { icons } from '@Assets';

function TaskEventHistory({ }: TaskEventHistoryProps) {

    const dispatch = useDispatch();
    const { selectedTask, taskEventHistories } = useSelector((state: any) => state.TaskReducer);

    useEffect(() => {
        getTaskEventHistoryApi()
    }, [])

    const getTaskEventHistoryApi = () => {

        const params = {
            task_id: selectedTask.id,
        }

        dispatch(
            getTaskEventHistory({
                params,
                onSuccess: () => () => { },
                onError: () => () => { },
            })
        );
    }




    function getIconsFromStatus(each: any) {
        const { event_type, by_user, message, eta_time, tagged_users, assigned_to, attachments, task_status, start_time, end_time } = each
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
                modifiedData = { ...each, icon: icons.taggedUserWhiteIcon, subTitle: by_user?.name, title: "tagged " + names }
                break;

            case 'RGU':
                modifiedData = { ...each, icon: icons.reassignedUserWhiteIcon, subTitle: by_user?.name, title: "Task Reassigned to " + assigned_to.name }
                break;
            case 'MEA':
                modifiedData = { ...each, icon: icons.attachmentWhiteIcon, subTitle: by_user?.name, title: attachments.name }
                break;
            case 'RTS':
                modifiedData = { ...each, icon: icons.referenceTaskWhiteIcon, subTitle: by_user?.name, title: 'User Attached Reference Task' }
                break;
            case 'EVS':
                modifiedData = { ...each, icon: icons.statusWhiteIcon, subTitle: by_user?.name, title: 'Changed Status to ' + getObjectFromArrayByKey(TASK_STATUS_LIST, 'id', task_status)?.text }
                break;
            case 'ETE':
                modifiedData = { ...each, icon: icons.endTime, subTitle: by_user?.name, title: 'Task End time is ' + getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(end_time)) }
                break;
            case 'ETS':
                modifiedData = { ...each, icon: icons.startTime, subTitle: by_user?.name, title: 'Task Start time is ' + getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(start_time)) }
                break;
        }
        return modifiedData
    }

    console.log(JSON.stringify(taskEventHistories) + '====taskEventHistories');

    return (
        <div className='m-1 mt-3 shadow-none overflow-auto overflow-hide' style={{ maxHeight: '58vh' }}>
            {
                taskEventHistories && taskEventHistories?.length > 0 && taskEventHistories?.map((taskEvent: any, index: number) => {
                    const { icon, subTitle, title, created_at }: any = getIconsFromStatus(taskEvent)
                    const show = index !== taskEventHistories.length - 1
                    return (
                        <TimeLine icon={icon} subTitle={subTitle} showDotterLine={show} title={title} time={getDisplayDateFromMoment(getMomentObjFromServer(created_at))}> </TimeLine >
                    )
                })
            }
        </div >
    )
}

export { TaskEventHistory }