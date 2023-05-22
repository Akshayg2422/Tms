import React, { useState } from 'react'
import { AddMessageProps } from './interfaces';
import { Button, Modal, Input, Dropzone } from '@Components'
import { icons } from '@Assets'
import { addGroupMessage, refreshGroupEvents } from '@Redux'
import { useDispatch } from 'react-redux'
import { useModal, useInput } from '@Hooks'
import { TEM, MEA } from '@Utils'
import { translate } from '@I18n'

function AddMessage({ AddGroup }: AddMessageProps) {
    const dispatch = useDispatch()
    const message = useInput('')
    const attachmentModal = useModal(false)
    const attachmentName = useInput('')
    const [selectDropzone, setSelectDropzone] = useState<any>([{}])
    const [image, setImage] = useState('')
    const [photo, setPhoto] = useState<any>([])

    const addGroupMessageApiHandler = () => {

        if (message.value) {
            const params = {
                group_id: AddGroup,
                message: message.value,
                event_type: TEM,
            }

            console.log('======>>>params', JSON.stringify(params));

            dispatch(
                addGroupMessage({
                    params,
                    onSuccess: (response) => () => {
                        message.set('')
                        dispatch(refreshGroupEvents())
                        // console.log('.........',response)
                    },
                    onError: () => () => { },
                })
            );
        } else {

        }
    };

    const addGroupEventAttachment = () => {
        const params = {
            event_type: MEA,
            group_id: AddGroup,
            group_attachments: [{ name: attachmentName.value, attachments: photo }],
            // name: attachmentName.value,
        };
        console.log('============>>',JSON.stringify(params))
        dispatch(
            addGroupMessage({
                params,
                onSuccess: (response) => () => {
                    resetValues();
                    attachmentModal.hide()
                    dispatch(refreshGroupEvents())
                      console.log('============>>>',response)
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

                    <Button color={'white'} size={'lg'} variant={'icon-rounded'} icon={icons.upload} onClick={attachmentModal.show} />
                    <div className='col'>
                        <textarea placeholder="Write your comment" value={message.value} className="form-control form-control-sm" onChange={message.onChange}></textarea>
                    </div>
                    <Button size={'lg'} color={'white'} variant={'icon-rounded'} icon={icons.send} onClick={addGroupMessageApiHandler} />
                </div >
            </div >
            <Modal isOpen={attachmentModal.visible}
                onClose={attachmentModal.hide}>
                <div className='col-6'>
                    <Input heading={'Name'} value={attachmentName.value} onChange={attachmentName.onChange} />
                    <div className='col'>
                        <div className='row'>
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
                        </div>
                    </div>
                    <div className=' pt-4'>
                        <Button text={translate("common.submit")} onClick={addGroupEventAttachment} />
                    </div>
                </div>

            </Modal>
        </>
    )
}
export { AddMessage }