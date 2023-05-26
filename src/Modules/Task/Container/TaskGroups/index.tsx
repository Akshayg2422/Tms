import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTaskGroupsL, setSelectedGroupChatCode } from '@Redux'
import { Image } from '@Components'
import { getPhoto } from '@Utils'
import { TaskGroupProps } from './interfaces'

function TaskGroups({ onClick, showAll = true }: TaskGroupProps) {


    const DEFAULT_GROUP = { id: 'ALL', Photo: null, code: "ALL" }
    const { taskGroups } = useSelector((state: any) => state.TaskReducer);
    const { selectedGroupChatCode } = useSelector((state: any) => state.UserCompanyReducer);
    const taskGroupList = taskGroups 
    // && showAll ? [DEFAULT_GROUP, ...taskGroups] : taskGroups
    const dispatch = useDispatch()

    useEffect(() => {
        const params = {}
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

        <div className='row mb-2 overflow-hide' style={{
            overflowX: 'auto'
        }} >
            <div className='col d-flex ml--2'>
                {taskGroups && taskGroups.length > 0 && taskGroupList &&
                    taskGroupList.map((el: any, index: number) => {
                        const bgColor = selectedGroupChatCode === el.id ? "bg-primary" : "bg-white"
                        const textColor = selectedGroupChatCode === el.id ? "text-white" : ""
                        return (
                            <div
                                className={`card ${bgColor} ${index !== 0 && "ml-2"} pointer mb-2`}
                                key={el.code}
                                onClick={() => {
                                    dispatch(setSelectedGroupChatCode(el.id))
                                    onClick(el.id)
                                }}
                                style={{
                                    width: 100,
                                    height: 38,
                                }}
                            >
                                <div className='col d-flex justify-content-center align-items-center'>
                                    {el.photo && <Image className='ml--1' variant={'rounded'} src={getPhoto(el.photo)} size={'xs'} />}
                                    <small className={` ml-2  ${textColor}`}><div className='text-xxs'>{el.name}</div> <div className='text-xs'>{'#' + el.code}</div></small>
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