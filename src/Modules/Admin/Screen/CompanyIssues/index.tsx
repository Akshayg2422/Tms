import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTickets } from '@Redux';
import { HomeContainer,NoDataFound } from '@Components';
import { CompanyIssueItem } from '@Modules';
import {setIsSync} from '@Redux'
function CompanyIssues() {

    const dispatch = useDispatch();
    const { tickets } = useSelector((state: any) => state.CompanyReducer);
    const { companyDetailsSelected } = useSelector((state: any) => state.AdminReducer);
    const { isSync } = useSelector((state: any) => state.AppReducer);


    useEffect(() => {
        const params = { branch_id: companyDetailsSelected.branch_id }
        dispatch(getTickets({
            params,
            onSuccess: () => () => { 
                dispatch(setIsSync({
                    ...isSync, issues: false
                }))

            },
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
                        : <NoDataFound/>
                }
            </div>
        </HomeContainer>

    )
}
export { CompanyIssues }