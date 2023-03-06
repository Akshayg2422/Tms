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
import { TEM } from '@Utils';
import { useInput } from '@Hooks';
import './index.css'


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

    console.log('ticketEvents---->ticketEvents---->', JSON.stringify(ticketEvents));

    return (

        <>
            <div>
                <TagAssignUser />
            </div>
            <div className='vh-100 d-flex justify-content-center'>
                <Card className='vh-100 col-lg-10 col-sm-12 overflow-auto overflow_hidden'>

                    <div className='fixed-bottom col-lg-6 col-sm-12' style={{ cursor: "pointer" }}>
                        <Send value={textMessage.value}
                            onClick={sendMessageHandler}
                            onChange={textMessage.onChange}
                        />
                    </div>
                    <div className={'pt-3'}>
                        {ticketEvents && ticketEvents.data.length > 0 && ticketEvents.data.map((el) => {
                            return (
                                <Chat item={el} />
                            )
                        })}
                    </div>
                </Card>
            </div>
        </>
    )
}

export { Thread }


