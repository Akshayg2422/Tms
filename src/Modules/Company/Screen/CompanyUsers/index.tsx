import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Card, Divider, Button, HomeContainer } from '@Components'
import { UserItem } from '@Modules'
import { getEmployee, } from '@Redux'
import {useNavigation} from '@Hooks'
import { ADD_USER_INFO,HOME_PATH } from '@Routes'
function CompanyUsers() {

    const {goTo} = useNavigation()
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
                    <Button text={'Add User'} onClick={()=>{goTo(HOME_PATH.DASHBOARD+ADD_USER_INFO.ADD_USER)}} />
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