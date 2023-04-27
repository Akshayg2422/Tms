import React, { useEffect } from 'react'
import { SubTasksProps } from './interfaces'
import { Card, H, Button, CommonTable, Priority, NoDataFound } from '@Components'
import { getSubTasks } from '@Redux'
import { useDispatch, useSelector } from 'react-redux'

function SubTasks({ cardHeight }: SubTasksProps) {

    const { subTasks, selectedTask } = useSelector((state: any) => state.TaskReducer);
    const dispatch = useDispatch()

    useEffect(() => {
        getSubTasksApi()
    }, [])

    function getSubTasksApi() {
        const params = {
            task_id: selectedTask.id
        }

        dispatch(getSubTasks({
            params,
            onSuccess: () => () => {
            },
            onError: () => () => {
            },
        }))
    }
    const normalizedTableData = (data: any) => {
        return data.map((el: any) => {
            return {
                "Sub task":
                    <div>
                        <Priority priority={el?.priority} />
                        <span className="ml-2">{el?.title}</span>
                    </div>
            };
        });
    };

    return (
        <Card style={{
            height: cardHeight
        }} >
            <div className='row justify-content-between px-3'>
                <H tag={'h5'} text={'SUB TASKS'} />
                <Button
                    size={"sm"}
                    text={'Add Task'}
                    onClick={() => { }}
                />
            </div>

            <div className='h-100'>
                {subTasks && subTasks.length > 0 ?
                    <CommonTable
                        tableDataSet={subTasks}
                        displayDataSet={normalizedTableData(subTasks)}
                        tableOnClick={(e, index, item) => {
                        }}
                    /> :
                    <div className='d-flex h-100 justify-content-center align-items-center'> <NoDataFound buttonText={'Add Task'} text="No SubTask found" /></div>
                }
            </div>
        </Card>
    )
}

export { SubTasks }