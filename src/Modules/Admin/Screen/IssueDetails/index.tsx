import { Card, Modal, Image, Input } from '@Components'
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
    console.log('selectedIssues----->', JSON.stringify(selectedIssues));
    const textMessage = useInput('')
    const [image, setImage] = useState('')
    const [selectAttachments, setSelectAttachments] = useState(false)
    const [selectDropzone, setSelectDropzone] = useState([{}])



    useEffect(() => {
        beginGetTicketEvents()
    }, []);

    const sendMessageHandler = () => {
        const params = {
            id: selectedIssues.id,
            message: textMessage.value,
            event_type: 'TEM',
        }

        dispatch(addTicketEvent({
            params,
            onSuccess: () => {
                beginGetTicketEvents()
                textMessage.set('')
            },
            onFailure: () => { }
        }))
    }

    function beginGetTicketEvents() {
        if (selectedIssues) {
            const params = {
                ticket_id: selectedIssues.id,
            };
            console.log('setp22222222---->')
            dispatch(
                getTicketsEvents({
                    params,
                    onSuccess: () => { },
                    onFailure: () => { }
                })
            )
        }
    }

    const handleImagePicker = (index: number, file: any) => {
        console.log('index', index, 'file', file, 'selectDropzone', selectDropzone)
        let updatePhoto = [...selectDropzone]
        const isExist = selectDropzone.some((selectDropzoneCategory: any) => selectDropzoneCategory.id === index)
        if (isExist) {
            updatePhoto = [index] = { ...updatePhoto[index], ...file }
        }
        else {
            updatePhoto = [...selectDropzone, { ...file, id: index }]
        }
        setSelectDropzone(updatePhoto)
    }

    return (
        <div className='vh-100 d-flex justify-content-center'>
            <Card className='vh-100 col-lg-6 col-sm-12'>
                <Chat item={selectedIssues.id} />

                <div className='fixed-bottom col-lg-6 col-sm-12 '>
                    <Send value={textMessage.value}
                        onClick={sendMessageHandler}
                        onChange={textMessage.onChange}
                    />
                </div>

                <div className=' d-flex justify-content-center fixed-bottom col-6 pl-6 pb-4 '>
                    <Image variant='rounded' size='md' src={icons.addFillSquare} onClick={() => { setSelectAttachments(!selectAttachments) }} />
                </div>



                {/* <div className=' d-flex justify-content-center fixed-bottom col-6 pl-6 pb--5 '>
                    <Dropzone variant='ICON'
                        icon={image}
                        size='sm'
                        onSelect={(image) => {
                            let encoded = image.toString().replace(/^data:(.*,)?/, '');
                            setImage(encoded)
                        }
                        } />
                </div> */}


            </Card>
            <div>
                <Modal isOpen={selectAttachments}
                    onClose={() => {
                        setSelectAttachments(!selectAttachments)
                    }}>
                    <Input className='rounded-pill' heading={'Name'} />
                    {selectDropzone && selectDropzone.map((el, index) => {
                        return (
                            <Dropzone variant='ICON'
                                icon={image}
                                size='xl'
                                onSelect={(image) => {
                                    let file = image.toString().replace(/^data:(.*,)?/, '');
                                    // setImage(file)
                                    handleImagePicker(index, file)
                                }
                                } />
                        )
                    })}

                </Modal>

            </div>

        </div>
    )
}

export { IssueDetails } 