import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubTasks } from "@Redux";
import { HOME_PATH } from "@Routes";
import { useNavigation } from "@Hooks";
import { NoDataFound, CommonTable, Priority, Card, Button } from "@Components";

function SubTaskListing() {
    const dispatch = useDispatch();
    const { goTo } = useNavigation();
    const { subTasks, taskItem } = useSelector((state: any) => state.AdminReducer);

    useEffect(() => {
        getSubTaskHandler()
    }, [])

    const getSubTaskHandler = () => {
        const params = {
            task_id: taskItem?.id
        }

        dispatch(
            getSubTasks({
                params,
                onSuccess: () => () => { },
                onError: () => () => { },
            })
        );
    };

    const normalizedTableData = (data: any) => {

        return data.map((el: any) => {

            return {
                "Sub task": <div className="row m-0 overflow-auto overflow-hide"> <Priority priority={el?.priority} /> <span className="ml-2">{el?.title}</span></div>,
            };
        });
    };

    return (
        <div>
            {subTasks && subTasks?.data?.length > 0 ?
                <div className={'mx--5'}>
                    <CommonTable
                        title="SUB TASKS"
                        tableDataSet={subTasks?.data}
                        displayDataSet={normalizedTableData(subTasks?.data)}
                    />
                </div>
                :
                null
            }
        </div>
    )
}

export { SubTaskListing }