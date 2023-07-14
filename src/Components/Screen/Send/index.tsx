import React, { useState, useEffect } from 'react';
import { icons } from '@Assets';
import { Button, ImagePicker, Input, Modal } from '@Components';
import { useInput, useModal,useNavigation } from '@Hooks';
import { translate } from '@I18n';
import { SendProps } from './interfaces';
import { ROUTES } from '@Routes';
import { useSelector,useDispatch } from 'react-redux';
import { getTokenByUser, selectedVcDetails } from '@Redux';


function Send({ isSuccess, loading, onMessagePress, onAttachPress }: SendProps) {
    const { selectedGroupChat,dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
    const { user_details } = dashboardDetails || ''
    const {goTo} = useNavigation()
    const dispatch = useDispatch()
    const message = useInput('')
    const attachmentModal = useModal(false)
    const attachmentName = useInput('')
    const [photos, setPhotos] = useState<any>([])
    

    useEffect(() => {
        if (isSuccess) {
            resetValues();
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
                onMessagePress(param);
            }
        }
    };
    const getUserToken = () => {
        
        dispatch(selectedVcDetails(selectedGroupChat.id))
        const params = {
            room_id: selectedGroupChat.id,
            user_name: user_details.name,
            email_id: user_details.email,
        }
        console.log(params,"ppp")
        dispatch(getTokenByUser({
            params,
            onSuccess: (success: any) => () => {

                console.log("success============>", success)
            },
            onError: (error: string) => () => {

            },

        }))
    }


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
                            style={{ resize: 'vertical', minHeight: '50px' }}
                        >
                        </textarea>
                    </div>
                    {message.value.trim()?.length > 0 && <Button size={'lg'} color={'white'} variant={'icon-rounded'} icon={icons.send} onClick={() => {
                        const param = { message: message.value.trim(), event_type: 'TEM' };
                        if (onMessagePress && message.value.trim()) {
                            onMessagePress(param);
                        }

                    }} />
                    }
                    <Button
                        size={'lg'}
                        color={'white'}
                        variant={'icon-rounded'}
                        icon={icons.videoCall}
                        onClick={() => {
                             getUserToken()
                            goTo(ROUTES['user-company-module']['video-conference'], false)
                        }}
                    />

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
                                    onAttachPress(param);
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
