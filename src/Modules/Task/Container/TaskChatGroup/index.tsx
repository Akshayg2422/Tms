import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getChatGroups, setSelectedGroupChatCode } from '@Redux'
import { Image } from '@Components'
import { getPhoto, stringToUpperCase } from '@Utils'
import { TaskChartGroupProps } from './interfaces'

function TaskChatGroup({ onClick, showAll = true }: TaskChartGroupProps) {


    const { selectedGroupChatCode, chatGroups } = useSelector((state: any) => state.UserCompanyReducer);
    const dispatch = useDispatch()
    

    useEffect(() => {
        const params = {}
        dispatch(
            getChatGroups({
                params,
                onSuccess: () => () => {
                 
                    
                },
                onError: () => () => {
                },
            }))

         
    }, [])
 
    useEffect(()=>{
        
        if(selectedGroupChatCode===undefined &&  chatGroups ){
        
            dispatch(setSelectedGroupChatCode(chatGroups[0].id))
            }

    },[])
   




    return (

        <div
            className='row overflow-auto  overflow-hide'>
            <div className='d-flex '>
                {chatGroups && chatGroups.length > 0 &&
                    chatGroups.map((el: any, index: number) => {
                        const bgColor = (selectedGroupChatCode ? selectedGroupChatCode : chatGroups[0].id) === el.id ? "bg-primary" : "bg-white"
                        const textColor = (selectedGroupChatCode ? selectedGroupChatCode : chatGroups[0].id) === el.id ? "text-white" : ""
                        return (
                            <div
                                className={`card ${bgColor} ${index !== 0 && "ml-2"} pointer`}
                                key={el.code}
                                onClick={() => {
                                    dispatch(setSelectedGroupChatCode(el.id))
                                    onClick(el.id)
                                }}
                                style={{
                                    width: 120,
                                    height: 40,
                                }}
                            >
                                <div className='d-flex row justify-content-center align-items-center'>
                                    {el.photo && <Image variant={'rounded'} src={getPhoto(el.photo)} size={'xs'} />}
                                    <div className={`ml-1 ${textColor}`}>
                                        <div className='text-xxs'>{el.name} </div>
                                        <div className='text-xs'>{stringToUpperCase('#' + el.code)}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export { TaskChatGroup }    