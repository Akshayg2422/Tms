import React, { useEffect } from 'react'
import { SubTasksProps } from './interfaces'
import { Card, H, Button, CommonTable, Priority, NoDataFound, HomeContainer } from '@Components'
import { getSubTasks, setSelectedTask, setSelectedTabPosition, selectedTaskIds, getSelectedReference, setSelectedTaskstatus, setSelectedTaskCode } from '@Redux'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useWindowDimensions } from '@Hooks'
import { ROUTES } from '@Routes'
import { useParams } from 'react-router-dom';
import { translate } from '@I18n'


function SubTasks({ cardHeight }: SubTasksProps) {
    const { id } = useParams()
    const { goTo } = useNavigation();
    const { subTasks,selectedTaskId,selectedTaskStatus } = useSelector((state: any) => state.TaskReducer);
    
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


        <HomeContainer className='card mt--3' >
            <div className={'overflow-auto overflow-hide '} style={{ height: height - 373}} >

                {(subTasks && subTasks.length > 0) && <div className='d-flex justify-content-between pt-3 px-3 pb-2'>
                    <H tag={'h4'} text={translate("auth.subTask")} />
                    <Button
                        className={'text-white shadow-none '}
                        size={"sm"}
                        text={translate("common.addSubTask")}
                        onClick={() => {
                            // dispatch(
                            //     setSelectedTaskCode(false)

                            //   )
                            goTo(ROUTES["task-module"]["add-sub-task"])
                         
                              
                            dispatch(setSelectedTask(id))
                        }}
                    />
                </div>
                }
                <div >
                    {subTasks && subTasks.length > 0 ?
                        <CommonTable
                            tableDataSet={subTasks}
                            displayDataSet={normalizedTableData(subTasks)}
                            tableOnClick={(e, index, item) => {
                                dispatch(setSelectedTask(item?.code))
                                dispatch(setSelectedTaskstatus([item,...selectedTaskStatus]))
                                dispatch(selectedTaskIds([...selectedTaskId,item?.code]))
                                dispatch(getSelectedReference({ code: item?.code, refer: true }))
                                dispatch(setSelectedTabPosition({ id: '1' }))
                               
                                //    dispatch(
                                //     setSelectedTaskCode(true)

                                //   )
                                  console.log('subtask')
                                goTo(ROUTES["task-module"]["tasks-details"] + '/' + item?.code + '/' + 'sub-task')

                            }}
                        /> :
                        <div className='pt-5' >
                            <NoDataFound buttonText={translate("common.addSubTask")!} text="No SubTask found" onClick={() => goTo(ROUTES["task-module"]["add-sub-task"])} isButton />
                        </div>
                    }
                </div>


            </div>


        </HomeContainer>
    )
}

export { SubTasks }