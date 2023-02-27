import { Card, Divider, HomeContainer } from '@Components'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReferenceIssue } from '@Modules'
import { getReferenceTickets } from '@Redux'

function IssueDetailss() {

    const dispatch = useDispatch()
    const { addReferenceDetails } = useSelector((state: any) => state.CompanyReducer);
    const { selectedIssues } = useSelector((state: any) => state.AdminReducer);
    // console.log('getReferenceTickets', JSON.stringify(addReferenceDetails));

    useEffect(() => {
        proceedgetReferenceTickets()
    }, [])

    function proceedgetReferenceTickets() {
        const params = {
            id: selectedIssues?.id, q: ''
        }
        dispatch(
            getReferenceTickets({
                params,
                onSuccess: () => () => { },
                onFailure: () => () => { }
            })
        )
    }
    return (
        <HomeContainer>
            <Card title={"Reference Tickets"} className="mt-2">
                {
                    addReferenceDetails &&
                    addReferenceDetails.data.length > 0 ?
                    addReferenceDetails.data.map((eachReferenceTickets: any, index: number) => {
                            return (
                                <div>
                                    <ReferenceIssue key={eachReferenceTickets.id} item={eachReferenceTickets} />
                                    {index !== addReferenceDetails.data.length - 1 && <div className='mx-7'><Divider /></div>}
                                </div>
                            );
                        })
                        :
                        <div className='text-center'>
                            No Date Found
                        </div>
                }
            </Card>
        </HomeContainer>
    )
}

export { IssueDetailss } 