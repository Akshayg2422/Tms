import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTickets } from '@Redux';
import { Divider, HomeContainer ,Card} from '@Components';
import { CompanyIssueItem } from '@Modules';
function CompanyIssues() {

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
        <div className='m-0'>
            <HomeContainer isCard title='Issues'>   
                {
                        tickets && tickets.length > 0 ? tickets.map((eachTickets: any, index: number) => {
                            return (
                                <>
                                    <CompanyIssueItem item={eachTickets} key={index} />
                                    {index !== tickets.length - 1 && <div className='mx-7'><Divider /></div>}
                                </>
                            )
                        }) 
                        :
                        <div className='text-center'>
                            No Date Found
                        </div>

                    }
                    </HomeContainer>
                
        </div>
    )
}
export { CompanyIssues }