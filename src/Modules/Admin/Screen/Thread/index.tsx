import { Card } from '@Components'
import {
    Chat,
    Send,
    TagAssignUser
} from '@Modules'
import {
    useDispatch,
    useSelector
} from 'react-redux'
import { useEffect } from 'react';
import {
    addTicketEvent,
    getTicketsEvents
} from '@Redux';
import { TEM, arrayOrderbyCreatedAt } from '@Utils';
import { useInput } from '@Hooks';


function Thread() {

    const dispatch = useDispatch();
    const { selectedIssues } = useSelector((state: any) => state.AdminReducer);
    const { ticketEvents } = useSelector((state: any) => state.CompanyReducer);
    const textMessage = useInput('')

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

    let data = arrayOrderbyCreatedAt(ticketEvents?.data)

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

    return (

        <div>
            <TagAssignUser/>
            <div className='d-flex justify-content-center'>
                <Card className='col-lg-10 col-sm-12 overflow-auto overflow-hide mt--3 mb--5' style={{ height: '84.5vh' }}>

                    <div className='fixed-bottom col-lg-6 col-sm-12' style={{ cursor: "pointer" }}>
                        <Send value={textMessage.value}
                            onClick={sendMessageHandler}
                            onChange={textMessage.onChange}
                        />
                    </div>
                    <div className={'py-5'}>
                        {data && data.length > 0 && data.map((el) => {
                            return (
                                <Chat item={el} />
                            )
                        })}
                    </div>
                </Card>
            </div>
        </div>
    )
}

export { Thread }


