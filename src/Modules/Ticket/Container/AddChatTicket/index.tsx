import React, { useState } from 'react'
import { Button, Modal, Input, Dropzone, ImagePicker } from '@Components'
import { icons } from '@Assets'
import {  refreshTicketEvents, addTicketEvent, } from '@Redux'
import {  useDispatch } from 'react-redux'
import {  useModal, useInput } from '@Hooks'
import { TEM, MEA } from '@Utils'
import { translate } from '@I18n'
import { useParams } from 'react-router-dom'

function AddChatTicket() {

    const dispatch = useDispatch()
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const {id}=useParams()
    const SEND_DELAY = 1000;
    const message = useInput('')
    const attachmentModal = useModal(false)
    const attachmentName = useInput('')
    const [image, setImage] = useState('')
    const [photo, setPhoto] = useState<any>([])

    const proceedTaskEventsApiHandler = () => {

        if (message.value.trim()) {

            const params = {
                // id: selectedTicket?.id,
                code:id,
                message: message.value,
                event_type: TEM
            }


            dispatch(
                addTicketEvent({
                    params,
                    onSuccess: (response) => () => {
                        message.set('')
                        dispatch(refreshTicketEvents())
                    },
                    onError: () => () => { },
                })
            );
        } else {

        }
    };



    const addTicketEventAttachment = () => {
        const params = {
            event_type: MEA,
            // id: selectedTicket.id,
            code:id,
            attachments: [{ attachment: photo }],
            name: attachmentName.value.trim()
        };
        dispatch(
            addTicketEvent({
                params,
                onSuccess: () => () => {
                    resetValues();
                    attachmentModal.hide()
                    dispatch(refreshTicketEvents())
                },
                onError: (error) => () => { },
            }),
        );


    };
    
    const resetValues = () => {
        attachmentName.set('');
     
        setPhoto([])
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            if (!isSendingMessage && message.value.trim().length > 0) {
                setIsSendingMessage(true);
                proceedTaskEventsApiHandler();

                setTimeout(() => {
                    setIsSendingMessage(false);
                }, SEND_DELAY);
            }
        }
    };


    return (
        <>
            <div className='col'>
                <div className='row justify-content-center align-items-center'>

                    <Button color={'white'} size={'lg'} variant={'icon-rounded'} icon={icons.upload} onClick={attachmentModal.show} />
                    <div className='col'>
                        <textarea placeholder={translate("order.Write your comment")!}onKeyDown={handleKeyDown} value={message.value} className="form-control form-control-sm" onChange={message.onChange}></textarea>
                    </div>
                    <Button size={'lg'} color={'white'} variant={'icon-rounded'} icon={icons.send} onClick={proceedTaskEventsApiHandler} />
                </div >
            </div >
            <Modal isOpen={attachmentModal.visible}
                onClose={attachmentModal.hide} size={'md'}>
                <div >
                    <Input heading={'Note'} value={attachmentName.value} onChange={attachmentName.onChange} />
                    <div >
                       
                          <div className='row mt--3 '>
                        <ImagePicker
                            noOfFileImagePickers={3}
                            icon={image}
                            size='xl'
                            onSelect={(image) => {
                              
                            }}

                            onSelectImagePickers={(el)=>{
                                let array: any = []
          
                                for (let i = 0; i <= el.length; i++) {
                                  let eventPickers = el[i]?.base64?.toString().replace(/^data:(.*,)?/, "")
                                  if(eventPickers !==undefined){
                                  array.push(eventPickers)
                                  }
                                  
                                }
                                setPhoto(array)
        
                  
                              }}
                        />
                    </div>
                    </div>
                    <div className=' pt-3'>
                        <Button text={translate("common.submit")}  onClick={addTicketEventAttachment} />
                    </div>
                </div>

            </Modal>
        </>
    )
}
export { AddChatTicket }