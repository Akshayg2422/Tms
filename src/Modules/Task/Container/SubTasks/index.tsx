import React, { useEffect } from 'react'
import { SubTasksProps } from './interfaces'
import { Card, H, Button, CommonTable, Priority, NoDataFound } from '@Components'
import { getSubTasks, setSelectedTask } from '@Redux'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'

function SubTasks({ cardHeight }: SubTasksProps) {
    const { goTo } = useNavigation();
    const { subTasks, selectedTask } = useSelector((state: any) => state.TaskReducer);
    const dispatch = useDispatch()

    useEffect(() => {
        getSubTasksApi()
    }, [selectedTask])

    function getSubTasksApi() {
        const params = {
            task_id: selectedTask.id
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
        <Card style={{
            height: cardHeight
        }} >
            <div className='row justify-content-between px-3'>
                <H tag={'h5'} text={'SUB TASKS'} />
                <Button
                className={'shadow-none'}
                    size={"sm"}
                    text={'Add Task'}
                    onClick={() => {
                        goTo(ROUTES["task-module"]["add-sub-task"])
                    }}
                />
            </div>

            <Card className='h-100 mt-1 mx--4 overflow-auto overflow-hide shadow-none' style={{ maxHeight: '39vh' }}>
                {subTasks && subTasks.length > 0 ?
                    <CommonTable
                        tableDataSet={subTasks}
                        displayDataSet={normalizedTableData(subTasks)}
                        tableOnClick={(e, index, item) => {
                            dispatch(setSelectedTask(item))
                            goTo(ROUTES["task-module"]["tasks-details"] + '/' + item?.id)

                        }}
                    /> :
                    <div className='d-flex h-100 justify-content-center align-items-center'> <NoDataFound buttonText={'Add Task'} text="No SubTask found" /></div>
                }
            </Card>
        </Card>
    )
}

export { SubTasks }