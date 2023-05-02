import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTaskGroupsL } from '@Redux'
import { Image } from '@Components'
import { getPhoto } from '@Utils'
import { icons } from '@Assets'
import { TicketGroupProps } from './interfaces'

function TicketGroups({ onClick }: TicketGroupProps) {
    const DEFAULT_GROUP = { id: 'ALL', Photo: null, code: "ALL" }
    const { taskGroups } = useSelector((state: any) => state.TaskReducer);
    const [selectedTaskGroup, setSelectedTaskGroup] = useState(DEFAULT_GROUP.code)
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
                [DEFAULT_GROUP, ...taskGroups].map((el: any) => {
                    const bgColor = selectedTaskGroup === el.code ? "bg-primary" : "bg-white"
                    const textColor = selectedTaskGroup === el.code ? "text-white" : ""
                    return (
                        <div key={el.code} className='ml-2 pointer' onClick={() => {
                            setSelectedTaskGroup(el.code)
                            onClick(el.id)
                            console.log(el.id)
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

export { TicketGroups }