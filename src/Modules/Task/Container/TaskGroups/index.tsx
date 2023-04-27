import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTaskGroupsL } from '@Redux'
import { Image } from '@Components'
import { getPhoto } from '@Utils'
import { icons } from '@Assets'
import { TaskGroupProps } from './interfaces'

function TaskGroups({ onClick }: TaskGroupProps) {
    const { taskGroups } = useSelector((state: any) => state.TaskReducer);
    const [selectedTaskGroup, setSelectedTaskGroup] = useState('All')
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
        <div className='row'>
            {taskGroups && taskGroups.length > 0 &&
                taskGroups.map((el: any) => {
                    const bgColor = selectedTaskGroup === el.code ? "bg-primary" : "bg-white"
                    const textColor = selectedTaskGroup === el.code ? "text-white" : ""
                    return (
                        <div key={el.code} className='ml-2 pointer' onClick={() => {
                            setSelectedTaskGroup(el.code)
                            onClick(el.code)
                        }}>
                            <div className={`card ${bgColor}`}>
                                <div className='col py-1'>
                                    <Image className='ml--1' variant={'rounded'} src={el.photo ? getPhoto(el.photo) : icons.profile} size={'xs'} />
                                    <small className={`ml-2  ${textColor}`}>{'#' + el.code}</small>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div >
    )
}

export { TaskGroups }