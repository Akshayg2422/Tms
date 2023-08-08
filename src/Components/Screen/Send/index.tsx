import React, { useState, useEffect } from 'react';
import { icons } from '@Assets';
import { Button, ImagePicker, Input, Modal } from '@Components';
import { useInput, useModal, useNavigation } from '@Hooks';
import { translate } from '@I18n';
import { SendProps } from './interfaces';
import { ROUTES } from '@Routes';
import { useSelector, useDispatch } from 'react-redux';
import { getTokenByUser, selectedVcDetails } from '@Redux';


function Send({ isSuccess, loading, onMessagePress, onAttachPress, hasVideo = true, onVideoPress}: SendProps) {

 

    const message = useInput('')
    const attachmentModal = useModal(false)
    const attachmentName = useInput('')
    const [photos, setPhotos] = useState<any>([])
    const [isSelect,setIsSelect]=useState(true)
    


    useEffect(() => {
        if (isSuccess) {
            resetValues();
            setIsSelect(isSuccess)
    
        }
    }, [isSuccess]);

    const resetValues = () => {
        attachmentName.set('');
        setPhotos([])
        message.set('');
        attachmentModal.hide();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const param = { message: message.value.trim(), event_type: 'TEM' };
            if (onMessagePress && message.value.trim()) {

                if(isSelect){
                   
                    setIsSelect(false)
                onMessagePress(param);
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
                        <textarea
                            placeholder={translate("order.Write your comment")!}
                            value={message.value}
                            className="form-control form-control-sm"
                            onKeyDown={handleKeyDown}
                            onChange={message.onChange}
                            onInput={handleInput}
                            style={{ resize:'vertical', minHeight: '50px',  maxHeight:'100px',position:'absolute', bottom:-20,
                          width: '95%',}}
                        >
                        </textarea>
                    </div>
                    {message.value?.trim().length > 0 && <Button size={'lg'} color={'white'} variant={'icon-rounded'} icon={icons.send} onClick={() => {
                        const param = { message: message.value.trim(), event_type: 'TEM' };
                        if (onMessagePress && message.value.trim()) {
                       
                         if(isSelect){
                            setIsSelect(false)
                            onMessagePress(param);
                           
                         } 
                            
                        }

                    }} />
                    }
                    {hasVideo && <Button
                        size={'lg'}
                        color={'white'}
                        variant={'icon-rounded'}
                        icon={icons.videoCall}
                        onClick={onVideoPress}
                    />
                    }

                </div >
            </div >

            {
                /**
                 * Attachment Modal
                 */
            }


            <Modal isOpen={attachmentModal.visible}
                onClose={attachmentModal.hide}>
                <div className='col-7 mt--5'>
                    <Input variant={'text-area'} heading={'Note'} value={attachmentName.value} onChange={attachmentName.onChange} />
                    <div className='row mt--3'>
                        <ImagePicker
                            heading={'Attachments'}
                            size='xl'
                            noOfFileImagePickers={3}
                            onSelect={() => { }}
                            onSelectImagePickers={(el) => {
                                let array: any = []
                                for (let i = 0; i <= el.length; i++) {
                                    let eventPickers = el[i]?.base64?.toString().replace(/^data:(.*,)?/, "")
                                    if (eventPickers !== undefined) {
                                        array.push(eventPickers)
                                    }
                                }
                                setPhotos(array)
                            }}
                        />
                    </div>
                </div>

                <div className='col-6 mt-3'>
                    <div className=''>
                        <Button
                            text={translate("common.submit")}
                            onClick={() => {
                                const param = {
                                    attachments: {
                                        name: attachmentName.value,
                                        attachments: photos
                                    },
                                    type: { event_type: 'MEA' }
                                };
                                if (onAttachPress) {
                                    if(isSelect){
                    
                          
                                        setIsSelect(false)
                                        onAttachPress(param);
                                       
                                     } 
                                   
                                }
                            }}
                            loading={loading} />
                    </div>
                </div>

            </Modal >
        </>
    )
}
export { Send };
