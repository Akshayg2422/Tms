import {
    Card,
    Modal,
    Image,
    Input,
    Button
} from '@Components'
import {
    Chat,
    Send,
    TagAssignUser
} from '@Modules'
import {
    useDispatch,
    useSelector
} from 'react-redux'
import {
    useEffect,
    useState
} from 'react';
import {
    addTicketEvent,
    getTicketsEvents
} from '@Redux';
import {
    TEM,
    MEA
} from '@Utils';
import { useInput } from '@Hooks';
import { Dropzone } from '@Components';
import { icons } from '@Assets';


function Thread() {

    const dispatch = useDispatch();
    const { selectedIssues } = useSelector((state: any) => state.AdminReducer);
    const { ticketEvents } = useSelector((state: any) => state.CompanyReducer);
    const textMessage = useInput('')
    const modalName = useInput('')
    const [photo, setPhoto] = useState<any>([])
    const [image, setImage] = useState('')
    const [selectAttachments, setSelectAttachments] = useState(false)
    const [selectDropzone, setSelectDropzone] = useState<any>([{}])

    useEffect(() => {
        ProceedGetTicketEvents()
    }, []);

    function ProceedGetTicketEvents() {

        if (selectedIssues) {
            const params = {
                ticket_id: selectedIssues.id,
            };

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

    const sendMessageHandler = () => {

        if (textMessage) {
            const params = {
                id: selectedIssues.id,
                message: textMessage.value,
                event_type: TEM
            }

            dispatch(addTicketEvent({
                params,
                onSuccess: () => () => {
                    textMessage.set('')
                    ProceedGetTicketEvents()
                },
                onFailure: () => () => { }
            }))
        }
    }

    const onModalSubmitHandler = () => {
        const params = {
            event_type: MEA,
            id: selectedIssues.id,
            attachments: [{ attachment: photo }],
            name: modalName.value
        };
        dispatch(
            addTicketEvent({
                params,
                onSuccess: () => () => {
                    ProceedGetTicketEvents();
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
    console.log('1221121', JSON.stringify(ticketEvents));

    return (
        <>
            <div>
                <TagAssignUser />
            </div>
            <div className='vh-100 d-flex justify-content-center'>
                <Card className='vh-100 col-lg-10 col-sm-12 overflow-auto scroll-hidden' style={{ position: "relative",height:'100vh' }}>

                    <div className='fixed-bottom col-lg-6 col-sm-12 '>
                        <Send value={textMessage.value}
                            onClick={sendMessageHandler}
                            onChange={textMessage.onChange}
                        />
                    </div>
                    <div className=' col-1 pl-0'>
                        <Image variant='rounded' size='sm' src={icons.addFillSquare} onClick={() => { setSelectAttachments(!selectAttachments) }} />
                    </div>
                    <div className={'pt-3'}>
                        {ticketEvents && ticketEvents.data.length > 0 && ticketEvents.data.map((el) => {
                            return (
                                <Chat item={el} />
                            )
                        })}
                    </div>
                </Card>

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
            </div>

        </>
    )
}

export { Thread }


