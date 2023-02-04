import React from 'react'
import { Card, Button, Input, Image } from '@Components'
import { useInput } from '@Hooks'
import { useDispatch, useSelector } from 'react-redux'
import { addTicketEvent } from '@Redux';

function Send() {
    const { selectedIssues } = useSelector((state: any) => state.AdminReducer);
    const dispatch = useDispatch()

    const textMessage = useInput('')

    const sendMessageHandler = () => {
        const params = {
            id: selectedIssues.id,
            message: textMessage.value
        }
        console.log(params.id, 'paaaddaada2222222222222222');
        textMessage.set('')
        dispatch(addTicketEvent(params))
    }

    return (
        <div className='row'>
            <div className='col-sm-11'>
                <Input className={'rounded-pill bg-gradient-white'} value={textMessage.value} placeholder={'Type Here'} onChange={textMessage.onChange} />
            </div>
            <div className={'col-sm-1'}>
                {/* <Button text={'SEND'} variant={'icon-rounded'} size={'lg'} /> */}
                <div className={'icon icon-shape bg-gradient-info text-white rounded-circle shadow'} onClick={sendMessageHandler}><i className="ni ni-send"></i></div>
            </div>
        </div>
    )
}

export { Send }