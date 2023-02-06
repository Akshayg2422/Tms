import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Card, Divider, Button, HomeContainer } from '@Components'
import { UserItem } from '@Modules'
import { getEmployee, } from '@Redux'
function CompanyUsers() {

    const dispatch = useDispatch()
    const { getEmployeeDetails } = useSelector((state: any) => state.CompanyReducer);

    useEffect(() => {
        const params = { q: '' };
        dispatch(getEmployee({ params }));
    }, []);

    return (
        <div>
            <HomeContainer>
                <div className='text-right'>
                    <Button text={'Add User'} onClick={() => { }} />
                </div>
                <Card className='mt-3'>
                    {
                        getEmployeeDetails && getEmployeeDetails.data.length > 0 && getEmployeeDetails.data.map((user: any, index: number) => {
                            return (
                                <>
                                    <UserItem item={user} />
                                    {index !== getEmployeeDetails.data.length - 1 && <Divider />}
                                </>
                            )
                        })

                    }
                </Card>
            </HomeContainer>

        </div>
    )
}
export { CompanyUsers }