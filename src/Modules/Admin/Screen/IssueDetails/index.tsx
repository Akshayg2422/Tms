import { Card } from '@Components'
import { Chat, Send } from '@Modules'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { addTicketEvent, getTicketsEvents } from '@Redux';
import { useInput } from '@Hooks';
import { Dropzone } from '@Components';


function IssueDetails() {

    const dispatch = useDispatch();
    const { selectedIssues } = useSelector((state: any) => state.AdminReducer);
    console.log('selectedIssues', selectedIssues);
    const textMessage = useInput('')
    const [image, setImage] = useState('')

    useEffect(() => {
        beginGetTicketEvents()
    }, []);

    const sendMessageHandler = () => {
        const params = {
            id: selectedIssues.id,
            message: textMessage.value,
            event_type: 'TEM',
        }
        console.log(params, 'paramsssssssssssssssssssssssss');

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
            dispatch(
                getTicketsEvents({
                    params,
                    onSuccess: () => { },
                    onFailure: () => { }
                })
            )
        }
    }

    return (
        <div className='vh-100 d-flex justify-content-center'>
            <Card className='vh-100 col-lg-6 col-sm-12'>
                <Chat item={selectedIssues.id}/>
                <div className=' d-flex justify-content-center fixed-bottom col-6 pl-6'>
                    <Dropzone variant='ICON'
                        icon={image}
                        size='sm'
                        onSelect={(image) => {
                            let encoded = image.toString().replace(/^data:(.*,)?/, '');
                            setImage(encoded)
                        }
                        } />
                </div>
                <div className='fixed-bottom col-lg-6 col-sm-12 '>
                    <Send value={textMessage.value} onClick={sendMessageHandler} onChange={textMessage.onChange} />
                </div>
            </Card>
        </div>
    )
}

export { IssueDetails } 