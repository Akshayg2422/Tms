import { Card } from '@Components'
import { Chat, Send } from '@Modules'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getTickets, getTicketsEvents } from '@Redux';


function IssueDetails() {
    const dispatch = useDispatch();
    const { selectedIssues } = useSelector((state: any) => state.AdminReducer);
    console.log();
    

    useEffect(() => {
        const params = { ticket_id: selectedIssues.id };
        dispatch(getTicketsEvents({ params }));
    }, [])
    
    return (
        <div className={'vh-100 d-flex justify-content-center'}>
            <Card className={'vh-100 col-lg-6 col-sm-6 col-md-6 bg-gradient-info'}>
                <Chat />
                <Send />
            </Card>
        </div>
    )
}

export {IssueDetails} 