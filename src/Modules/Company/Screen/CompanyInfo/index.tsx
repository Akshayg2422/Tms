import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAssociatedBranch } from '@Redux'
import { Card, Divider, HomeContainer } from '@Components'
import { CompanyInfoItem, } from '@Modules'

function CompanyInfo() {

    const dispatch = useDispatch()

    const { associatedCompanies } = useSelector(
        (state: any) => state.AdminReducer,
    );

    useEffect(() => {
        const params = { q: '' };
        dispatch(
            getAssociatedBranch({
                params
            }),
        );
    }, []);

    return (
        <HomeContainer>
        
            <Card className='mt-4'>
                {
                    associatedCompanies && associatedCompanies.data.length > 0 && associatedCompanies.data.map((company: any, index: number) => {
                        return (
                            <>
                                <CompanyInfoItem key={company.id} item={company} />
                                {index !== associatedCompanies.data.length - 1 && <div className='mx-9'><Divider /></div>}
                            </>
                        )
                    })
                }
            </Card>
        </HomeContainer>

    )
}
export { CompanyInfo}