import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTickets } from '@Redux';
import { Divider, HomeContainer ,Card} from '@Components';
import { ReferenceIssueItem } from '@Modules';
function ReferenceTicketIssue() {

const dispatch = useDispatch();
 const { tickets } = useSelector((state: any) => state.CompanyReducer);
const { companyDetailsSelected } = useSelector((state: any) => state.AdminReducer);



    useEffect(() => {
        const params = { branch_id: companyDetailsSelected.branch_id }    
        dispatch(getTickets({
            params,
            onSuccess: (success) => () => { },
            onError: (error) => () => { }
        }))
    }, []);


    return (
        <div className='m-4'>
            <div className='row justify-content-center'>
                <div className='col-lg-7'>

           <Card>
                {
                        tickets && tickets.length > 0 ? tickets.map((eachTickets: any, index: number) => {
                            return (
                                <>
                                    <ReferenceIssueItem item={eachTickets} key={index} />
                                    {index !== tickets.length - 1 && <div className='mx-7'><Divider /></div>}
                                </>
                            )
                        }) 
                        :
                        <div className='text-center'>
                            No Date Found
                        </div>

                    }
                    </Card>
                   
                    </div>
                
        </div>
        </div>
    )
}
export { ReferenceTicketIssue}