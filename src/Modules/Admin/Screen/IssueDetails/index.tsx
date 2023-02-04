import { Card } from '@Components'
import { Chat, Send } from '@Modules'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { addTicketEvent, getTicketsEvents } from '@Redux';
import { useInput } from '@Hooks';


function IssueDetails() {
    const [dummy,setDummy] = useState<any>()
    const dispatch = useDispatch();
    const { selectedIssues } = useSelector((state: any) => state.AdminReducer);
    const { ticketEvents } = useSelector((state: any) => state.CompanyReducer);
    console.log('selectedIssues', selectedIssues);


    const textMessage = useInput('')

    const sendMessageHandler = () => {
        const params = {
            id: selectedIssues.id,
            message: textMessage.value
        }
        console.log(params, 'paaaddaada2222222222222222');
        textMessage.set('')
      dispatch(addTicketEvent({params}))
    //   setDummy(aa)
    //     console.log(aa,"++++++++++++++++++++++++++++")
    }
useEffect( () => {


},[dummy])

    useEffect(() => {
        const params = { ticket_id: selectedIssues.id };
        console.log('params11111111111', params);
        dispatch(getTicketsEvents({
            params}));
    }, [ticketEvents])

    return (
        <div className='vh-100 d-flex justify-content-center'>
            <Card className='vh-100 col-lg-6 col-sm-12'>
                <Chat />
                <div className='fixed-bottom col-lg-6 col-sm-12 '>
                    <Send  value={textMessage.value} onClick={sendMessageHandler} onChange={textMessage.onChange}/>
                </div>
            </Card>
        </div>
    )
}

export { IssueDetails } 