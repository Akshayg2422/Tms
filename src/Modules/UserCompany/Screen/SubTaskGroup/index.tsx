import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSubGroup } from '@Redux'
import { Image } from '@Components'
import { getPhoto } from '@Utils'
import { TaskGroupProps } from './interfaces'
import { icons } from '@Assets'
import { useDynamicHeight } from '@Hooks'

function SubTaskGroup({ onClick, showAll = true }: TaskGroupProps) {
    const { getSubGroups } = useSelector((state: any) => state.UserCompanyReducer);
    const groupCode = (getSubGroups && getSubGroups[0]?.id)

    const [selectedTaskGroup, setSelectedTaskGroup] = useState<any>(groupCode)
    const taskGroupList = getSubGroups
    let dynamicHeight: any = useDynamicHeight()

    const dispatch = useDispatch()

    useEffect(() => {
        const params = {}
        dispatch(
            getSubGroup({
                params,
                onSuccess: (response) => () => {
                },
                onError: () => () => {
                },
            }))
    }, [])

    return (
        <div style={{overflow:"auto",whiteSpace:"nowrap"}}>
        <div >
            {getSubGroups && getSubGroups.length > 0 && taskGroupList &&
                taskGroupList.map((el: any, index: number) => {
                    const bgColor = selectedTaskGroup ? selectedTaskGroup === el.id ? "bg-primary" : "bg-white" : groupCode === el.id ? "bg-primary" : "bg-white"
                    const textColor = selectedTaskGroup ? selectedTaskGroup === el.id ? "text-white" : "" : groupCode === el.id ? "text-white" : ""
                    return (
                        <div
                            className={`card ${bgColor} ml-2 pointer`}
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
                                {el.photo && <Image className='ml--1' variant={'rounded'}
                                    src={getPhoto(el.photo)} size={'xs'} />
                                    //  :
                                    //  <Image className='ml--1' variant={'rounded'}
                                    //  src={getPhoto(icons.addOutline)} size={'xs'} />
                                }

                                <small className={` ml-2  ${textColor}`}><div className='text-xxs'>{el.name}</div> <div className='text-xs'>{'#' + el.code}</div></small>
                            </div>
                        </div>
                    )
                })
            }
        </div >
        </div>
    )
}

export { SubTaskGroup }