import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAssociatedBranch } from '@Redux'
import { Card, Divider, Button, HomeContainer } from '@Components'
import { CompanyItem, } from '@Modules'
import {useNavigation} from '@Hooks'
import {HOME_PATH} from '@Routes'

function Companies() {

    const dispatch = useDispatch()
    const {goTo} = useNavigation()

    const { associatedCompanies } = useSelector(
        (state: any) => state.AdminReducer,
    );

    useEffect(() => {
        const params = { q: '' };
        dispatch(
            getAssociatedBranch({
                params,
            }),
        );
    }, []);

    return (
        <HomeContainer>
            <div className='col text-right'>
                <Button text={'Create Company'} onClick={() => {
                    goTo(HOME_PATH.DASHBOARD+HOME_PATH.CREATE_COMPANY)
                }} />
            </div>
            <Card title={'Companies'} className='mt-4'>
                {
                    associatedCompanies && associatedCompanies.data.length > 0 && associatedCompanies.data.map((company: any, index: number) => {
                        return (
                            <>
                                <CompanyItem key={company.id} item={company} />
                                {index !== associatedCompanies.data.length - 1 && <div className='mx-9'><Divider /></div>}
                            </>
                        )
                    })
                }
            </Card>
        </HomeContainer>

    )
}
export { Companies }