import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTaskGroupsL } from '@Redux'
import { Image } from '@Components'
import { getPhoto } from '@Utils'
import { TaskGroupProps } from './interfaces'

function TaskGroups({ onClick,selectAll=true }: TaskGroupProps) {
    const DEFAULT_GROUP = { id: 'ALL', Photo: null, code: "ALL" }
    const { taskGroups } = useSelector((state: any) => state.TaskReducer);
    console.log(taskGroups)
    const groupCode=(taskGroups && taskGroups[0]?.code)
    const [selectedTaskGroup, setSelectedTaskGroup] = useState<any>(selectAll?DEFAULT_GROUP.code:groupCode)
    const taskGroupList= taskGroups && selectAll?[DEFAULT_GROUP, ...taskGroups]:taskGroups
    const dispatch = useDispatch()

    useEffect(() => {
        const params = {}
        dispatch(
            getTaskGroupsL({
                params,
                onSuccess: (response) => () => {
                    console.log("===--->",JSON.stringify(response))
                },
                onError: () => () => {
                },
            }))
    }, [])

    return (
        <div className='row'>
            {taskGroups && taskGroups.length > 0 &&
               taskGroupList.map((el: any, index: number) => {
                    const bgColor = selectedTaskGroup === el.code ? "bg-primary" : "bg-white"
                    const textColor = selectedTaskGroup === el.code ? "text-white" : ""
                    return (
                        <div
                            className={`card ${bgColor} ml-2 pointer`}
                            key={el.code}
                            onClick={() => {
                                setSelectedTaskGroup(el.code)
                                onClick(el.id)
                                console.log(el.id)
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
        </div >
    )
}

export { TaskGroups }