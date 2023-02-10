import { Card, Modal, Image, Input, Button } from '@Components'
import { Chat, Send } from '@Modules'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { addTicketEvent, getTicketsEvents } from '@Redux';
import { useInput, useModal } from '@Hooks';
import { Dropzone } from '@Components';
import { icons } from '@Assets';



function IssueDetails() {

    const dispatch = useDispatch();
    const { selectedIssues } = useSelector((state: any) => state.AdminReducer);
    const textMessage = useInput('')
    const modalName = useInput('')
    const photo = useInput([]);
    const [image, setImage] = useState('')
    const [selectAttachments, setSelectAttachments] = useState(false)
    const [selectDropzone, setSelectDropzone] = useState([{}])
    console.log('selectDropzone------------>', selectDropzone)
    useEffect(() => {
        beginGetTicketEvents()
    }, []);

    function beginGetTicketEvents() {

        if (selectedIssues) {
            const params = {
                ticket_id: selectedIssues.id,
            };

            dispatch(
                getTicketsEvents({
                    params,
                    onSuccess: () => { },
                    onError: () => { }
                })
            )
        }
    }

    const sendMessageHandler = () => {
        if (textMessage) {
            const params = {
                id: selectedIssues.id,
                message: textMessage.value,
            }
            dispatch(addTicketEvent({
                params,
                onSuccess: () => {
                    console.log('addTicketEvent', addTicketEvent)
                    beginGetTicketEvents()
                    textMessage.set('')
                },
                onFailure: () => { }
            }))
        }
    }

    const onModalSubmitHandler = () => {
        const params = {
            event_type: 'MEA',
            id: selectedIssues.id,
            message: textMessage,
            attachments: [{}],
            modalName,
        };
        setSelectAttachments(!selectAttachments);
        resetValues();
    };

    const resetValues = () => {
        modalName.set('');
        photo.set('');
    };

    const handleImagePicker = (index: number, file: any) => {
        console.log('index', index, 'file', file, 'selectDropzone', selectDropzone)
        let updatedPhoto = [...selectDropzone]
        const isExist = selectDropzone.some((selectDropzoneCategory: any) => selectDropzoneCategory.id === index)
        if (isExist) {
            updatedPhoto = [index] = { ...updatedPhoto[index], ...file }
        }
        else {
            updatedPhoto = [...selectDropzone, { ...file, id: index }]
        }
        setSelectDropzone(updatedPhoto)
    }

    return (
        <div className='vh-100 d-flex justify-content-center'>
            <Card className='vh-100 col-lg-6 col-sm-12'>
                {/* <Chat item={selectedIssues.id} /> */}

                <div className='fixed-bottom col-lg-6 col-sm-12 '>
                    <Send value={textMessage.value}
                        onClick={sendMessageHandler}
                        onChange={textMessage.onChange}
                    />
                </div>
                <Image variant='rounded' size='sm' src={icons.addFillGray} onClick={() => { setSelectAttachments(!selectAttachments) }} />
            </Card>

            <div>
                <Modal isOpen={selectAttachments}
                    onClose={() => {
                        setSelectAttachments(!selectAttachments)
                    }}>
                    <Input className='rounded-pill' heading={'Name'} value={modalName.value} onChange={() => setSelectAttachments(true)} />
                    {/* onChange={modalName.onChange} */}
                    {selectDropzone && selectDropzone.map((el, index) => {
                        return (
                            <Dropzone variant='ICON'
                                icon={image}
                                size='xl'
                                onSelect={(image) => {
                                    let file = image.toString().replace(/^data:(.*,)?/, '');
                                    // setImage(file)
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

        </div>
    )
}

export { IssueDetails } 