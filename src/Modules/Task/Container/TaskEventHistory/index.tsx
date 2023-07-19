import { icons } from '@Assets';
import { TimeLine } from '@Components';
import { getTaskEventHistory } from '@Redux';
import { HDD_MMMM_YYYY_HH_MM_A, INITIAL_PAGE, TASK_STATUS_LIST, getDisplayDateFromMomentByType, getMomentObjFromServer, getObjectFromArrayByKey } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TaskEventHistoryProps } from './interfaces';

function TaskEventHistory({ }: TaskEventHistoryProps) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [taskEventHistory, setTaskEventHistory] = useState([])
    const [taskEventsCurrentPage, setEventsTaskCurrentPage] = useState(INITIAL_PAGE)
    const { taskEventHistories, refreshTaskEvents } = useSelector((state: any) => state.TaskReducer);




    useEffect(() => {
        getTaskEventHistoryApi(INITIAL_PAGE)
    }, [refreshTaskEvents, id])



    function getTaskEventsDisplayData(data: any) {
        if (data && data.length > 0) {
            return data.map(each => {
                return {
                    ...getIconsFromStatus(each)
                }
            })
        }

    }
    const getTaskEventHistoryApi = (page_numbers: number) => {

        const params = {
            code: id,
            per_page_count: -1,
        }

        dispatch(
            getTaskEventHistory({
                params,
                onSuccess: (response: any) => () => {
                    const taskEventsResponse = response.details
                    let updatedData = []
                    if (taskEventsResponse && taskEventsResponse.length > 0) {
                        if (page_numbers === 1) {
                            updatedData = getTaskEventsDisplayData(taskEventsResponse)
                        } else {
                            updatedData = getTaskEventsDisplayData([...taskEventHistory, ...taskEventsResponse] as any)
                        }
                    }
                    setTaskEventHistory(updatedData)
                    setEventsTaskCurrentPage(taskEventsResponse.next_page)


                },
                onError: () => () => { },
            })
        );
    };

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



    return (


        <div className='shadow-none overflow-auto overflow-hide' style={{ maxHeight: '58vh' }}>

            {
                taskEventHistories && taskEventHistory?.length > 0 && taskEventHistory?.map((taskEvent: any, index: number, event: any) => {

                    const showDotLine = index !== taskEventHistories.length - 1
                    const { icon, title, subTitle, created_at, }: any = getIconsFromStatus(taskEvent)

                    return (
                        <TimeLine
                            icon={icon}
                            subTitle={subTitle}
                            showDotterLine={showDotLine}
                            title={title}
                            time={getDisplayDateFromMomentByType(HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer(created_at))}>
                        </TimeLine >
                    )
                }
                )
            }
        </div >

    )
}

export { TaskEventHistory };
