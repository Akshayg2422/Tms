import { Card, Divider, HomeContainer } from '@Components'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReferenceIssue } from '@Modules'
import { getReferenceTickets } from '@Redux'

function ReferenceTickets() {

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
            <Card className="pt-3">
                {
                    addReferenceDetails &&
                    addReferenceDetails.data.length > 0 ?
                    addReferenceDetails.data.map((eachReferenceTickets: any, index: number) => {
                        const divider = addReferenceDetails.data.length - 1 !== index
                            return (
                                <div>
                                    <ReferenceIssue key={eachReferenceTickets.id} item={eachReferenceTickets} divider={divider} />                                
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

export { ReferenceTickets } 