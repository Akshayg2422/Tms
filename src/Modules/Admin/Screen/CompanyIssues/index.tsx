import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTickets } from '@Redux';
import { HomeContainer } from '@Components';
import { CompanyIssueItem } from '@Modules';
function CompanyIssues() {

    const dispatch = useDispatch();
    const { tickets } = useSelector((state: any) => state.CompanyReducer);
    const { companyDetailsSelected } = useSelector((state: any) => state.AdminReducer);

    useEffect(() => {
        const params = { branch_id: companyDetailsSelected.branch_id }
        dispatch(getTickets({
            params,
            onSuccess: () => () => { },
            onError: () => () => { }
        }))
    }, []);


    return (
        <HomeContainer isCard>
            <div className='pt-3'>
                {
                    tickets && tickets.length > 0 ? tickets.map((eachTickets: any, index: number) => {

                        const divider = tickets.length - 1 !== index
                        return (
                            <CompanyIssueItem item={eachTickets} key={index} divider={divider} />
                        )
                    })
                        :
                        <div className='text-center'>
                            No Date Found
                        </div>
                }
            </div>
        </HomeContainer>

    )
}
export { CompanyIssues }