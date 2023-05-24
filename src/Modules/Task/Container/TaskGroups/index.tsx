import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTaskGroupsL } from '@Redux'
import { Image } from '@Components'
import { getPhoto } from '@Utils'
import { TaskGroupProps } from './interfaces'

function TaskGroups({ onClick,showAll=true }: TaskGroupProps) {
    const DEFAULT_GROUP = { id: 'ALL', Photo: null, code: "ALL" }
    const { taskGroups } = useSelector((state: any) => state.TaskReducer);
    console.log(taskGroups)
    const groupCode=(taskGroups && taskGroups[0]?.id)
    // const [selectedTaskGroup, setSelectedTaskGroup] = useState<any>((showAll && groupCode )?DEFAULT_GROUP.id: groupCode )
     const taskGroupList= taskGroups && showAll?[DEFAULT_GROUP, ...(taskGroups.length>0?taskGroups:[])]:taskGroups
     const [selectedTaskGroup, setSelectedTaskGroup] = useState<any>()
    

    const dispatch = useDispatch()

    useEffect(() => {
        const params = {}
        dispatch(
            getTaskGroupsL({
                params,
                onSuccess: (response) => () => {
                },
                onError: () => () => {
                },
            }))
    }, [])

    useEffect(()=>{
        setSelectedTaskGroup((showAll && groupCode)?DEFAULT_GROUP.id: groupCode )

    },[taskGroupList])

    return (
        
        <div className='row mb-2 ' >
            {taskGroups && taskGroups.length > 0 && taskGroupList &&
               taskGroupList.map((el: any, index: number) => {
                    const bgColor = selectedTaskGroup === el.id ? "bg-primary" : "bg-white"
                    const textColor = selectedTaskGroup === el.id ? "text-white" : ""
                    return (
                        <div
                            className={`card ${bgColor} ml-2 pointer mb-2`}
                            key={el.code}
                            onClick={() => {
                                setSelectedTaskGroup(el.id)
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