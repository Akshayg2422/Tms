import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTickets } from '@Redux';
import { HomeContainer, Divider, Button } from '@Components';
import { TicketItem } from '@Modules';
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes';

function Issues() {
    const { goTo } = useNavigation()
    const { tickets } = useSelector((state: any) => state.CompanyReducer);
    const { selectedIssues } = useSelector((state: any) => state.AdminReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const params = { q: '' };
        dispatch(getTickets({ params }));
    }, []);

    return (
        <HomeContainer isCard title={'Issues'} >
            <Button
                text={'test'}
                onClick={() => {        
                    goTo(ROUTES.AUTH.SEND)
                }}
            />
            {
                tickets && tickets.data.length > 0 && tickets.data.map((eachTickets: any, index: number) => {
                    return (
                        <>
                            <TicketItem item={eachTickets} />
                            {index !== tickets.data.length - 1 && <div className='mx-7'><Divider /></div>}
                        </>
                    )
                })
            }

        </HomeContainer>
    )
}

export { Issues }