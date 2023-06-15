import React, { useState } from 'react'
import { Button, Modal, Input, Dropzone, ImagePicker, showToast } from '@Components'
import { icons } from '@Assets'
import { addTaskEvent, refreshTaskEvents, } from '@Redux'
import { useSelector, useDispatch } from 'react-redux'
import { useModal, useInput } from '@Hooks'
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

    const proceedTaskEventsApiHandler = () => {

        if (message.value) {

            const params = {
                code:id,
                message: message.value,
                event_type: TEM
            }

            console.log(JSON.stringify(params) + '====>>>params');

            dispatch(
                addTaskEvent({
                    params,
                    onSuccess: (response) => () => {
                        message.set('')
                        dispatch(refreshTaskEvents())
                    },
                    onError: () => () => { },
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
            id: selectedTask.id,
            name: attachmentName.value,
            attachments: [{ attachment: photo }]
        };
        if (ifObjectExist(validation)) {
            dispatch(
                addTaskEvent({
                    params,
                    onSuccess: () => () => {
                        resetValues();
                        attachmentModal.hide()
                        dispatch(refreshTaskEvents())
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

    const handleImagePicker = (file: any) => {
        let updatedPhoto = [...selectDropzone, file]
        let newUpdatedPhoto = [...photo, file]
        setSelectDropzone(updatedPhoto)
        setPhoto(newUpdatedPhoto)
    }
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            if (message.value.trim().length > 0) {
                proceedTaskEventsApiHandler();
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
            <Modal isOpen={attachmentModal.visible} onClose={attachmentModal.hide}>

                <div className='col-7 mt--6'>
                    <div className={'mt-2'}><Input heading={'Note'} value={attachmentName.value} onChange={attachmentName.onChange} /></div>
                    <div className='row mt--4'>
                        <ImagePicker
                            noOfFileImagePickers={0}
                            icon={image}
                            size='xl'
                            onSelect={(image) => {
                                let file = image.toString().replace(/^data:(.*,)?/, "")
                                handleImagePicker(file)
                            }}
                        />
                    </div>
                </div>

                <div className='col-6 pt-2'>
                    <Button text={translate("common.submit")}
                        onClick={addTaskEventAttachment} />
                </div>

            </Modal>

        </>
    )
}
export { AddChat }