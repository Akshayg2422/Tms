import { useEffect, useState } from "react";
import {
    Modal,
    Button,
    MenuBar,
    Input,
    DropDown,
    TextAreaInput,
    AttachmentMenu,
    ImagePicker,
    FileUploader,
    VideoUploader,
} from "@Components";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    addTaskEvent,
    refreshTaskEvent
} from "@Redux";
import { Employees, EmployeesV1 } from '@Modules'
import { useDropDown, useInput, useLoader, useModal, useNavigation } from "@Hooks";
import { icons } from "@Assets";
import { TGU, RGU, getArrayFromArrayOfObject, EVS, TASK_STATUS_LIST, getObjectFromArrayByKey } from '@Utils';
import { translate } from '@I18n'
import { useDynamicHeight } from "@Hooks";
import { useParams } from "react-router-dom";
import { FileMenuProps } from "./interfaces";


function FileMenu({ onAttachPress, isSuccess, onMessagePress }: FileMenuProps) {

    const FILE_MENU = [
        {
            id: 0,name: translate('auth.PhotosUploader'), icon: icons.ImageIcon,
        },
        {
            id: 1,name: translate('auth.DocumentsUploader'), icon:icons.Files,
        },
        {
            id: 2,name: translate('auth.VideoUploader'), icon:icons.videoCall
        },

    ]

    const message = useInput('')
    const attachmentModal = useModal(false)
    const docsModal = useModal(false)
    const videosModal = useModal(false)
    const attachmentName = useInput('')
    const [photos, setPhotos] = useState<any>([])
    const [isSelect, setIsSelect] = useState(true)



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

                if (isSelect) {

                    setIsSelect(false)
                    onMessagePress(param);
                }
            }
        }
    };
   


    return (
        <>
            <div>

                <AttachmentMenu menuData={FILE_MENU} onClick={(element) => {
                    if (element.id === FILE_MENU[0].id) {
                        attachmentModal.show()
                    } else if (element.id === FILE_MENU[1].id) {
                       docsModal.show()
                    }
                    else if (element.id === FILE_MENU[2].id) {
                       videosModal.show()
                     }
                    
                }} />
            </div>


            <div className="d-flex justify-content-center">

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
                                    if (isSelect) {


                                        setIsSelect(false)
                                        onAttachPress(param);

                                    }

                                }
                            }}
                            // loading={loading} 
                            />
                    </div>
                </div> 

                
                    
            </Modal >
                

            </div>

            {/* <div className="d-flex justify-content-center">

                <Modal isOpen={docsModal.visible}
                    onClose={docsModal.hide}>

                    <div className='col-7 mt--5'>
                        <Input variant={'text-area'} heading={'Note'} value={imageName.value} onChange={imageName.onChange} />
                        <div className='row mt--3'>
                            <FileUploader/>
                        </div>
                    </div>

                    <div className='col-6 mt-3'>
                        <div className=''>
                            <Button
                                text={translate("common.submit")}

                            />
                        </div>
                    </div>

                </Modal >
            </div> */}

            {/* <div className="d-flex justify-content-center">

                <Modal isOpen={videosModal.visible}
                    onClose={videosModal.hide}>

                    <div className='col-7 mt--5'>
                        <Input variant={'text-area'} heading={'Note'} value={imageName.value} onChange={imageName.onChange} />
                        <div className='row mt--3'>
                           <VideoUploader/>
                        </div>
                    </div>

                    <div className='col-6 mt-3'>
                        <div className=''>
                            <Button
                                text={translate("common.submit")}

                            />
                        </div>
                    </div>

                </Modal >
                

            </div> */}

        </>
    )
}

export { FileMenu }