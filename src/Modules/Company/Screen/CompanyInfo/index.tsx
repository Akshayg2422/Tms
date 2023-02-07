import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAssociatedBranch } from '@Redux'
import { Card, Divider, HomeContainer } from '@Components'
import { CompanyInfoItem, CompanyUsers, } from '@Modules'

function CompanyInfo() {
    

    // const dispatch = useDispatch()

    const { companyDetailsSelected } = useSelector(
        (state: any) => state.AdminReducer,
    );

    console.log('companyDetailsSelected',companyDetailsSelected);
    
    return (
        <>
        <HomeContainer>
        
            <Card className='mt-4'>
                            <>
                                <CompanyInfoItem item/>
                               
                            </>

            </Card>
           
           
        </HomeContainer>
        <CompanyUsers/>
        </>
        

    )
}
export { CompanyInfo}