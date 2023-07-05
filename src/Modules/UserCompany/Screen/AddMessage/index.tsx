import React, { useState } from 'react'
import { AddMessageProps } from './interfaces';
import { Button, Modal, Input, Dropzone, ImageDownloadButton, ImagePicker, showToast } from '@Components'
import { icons } from '@Assets'
import { addGroupMessage, getTokenByUser, refreshGroupEvents, selectedVcDetails } from '@Redux'
import { useDispatch, useSelector } from 'react-redux'
import { useModal, useInput, useNavigation, useLoader } from '@Hooks'
import { TEM, MEA, validate, ifObjectExist, getValidateError, GROUP_ATTACHMENT_RULES } from '@Utils'
import { translate } from '@I18n'
import { ROUTES } from '@Routes';
import { useParams } from 'react-router-dom';

function AddMessage({ AddGroup }: AddMessageProps) {
    const { selectedGroupChatCode, dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
    const { user_details } = dashboardDetails || ''
    const dispatch = useDispatch()
    const message = useInput('')
    const { id } = useParams();
    const attachmentModal = useModal(false)
    const attachmentName = useInput('')
    const [selectDropzone, setSelectDropzone] = useState<any>([{}])
    const [image, setImage] = useState('')
    const [photo, setPhoto] = useState<any>([])
    const { goTo } = useNavigation()
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const SEND_DELAY = 1000;
    const loginLoader=useLoader(false)
    const addGroupMessageApiHandler = () => {

        if (message.value.trim()) {
            const params = {
                group_id: AddGroup,
                message: message.value,
                event_type: TEM,
            }

            dispatch(
                addGroupMessage({
                    params,
                    onSuccess: (response) => () => {
                        message.set('')
                        dispatch(refreshGroupEvents())

                    },
                    onError: () => () => { },
                })
            );
        } else {

        }
    };

    const getUserToken = () => {
        dispatch(selectedVcDetails(selectedGroupChatCode))
        const params = {
            room_id: selectedGroupChatCode,
            user_name: user_details.name,
            email_id: user_details.email,
        }
        dispatch(getTokenByUser({
            params,
            onSuccess: (success: any) => () => {

                console.log("success============>", success)
            },
            onError: (error: string) => () => {

            },

        }))
    }


    const addGroupEventAttachment = () => {
        const validation = validate(GROUP_ATTACHMENT_RULES, {
            attachment_name: attachmentName.value.trim(),
            group_attachments: photo.length > 0 ? [{ name: attachmentName.value, attachments: photo }] : ''
        })


        const params = {
            event_type: MEA,
            group_id: AddGroup,
            group_attachments: [{ name: attachmentName.value, attachments: photo }],
        };

        if (ifObjectExist(validation)) {
            loginLoader.show()
            dispatch(
                addGroupMessage({
                    params,
                    onSuccess: (response) => () => {
                        resetValues();
                        attachmentModal.hide()
                        dispatch(refreshGroupEvents())
                        loginLoader.hide()
                    },
                    onError: (error) => () => {
                        loginLoader.hide()

                    },
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
                addGroupMessageApiHandler();

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
                        <textarea placeholder={translate("order.Write your comment")!} value={message.value} className="form-control form-control-sm" onKeyDown={handleKeyDown} onChange={message.onChange}></textarea>
                    </div>
                    <Button size={'lg'} color={'white'} variant={'icon-rounded'} icon={icons.send} onClick={addGroupMessageApiHandler} />
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
            <Modal isOpen={attachmentModal.visible}
                onClose={attachmentModal.hide}>
                <div className='col-7 mt--6'>
                    <div className={'mt-2'}><Input heading={'Note'} value={attachmentName.value} onChange={attachmentName.onChange} /></div>
                    <div className='row mt--4'>
                        <ImagePicker
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

                <div className='col-6 pt-2'>
                    <div className=''>
                        <Button text={translate("common.submit")} onClick={addGroupEventAttachment} 
                        loading={ loginLoader.loader}/>
                    </div>
                </div>

            </Modal>
        </>
    )
}
export { AddMessage }