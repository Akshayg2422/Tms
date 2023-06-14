import React, { useEffect } from 'react'
import { SubTasksProps } from './interfaces'
import { Card, H, Button, CommonTable, Priority, NoDataFound } from '@Components'
import { getSubTasks, setSelectedTask, setSelectedTabPosition } from '@Redux'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useWindowDimensions } from '@Hooks'
import { ROUTES } from '@Routes'
import { useParams } from 'react-router-dom';
import { translate } from '@I18n'

    
function SubTasks({ cardHeight }: SubTasksProps) {
    const { id } = useParams()
    const { goTo } = useNavigation();
    const { subTasks } = useSelector((state: any) => state.TaskReducer);
    const dispatch = useDispatch()
    const { height } = useWindowDimensions()

  

    useEffect(() => {
        getSubTasksApi()
    }, [id])

    function getSubTasksApi() {
        const params = {
            code: id
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
        if (data && data?.length > 0) {

            return data?.map((el: any) => {
           
                
                return {
                    "Sub task":
                        <div className='row'>
                            <Priority priority={el?.priority} />
                            <span className="ml-2">{el?.title}</span>
                        </div>
                };
            });
        }
        return []
    };

    return (

        <Card className="h-100  shadow-none overflow-auto overflow-hide" style={{ maxHeight: '44vh' }}>
            {(subTasks && subTasks.length > 0) && <div className='row justify-content-between px-3'>
                <H tag={'h5'} text={translate("auth.subTask")} />
                <Button
                    className={'text-white shadow-none '}
                    size={"sm"}
                    text={translate("common.addSubTask")}
                    onClick={() => {
                        goTo(ROUTES["task-module"]["add-sub-task"])
                        dispatch(setSelectedTask(id))
                    }}
                />
            </div>
            }

            {/* <Card className='h-100 mt-1 mx--4 overflow-auto overflow-hide shadow-none' style={{ maxHeight: '39vh' }}> */}
            <div className='pt-2 ' style={{marginRight:'-21px',marginLeft:'-21px'}}>
                {subTasks && subTasks.length > 0 ?
                    <CommonTable
                        tableDataSet={subTasks}
                        displayDataSet={normalizedTableData(subTasks)}
                        tableOnClick={(e, index, item) => {
                            // dispatch(setSelectedTask(item))
                            dispatch(setSelectedTabPosition({ id: '1' }))
                            goTo(ROUTES["task-module"]["tasks-details"] + '/' + item?.code)

                        }}
                    /> :
                    <div className='d-flex h-100 justify-content-center align-items-center'> <NoDataFound buttonText={translate("common.addSubTask")!} text="No SubTask found" onClick={() => goTo(ROUTES["task-module"]["add-sub-task"])} isButton /></div>
                }
                </div>
            {/* </Card> */}
        </Card>
    )
}

export { SubTasks }