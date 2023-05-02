import React, { useEffect } from 'react'
import { SubTasksProps } from './interfaces'
import { Card, H, Button, CommonTable, Priority, NoDataFound } from '@Components'
import { getSubTasks, setSelectedTask } from '@Redux'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'
import { useParams } from 'react-router-dom';


function SubTasks({ cardHeight }: SubTasksProps) {
    const { id } = useParams()
    const { goTo } = useNavigation();
    const { subTasks } = useSelector((state: any) => state.TaskReducer);
    const dispatch = useDispatch()

    useEffect(() => {
        getSubTasksApi()
    }, [id])

    function getSubTasksApi() {
        const params = {
            task_id: id
        }

        dispatch(getSubTasks({
            params,
            onSuccess: (response) => () => {

            },
            onError: () => () => {
            },
        }))
    }
    const normalizedTableData = (data: any) => {
        return data.map((el: any) => {
            return {
                "Sub task":
                    <div className='row'>
                        <Priority priority={el?.priority} />
                        <span className="ml-2">{el?.title}</span>
                    </div>
            };
        });
    };

    return (
        <Card className="overflow-auto" style={{
            height: cardHeight
        }} >
            <div className='row justify-content-between px-3'>
                <H tag={'h5'} text={'SUB TASKS'} />
                <Button
                    size={"sm"}
                    text={'Add Task'}
                    onClick={() => {
                        goTo(ROUTES["task-module"]["add-sub-task"])
                    }}
                />
            </div>

            <div className='h-100 mt-2'>
                {subTasks && subTasks.length > 0 ?
                    <CommonTable
                        tableDataSet={subTasks}
                        displayDataSet={normalizedTableData(subTasks)}
                        tableOnClick={(e, index, item) => {
                            dispatch(setSelectedTask(item))
                            goTo(ROUTES["task-module"]["tasks-details"] + '/' + item?.id)

                        }}
                    /> :
                    <div className='d-flex h-100 justify-content-center align-items-center'> <NoDataFound buttonText={'Add Task'} text="No SubTask found" onClick={() => goTo(ROUTES["task-module"]["add-sub-task"])} isButton /></div>
                }
            </div>
        </Card>
    )
}

export { SubTasks }