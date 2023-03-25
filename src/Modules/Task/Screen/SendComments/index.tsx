import React, { useEffect, useState } from 'react'
import { Input, Image, Modal, Dropzone, Button } from '@Components'
import { SendProps } from './interfaces'
import { icons } from '@Assets'
import { useInput } from '@Hooks'
import { MEA } from '@Utils'
import { useDispatch, useSelector } from 'react-redux'
import { addTicketEvent, getTicketsEvents } from '@Redux'

function SendComments({ onClick, value, onChange }: SendProps) {

    const dispatch = useDispatch()
    const { taskItem } = useSelector((state: any) => state.AdminReducer);
    const [selectAttachments, setSelectAttachments] = useState(false)
    const modalName = useInput('')
    const [selectDropzone, setSelectDropzone] = useState<any>([{}])
    const [photo, setPhoto] = useState<any>([]) 
    const [image, setImage] = useState('')

    useEffect(() => {
        ProceedGetTaskEvents()
    }, []);

    function ProceedGetTaskEvents() {

        if (taskItem) { 
            const params = {
                task_id: taskItem.id,
            };
            console.log('sendComments',params);
            dispatch(
                getTicketsEvents({
                    params,
                    onSuccess: (response) => () => {
                    },
                    onError: (error) => () => {
                    }
                })
            )
        }
    }

    const onModalSubmitHandler = () => {
        const params = {
            event_type: MEA,
            id: taskItem.id,
            attachments: [{ attachment: photo }],
            name: modalName.value
        };
        dispatch(
            addTicketEvent({
                params,
                onSuccess: () => () => {
                    ProceedGetTaskEvents();
                },
                onError: () => () => { },
            }),
        );
        setSelectAttachments(!selectAttachments);
        resetValues();
    };
    const resetValues = () => {
        modalName.set('');
        setSelectDropzone([{}]);
    };

    const handleImagePicker = (index: number, file: any) => {
        let updatedPhoto = [...selectDropzone, file]
        let newUpdatedPhoto = [...photo, file]
        setSelectDropzone(updatedPhoto)
        setPhoto(newUpdatedPhoto)
    }
    return (
        <div className='row fixed-bottom'>
            <div className='col-lg-3'></div>
            <div className='pt-1 pl-4' style={{ zIndex: 6 }}>
                <Image variant='rounded' size='sm' src={icons.addFillSquare} onClick={() => { setSelectAttachments(!selectAttachments) }} />
            </div>
            <div>
                <Modal isOpen={selectAttachments}
                    onClose={() => {
                        setSelectAttachments(!selectAttachments)
                    }}>
                    <Input className='rounded-pill' heading={'Name'} value={modalName.value} onChange={modalName.onChange} />
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
                    <div className='d-flex flex-row pt-4'>
                        <Button text={'Submit'} className={'rounded-pill px-5'} onClick={() => onModalSubmitHandler()} />
                    </div>
                </Modal>
            </div>
            <div className='col-lg-7 col-sm-0 col-auto'>
                <Input className={'rounded-pill'} type='text' value={value} placeholder={'Type Here'} onChange={onChange} />
            </div>
            <div className={'col mb-4'}>
                <div className={'icon icon-shape text-white bg-info rounded-circle shadow'} onClick={onClick}><i className="ni ni-send"></i></div>
            </div>
        </div>
    )
}

export { SendComments }