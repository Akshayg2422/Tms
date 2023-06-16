import React, { useState } from 'react'
import { Button, Modal, Input, Dropzone, ImagePicker } from '@Components'
import { icons } from '@Assets'
import {  refreshTaskEvents, refreshTicketEvents, addTicketEvent, } from '@Redux'
import { useSelector, useDispatch } from 'react-redux'
import {  useModal, useInput } from '@Hooks'
import { TEM, MEA } from '@Utils'
import { translate } from '@I18n'

function AddChatTicket() {

    const { selectedTicket } = useSelector((state: any) => state.TicketReducer);
    const dispatch = useDispatch()
    const message = useInput('')
    const attachmentModal = useModal(false)
    const attachmentName = useInput('')
    const [selectDropzone, setSelectDropzone] = useState<any>([{}])
    const [image, setImage] = useState('')
    const [photo, setPhoto] = useState<any>([])

    const proceedTaskEventsApiHandler = () => {

        if (message.value) {

            const params = {
                id: selectedTicket?.id,
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
            id: selectedTicket.id,
            attachments: [{ attachment: photo }],
            name: attachmentName.value
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
        setSelectDropzone([{}]);
        setPhoto([])
    };

    // const handleImagePicker = (index: number, file: any) => {
    //     let updatedPhoto = [...selectDropzone, file]
    //     let newUpdatedPhoto = [...photo, file]
    //     setSelectDropzone(updatedPhoto)
    //     setPhoto(newUpdatedPhoto)
    // }

    return (
        <>
            <div className='col'>
                <div className='row justify-content-center align-items-center'>

                    <Button color={'white'} size={'lg'} variant={'icon-rounded'} icon={icons.upload} onClick={attachmentModal.show} />
                    <div className='col'>
                        <textarea placeholder={translate("order.Write your comment")!} value={message.value} className="form-control form-control-sm" onChange={message.onChange}></textarea>
                    </div>
                    <Button size={'lg'} color={'white'} variant={'icon-rounded'} icon={icons.send} onClick={proceedTaskEventsApiHandler} />
                </div >
            </div >
            <Modal isOpen={attachmentModal.visible}
                onClose={attachmentModal.hide}>
                <div className='col-6'>
                    <Input heading={'Name'} value={attachmentName.value} onChange={attachmentName.onChange} />
                    <div >
                        {/* <div className='row'>
                            {selectDropzone && selectDropzone.map((el, index) => {

                                return (
                                    <div className={`${index !== 0 && 'ml-2'}`}>
                                        <Dropzone variant='ICON'

                                            icon={image}
                                            size='xl'
                                            onSelect={(image) => {
                                                let file = image.toString().replace(/^data:(.*,)?/, '');
                                                handleImagePicker(index, file)
                                            }}
                                        />
                                    </div>
                                )
                            })}
                        </div> */}
                          <div className='row mt--4'>
                        <ImagePicker
                            noOfFileImagePickers={3}
                            icon={image}
                            size='xl'
                            onSelect={(image) => {
                                // let file = image.toString().replace(/^data:(.*,)?/, "")
                                // handleImagePicker(file)
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
                    <div className=' pt-4'>
                        <Button text={translate("common.submit")}  onClick={addTicketEventAttachment} />
                    </div>
                </div>

            </Modal>
        </>
    )
}
export { AddChatTicket }