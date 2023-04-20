import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectSubTaskId, getSubTasks } from "@Redux";
import { useNavigation } from "@Hooks";
import { CommonTable, Priority, } from "@Components";

function SubTaskListing() {
    const dispatch = useDispatch();
    const { goTo } = useNavigation();
    const { subTasks, taskItem, getSubTaskId } = useSelector((state: any) => state.AdminReducer);

    useEffect(() => {
        getSubTaskHandler()
    }, [getSubTaskId])

    const getSubTaskHandler = () => {
        const params = {
            task_id: getSubTaskId ? getSubTaskId.id : taskItem?.id
        }

        dispatch(
            getSubTasks({
                params,
                onSuccess: (response) => () => { },
                onError: () => () => { },
            })
        );
    };

    const normalizedTableData = (data: any) => {

        return data.map((el: any) => {

            return {
                "Sub task":
                    <div className="row m-0 overflow-auto overflow-hide">
                        <Priority priority={el?.priority} />
                        <span className="ml-2">{el?.title}</span>
                    </div>
            };
        });
    };

    return (
        <div>
            {subTasks && subTasks?.data?.length > 0 ?
                <div className={'mx--6 pointer'}>
                    <CommonTable
                        tableDataSet={subTasks?.data}
                        displayDataSet={normalizedTableData(subTasks?.data)}
                        tableOnClick={(e, index, item) => {
                            dispatch(getSelectSubTaskId(item))
                        }}
                    />
                </div>
                :
                null
            }
        </div>
    )
}

export { SubTaskListing }