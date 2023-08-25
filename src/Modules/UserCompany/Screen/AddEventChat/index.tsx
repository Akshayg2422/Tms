 import React, { useRef, useState } from 'react'
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
    const [isSelect,setIsSelect]=useState(true)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

   
    const proceedAddEventsApiHandler = () => {

        if (message.value.trim()) {

            const params = {
                event_id: eventsMessage,
                message: message.value,
                event_type: TEM
            }
         
            dispatch(
                addAttachmentsMessage({
                    params,
                    onSuccess: (response) => () => {
                
                        message.set('')
                        dispatch(refreshEventMessage())
                        setIsSelect(true)
                        if (textareaRef.current) {
                            textareaRef.current.style.height = 'auto';
                        }
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
                        setIsSelect(true)
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
                if(isSelect){
                    setIsSelect(false)
                proceedAddEventsApiHandler();
                }
            }
        }
    };
    
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const target = e.currentTarget;
        target.style.height = 'auto'; // Reset the height to fit the content
        target.style.height = `${target.scrollHeight}px`; // Adjust the height to fit the new content
      };

    return (
        <>
            <div className='col'>
                <div className='row justify-content-center align-items-center'>
                    <Button color={'white'} size={'lg'} variant={'icon-rounded'} icon={icons.upload} onClick={attachmentModal.show} />
                    <div className='col'>
                        <textarea placeholder={translate('order.Write your comment')!} 
                        value={message.value} className="form-control form-control-sm overflow-hide" 
                        onKeyDown={handleKeyDown}
                        ref={textareaRef}
                         onChange={message.onChange}
                         onInput={handleInput}
                         style={{ resize:'vertical', minHeight: '50px',  maxHeight:'100px',position:'absolute', bottom:-20,
                         width: '95%',}}
                         ></textarea>
                    </div>
                    <Button size={'lg'} color={'white'} variant={'icon-rounded'} icon={icons.send} onClick={()=>{
                        if(isSelect){
                        proceedAddEventsApiHandler()
                        setIsSelect(false)
                        }
                    }
                        } />
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
                        onClick={()=>{
                            if(isSelect){
                                setIsSelect(true)
                            addEventsAttachments()
                            }
                        }
                            } />
                </div>

            </Modal>

        </>
    )
}
export { AddEventChat }