import React, { useState } from 'react'
import { Button, Modal, Input, Dropzone, ImagePicker, showToast } from '@Components'
import { icons } from '@Assets'
import { addTaskEvent, refreshTaskEvent, } from '@Redux'
import { useSelector, useDispatch } from 'react-redux'
import { useModal, useInput, useLoader } from '@Hooks'
import { TEM, MEA, validate, ifObjectExist, getValidateError, TASK_ATTACHMENT_RULES } from '@Utils'
import { translate } from '@I18n'
import { useParams } from 'react-router-dom'


function AddChat() {

    const { selectedTask } = useSelector((state: any) => state.TaskReducer);
    const dispatch = useDispatch()
    const { id } = useParams();
    const message = useInput('')
    const attachmentModal = useModal(false)
    const attachmentName = useInput('')
    const [selectDropzone, setSelectDropzone] = useState<any>([{}])
    const [image, setImage] = useState('')
    const [photo, setPhoto] = useState<any>([])
    const loginLoader = useLoader(false);

    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const SEND_DELAY = 1000;

    const proceedTaskEventsApiHandler = () => {

        if (message.value.trim()) {

            const params = {
                code: id,
                message: message.value,
                event_type: TEM
            }

            
            loginLoader.show()

            dispatch(
                addTaskEvent({
                    params,
                    onSuccess: (response) => () => {
                        loginLoader.hide()
                        message.set('')
                        dispatch(refreshTaskEvent())
                    },
                    onError: () => () => {
                        loginLoader.hide()
                     },
                })
            );
        } else {

        }
    };



    const addTaskEventAttachment = () => {
        const validation = validate(TASK_ATTACHMENT_RULES, {
            name: attachmentName.value,
            attachments: photo.length > 0 ? [{ attachment: photo }] : ''
        })
        const params = {
            event_type: MEA,
            code: id,
            name: attachmentName.value,
            attachments: [{ attachment: photo }]
        };
        
        if (ifObjectExist(validation)) {
            
            loginLoader.show()
            dispatch(
                addTaskEvent({
                    params,
                    onSuccess: () => () => {
                        resetValues();
                        attachmentModal.hide()
                        
            loginLoader.hide()
                        dispatch(refreshTaskEvent()
                        )
                    },
                    onError: (error) => () => { 
                        loginLoader.hide()},
                }),
            );
        } else {
            showToast(getValidateError(validation));
        }
    };
    const resetValues = () => {
        attachmentName.set('');
        setSelectDropzone([{}]);
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
                        <textarea placeholder={translate('order.Write your comment')!} value={message.value} className="form-control form-control-sm" onKeyDown={handleKeyDown} onChange={message.onChange}></textarea>
                    </div>
                    <Button size={'lg'} color={'white'} variant={'icon-rounded'} icon={icons.send} onClick={proceedTaskEventsApiHandler} />
                </div >
            </div >
            <Modal isOpen={attachmentModal.visible} onClose={attachmentModal.hide} size='md'>

                    <div className={'mt--3'}>
                        <Input heading={'Note'} value={attachmentName.value} onChange={attachmentName.onChange}  />
                        </div>
                    <div className='row mt--2'>
                        <ImagePicker
                            noOfFileImagePickers={3}
                            icon={image}
                            size='xl'
                            onSelect={(image) => {
                              
                            }}

                            onSelectImagePickers={(el) => {
                                let array: any = []

                                for (let i = 0; i <= el.length; i++) {
                                    let eventPickers = el[i]?.base64?.toString().replace(/^data:(.*,)?/, "")
                                    if (eventPickers !== undefined) {
                                        array.push(eventPickers)
                                    }

                                }
                                setPhoto(array)


                            }}
                        />

                    </div>
              
                    <Button
                    
          loading={loginLoader.loader}
          className='mt-3'
                text={translate("common.submit")}
                        onClick={addTaskEventAttachment} />
               

            </Modal>

        </>
    )
}
export { AddChat }