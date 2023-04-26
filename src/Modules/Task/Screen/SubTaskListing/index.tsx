import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectSubTaskId, getSubTasks } from "@Redux";
import { useNavigation } from "@Hooks";
import { CommonTable, NoTaskFound, Priority, Image, Button } from "@Components";
import { icons } from "@Assets";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";

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
                <div className={'mx--6 mt--4 pointer'}>
                    <CommonTable
                        tableDataSet={subTasks?.data}
                        displayDataSet={normalizedTableData(subTasks?.data)}
                        tableOnClick={(e, index, item) => {
                            dispatch(getSelectSubTaskId(item))
                        }}
                    />
                </div>
                :
                <div className={''}><NoTaskFound text="No SubTask found" />
                    <Image
                        className={'border'}
                        variant={'rounded'}
                        src={icons.subTask}
                        size={'xl'}
                        style={{
                            position: 'absolute',
                            top: '72%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#D3D3D3'
                        }}
                    />
                    <div className="text-center">
                        <Button
                            size={'md'}
                            text={translate("common.addSubTask")}
                            onClick={() => {
                                goTo(HOME_PATH.CREATE_COMPANY);
                            }}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export { SubTaskListing }