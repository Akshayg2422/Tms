import React, { useState, useEffect } from 'react';
import { icons } from '@Assets';
import { AttachmentMenu, Button, FileUploader, ImagePicker, Input, Modal, VideoUploader } from '@Components';
import { useInput, useModal, useNavigation } from '@Hooks';
import { translate } from '@I18n';
import { SendProps } from './interfaces';
import { ROUTES } from '@Routes';
import { useSelector, useDispatch } from 'react-redux';
import { getTokenByUser, selectedVcDetails } from '@Redux';
import { FileMenu, TaskItemMenu } from '@Modules';
import { FileViewer } from '@Components//Component/FileViewer';


function Send({ isSuccess, loading, onMessagePress, onAttachPress, hasVideo = true, onVideoPress }: SendProps) {


    const FILE_MENU = [
        {
            id: 0, name: translate('auth.PhotosUploader'), icon: icons.ImageIcon,
        },
        {
            id: 1, name: translate('auth.DocumentsUploader'), icon: icons.Files,
        },
        {
            id: 2, name: translate('auth.VideoUploader'), icon: icons.videoCall
        },

    ]



    const message = useInput('')
    const imageModal = useModal(false)
    const docsModal = useModal(false)
    const videosModal = useModal(false)
    const imageName = useInput('')
    const videoName = useInput('')
    const docsName = useInput('')
    const [photos, setPhotos] = useState<any>([])
    const [pdfFiles, setPtfFiles] = useState<any>([])
    const [videoFiles,setVideoFiles]=useState<any>([])
    const [isSelect, setIsSelect] = useState(true)
    
    // console.log(pdfFiles, "pdfFiles===>")



    useEffect(() => {
        if (isSuccess) {
            resetValues();
            setIsSelect(isSuccess)

        }
    }, [isSuccess]);

    const resetValues = () => {
        imageName.set('');
        videoName.set('');
        setPhotos([])
        setPtfFiles([]);
        setVideoFiles([]);
        message.set('');
        imageModal.hide();

    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const param = {
                message: message.value.trim(),
                event_type: 'TEM'
            };
            if (onMessagePress && message.value.trim()) {

                if (isSelect) {

                    setIsSelect(false)
                    onMessagePress(param);
                }
            }
        }
    };

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const target = e.currentTarget;
        target.style.height = 'auto';
        target.style.height = `${target.scrollHeight}px`;
    };

    return (
        <>
            <div className='col'>



                <div className='row justify-content-center align-items-center'>
                    <div className='mt--3 '>
                        <AttachmentMenu menuData={FILE_MENU} onClick={(element) => {
                            if (element.id === FILE_MENU[0].id) {
                                imageModal.show()
                            } else if (element.id === FILE_MENU[1].id) {
                                docsModal.show()
                            }
                            else if (element.id === FILE_MENU[2].id) {
                                videosModal.show()
                            }

                        }} />
                    </div>
                    <div className='col'>
                        <textarea
                            placeholder={translate("order.Write your comment")!}
                            value={message.value}
                            className="form-control form-control-sm"
                            onKeyDown={handleKeyDown}
                            onChange={message.onChange}
                            onInput={handleInput}
                            style={{
                                resize: 'vertical', minHeight: '50px', maxHeight: '100px', position: 'absolute', bottom: -20,
                                width: '95%',
                            }}
                        >
                        </textarea>
                    </div>
                    {message.value?.trim().length > 0 && <Button size={'lg'} color={'white'} variant={'icon-rounded'} icon={icons.send} onClick={() => {
                        const param = { message: message.value.trim(), event_type: 'TEM' };
                        if (onMessagePress && message.value.trim()) {

                            if (isSelect) {
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


            <div className="d-flex justify-content-center">

                <Modal isOpen={imageModal.visible}
                    onClose={imageModal.hide}>

                    <div className='col-7 mt--5'>
                        <Input variant={'text-area'} heading={'Note'} value={imageName.value} onChange={imageName.onChange} />
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
                                            name: imageName.value,
                                            attachments: photos
                                        },
                                        type: { event_type: 'MEA' }
                                    };
                                    if (onAttachPress) {
                                        if (isSelect) {


                                            setIsSelect(false)
                                            onAttachPress(param);

                                        }

                                    }
                                }}

                            />
                        </div>
                    </div>

                </Modal >
            </div>


            <Modal isOpen={docsModal.visible}
                onClose={docsModal.hide}>

                <div className='col-7 mt--5'>
                    <Input variant={'text-area'} heading={'Note'} value={docsName.value} onChange={docsName.onChange} />
                    <div className='row mt--3'>
                       <FileUploader
                            onSelect={(file: any) => {
                                console.log("file============>>>",file )
                                let eventPickers = file?.toString().replace(/^data:(.*,)?/, "")

                                console.log(eventPickers, "eventPickers")
                                setPtfFiles(eventPickers)
                            }}

                            
                        /> 
                         

                    </div>
                </div>

                <div className='col-6 mt-3'>
                    <div className=''>
                        <Button
                            text={translate("common.submit")}
                            // onClick={openFileInNewTab}
                            onClick={() => {
                                const params = {
                                    attachments: {
                                        name: docsName.value,
                                        attachments: [pdfFiles]
                                    },
                                    type: { event_type: 'PDF' },

                                }

                                if (onAttachPress) {
                                    if (isSelect) {


                                        setIsSelect(false)
                                        onAttachPress(params);

                                    }

                                }
                            }}

                        />
                    </div>
                </div>

            </Modal >


          

                <Modal isOpen={videosModal.visible}
                    onClose={videosModal.hide}>

                    <div className='col-7 mt--5'>
                        <Input variant={'text-area'} heading={'Note'} value={videoName.value} onChange={videoName.onChange} />
                        <div className='row mt--3'>
                           <VideoUploader 
                               onSelect={(file: any) => {
                                console.log("file============>>>",file )
                                let eventPickers = file?.toString().replace(/^data:(.*,)?/, "")

                                console.log(eventPickers, "eventPickers")
                                setVideoFiles(eventPickers)
                            }}
                           />
                        </div>
                    </div>

                    <div className='col-6 mt-3'>
                        <div className=''>
                            <Button
                                text={translate("common.submit")}
                                onClick={() => {
                                    const params = {
                                        attachments: {
                                            name: videoName.value,
                                            attachments: [videoFiles]
                                        },
                                        type: { event_type: 'MP4' },
    
                                    }
                             
                                           if (onAttachPress) {
                                               if (isSelect) {
           
           
                                                   setIsSelect(false)
                                                   onAttachPress(params);
                                                   
           
                                               }
           
                                           }
                                       }}

                            />
                        </div>
                    </div>

                </Modal >
                                       

        </>
    )
}
export { Send };
