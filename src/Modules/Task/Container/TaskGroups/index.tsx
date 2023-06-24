import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTaskGroupsL, setSelectedGroupChatCode, setSelectedTaskGroupCode } from '@Redux'
import { Image } from '@Components'
import { getPhoto, DEFAULT_TASK_GROUP } from '@Utils'
import { TaskGroupProps } from './interfaces'

function TaskGroups({ onClick, showAll = true }: TaskGroupProps) {
    const { taskGroups } = useSelector((state: any) => state.TaskReducer);
    const { selectedTaskGroupCode } = useSelector((state: any) => state.UserCompanyReducer);
    const dispatch = useDispatch()

    console.log('TaskGroup=====>',JSON.stringify(selectedTaskGroupCode));
    

    useEffect(() => {
        const params = {
            per_page_count:-1
            
        }
        dispatch(
            getTaskGroupsL({
                params,
                onSuccess: () => () => {
                },
                onError: () => () => {
                },
            }))
    }, [])


    return (

        <div className='row overflow-auto  overflow-hide' >
            <div className='d-flex'>
                {taskGroups && taskGroups.length > 0 && taskGroups &&
             [DEFAULT_TASK_GROUP  ,...taskGroups].map((el: any, index: number) => {
                        const bgColor = selectedTaskGroupCode === el.id ? "bg-primary" : "bg-white"
                        const textColor = selectedTaskGroupCode === el.id ? "text-white" : ""
                        return (
                            <div
                                className={`card ${bgColor} ${index !== 0 && "ml-2"} pointer mb-2`}
                                key={el.code}
                                onClick={() => {
                                    dispatch(setSelectedTaskGroupCode(el.id))
                                    onClick(el.id)
                                }}
                                style={{
                                    width: 100,
                                    height: 38,
                                }}
                            >
                                <div className='col d-flex justify-content-center align-items-center'>
                                    {el.photo && <Image className='ml--1' variant={'rounded'} src={getPhoto(el.photo)} size={'xs'} />}
                                    <small className={` ml-2  ${textColor}`}><div className='text-xxs text-muted'>{el.name}</div> <div className='text-xs'>{'#' + el.code}</div></small>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export { TaskGroups }