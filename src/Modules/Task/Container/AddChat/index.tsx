import React, { useState } from 'react'
import { Button, Modal, Input, Dropzone } from '@Components'
import { icons } from '@Assets'
import { addTaskEvent, refreshTaskEvents } from '@Redux'
import { useSelector, useDispatch } from 'react-redux'
import { useWindowDimensions, useModal, useInput } from '@Hooks'
import { TEM, MEA } from '@Utils'

function AddChat() {

    const { selectedTask } = useSelector((state: any) => state.TaskReducer);
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
                id: selectedTask?.id,
                message: message.value,
                event_type: TEM
            }

            console.log(JSON.stringify(params) + '====params');

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
        const params = {
            event_type: MEA,
            id: selectedTask.id,
            attachments: [{ attachment: photo }],
            name: attachmentName.value
        };
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


    };
    const resetValues = () => {
        attachmentName.set('');
        setSelectDropzone([{}]);
        setPhoto([])
    };

    const handleImagePicker = (index: number, file: any) => {
        let updatedPhoto = [...selectDropzone, file]
        let newUpdatedPhoto = [...photo, file]
        setSelectDropzone(updatedPhoto)
        setPhoto(newUpdatedPhoto)
    }

    return (
        <>
            <div className='col'>
                <div className='row justify-content-center align-items-center'>

                    <Button color={'white'} variant={'icon-rounded'} icon={icons.plus} onClick={attachmentModal.show} />
                    <div className='col'>
                        <textarea placeholder="Write your comment" value={message.value} className="form-control form-control-sm" onChange={message.onChange}></textarea>
                    </div>
                    <Button variant={'icon-rounded'} icon={icons.arrowRight} onClick={proceedTaskEventsApiHandler} />
                </div >
            </div >
            <Modal isOpen={attachmentModal.visible}
                onClose={attachmentModal.hide}>
                <div className='col-6'>
                    <Input heading={'Name'} value={attachmentName.value} onChange={attachmentName.onChange} />
                    {selectDropzone && selectDropzone.map((el, index) => {
                        return (
                            <Dropzone variant='ICON'
                                icon={image}
                                size='xl'
                                onSelect={(image) => {
                                    let file = image.toString().replace(/^data:(.*,)?/, '');
                                    handleImagePicker(index, file)
                                }}
                            />
                        )
                    })}
                    <div className=' pt-4'>
                        <Button text={'Submit'} onClick={addTaskEventAttachment} />
                    </div>
                </div>


            </Modal>
        </>
    )
}
export { AddChat }