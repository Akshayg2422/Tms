 import React, { useState } from 'react'
import { Button, Modal, Input, Dropzone, ImagePicker, showToast } from '@Components'
import { icons } from '@Assets'
import { addAttachmentsMessage, refreshEventMessage } from '@Redux'
import { useSelector, useDispatch } from 'react-redux'
import { useModal, useInput } from '@Hooks'
import { TEM, MEA, validate, ifObjectExist, getValidateError, EVENTS_ATTACHMENT_RULES } from '@Utils'
import { translate } from '@I18n'
import { useParams } from 'react-router-dom'


function AddEventChat() {

    const { eventsMessage } = useSelector((state: any) => state.TaskReducer);
    const dispatch = useDispatch()
    const { id } = useParams();
    const message = useInput('')
    const attachmentModal = useModal(false)
    const attachmentName = useInput('')
    const [selectDropzone, setSelectDropzone] = useState<any>([{}])
    const [image, setImage] = useState('')
    const [photo, setPhoto] = useState<any>([])

    console.log('eventsMessage==========>>>', eventsMessage)

    const proceedAddEventsApiHandler = () => {

        if (message.value.trim()) {

            const params = {
                event_id: eventsMessage,
                message: message.value,
                event_type: TEM
            }
            console.log('eventsMessage========', eventsMessage)
            dispatch(
                addAttachmentsMessage({
                    params,
                    onSuccess: (response) => () => {
                        console.log('response======', response)
                        message.set('')
                        dispatch(refreshEventMessage())
                    },
                    onError: () => () => { },
                })
            );
        } else {

        }
    };

    const addEventsAttachments = () => {
        const validation = validate(EVENTS_ATTACHMENT_RULES, {
            name: attachmentName.value,
            attachments: photo.length > 0 ? [{ attachment: photo }] : ''
        })
        const params = {
            event_type: MEA,
            event_id: eventsMessage,
            event_attachments: [{ name: attachmentName.value, attachments: photo }],

        };
        if (ifObjectExist(validation)) {
            dispatch(
                addAttachmentsMessage({
                    params,
                    onSuccess: () => () => {
                        resetValues();
                        attachmentModal.hide()
                        dispatch(refreshEventMessage())
                    },
                    onError: (error) => () => { },
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

            if (message.value.trim().length > 0) {
                proceedAddEventsApiHandler();
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
                    <Button size={'lg'} color={'white'} variant={'icon-rounded'} icon={icons.send} onClick={proceedAddEventsApiHandler} />
                </div >
               
            </div >

            <Modal isOpen={attachmentModal.visible} onClose={attachmentModal.hide} size='md'>

                <div className='col-10 mt--5'>
                    <div className={'mt-3'}><Input heading={'Note'} value={attachmentName.value} onChange={attachmentName.onChange} /></div>
                    <div className='row mt--3'>
                        <ImagePicker
                            noOfFileImagePickers={3}
                            icon={image}
                            size='xl'
                            onSelect={(image) => {
                                // let file = image.toString().replace(/^data:(.*,)?/, "")
                                // handleImagePicker(file)
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
                </div>

                <div className='col-6 pt-3'>
                    <Button text={translate("common.submit")}
                        onClick={addEventsAttachments} />
                </div>

            </Modal>

        </>
    )
}
export { AddEventChat }