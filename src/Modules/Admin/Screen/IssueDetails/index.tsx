import { Card } from '@Components'
import { Chat, Send } from '@Modules'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getTicketsEvents } from '@Redux';


function IssueDetails() {
    const dispatch = useDispatch();
    const { selectedIssues } = useSelector((state: any) => state.AdminReducer);
    console.log('selectedIssues', selectedIssues);


    useEffect(() => {
        const params = { ticket_id: selectedIssues.id };
        console.log('params11111111111', params);
        dispatch(getTicketsEvents({ params }));
    }, [])

    return (
        <div className={'vh-100 d-flex justify-content-center'}>
            <Card className={'vh-100 col-sm-6 bg-gradient-white'}>
                <Chat />
                <Send />
            </Card>
        </div>
    )
}

export { IssueDetails } 