import React, { useEffect } from 'react'
import { Card, Button, Input, Image } from '@Components'
import { useInput } from '@Hooks'
import { useDispatch, useSelector } from 'react-redux'
import { addTicketEvent, getTicketsEvents } from '@Redux';

type SendProps = {
    onClick: () => void;
    value:any;
    onChange:any
  }

function Send({onClick,value,onChange}:SendProps) {
    console.log("childdd rendringggg====+++++++")
    const { selectedIssues } = useSelector((state: any) => state.AdminReducer);
    const dispatch = useDispatch()

    // const textMessage = useInput('')

    // const sendMessageHandler = () => {
    //     const params = {
    //         id: selectedIssues.id,
    //         message: textMessage.value
    //     }
    //     console.log(params.id, 'paaaddaada2222222222222222');
    //     textMessage.set('')
    //     dispatch(addTicketEvent(params))
    // }

    return (
        <div className='row fixed-bottom '>
            <div className='col-lg-3'></div>
            <div className='col-lg-5 col-sm-0 col-auto'>
                <Input className={'rounded-pill bg-gradient-white'} type='text' value={value} placeholder={'Type Here'} onChange={onChange} />
            </div>
            <div className={'col mb-4'}>
                {/* <Button text={'SEND'} variant={'icon-rounded'} size={'lg'} /> */}
                <div className={'icon icon-shape bg-gradient-info text-white rounded-circle shadow'} onClick={onClick}><i className="ni ni-send"></i></div>
            </div>
        </div>
    )
}

export { Send }