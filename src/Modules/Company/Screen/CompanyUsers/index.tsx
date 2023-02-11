import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Card, Divider, Button, HomeContainer } from '@Components'
import { UserItem } from '@Modules'
import { getEmployees } from '@Redux'
import {useNavigation} from '@Hooks'
import { ADD_USER_INFO,HOME_PATH } from '@Routes'
function CompanyUsers() {

    const {goTo, goBack} = useNavigation()
    const dispatch = useDispatch()
    const { getEmployeesDetails} = useSelector((state: any) => state.CompanyReducer);
    console.log(getEmployeesDetails,"mbjbjbjbjgggggggggg")
 
    const { companyDetailsSelected  } = useSelector(
        (state: any) => state.AdminReducer
      );
      console.log(companyDetailsSelected,'companyDetailsSelected')
  

    useEffect(() => {
        const params = { branch_id:companyDetailsSelected.branch_id};
       
        
        dispatch(getEmployees({ params, 
            onSuccess:()=>{


        }, onError:()=>{} }));
    }, []);

    return (
        <div>
            <HomeContainer>
                <div className='text-right mt--3'>
                    <Button text={'Add User'} size={'sm'} onClick={()=>{goTo(HOME_PATH.DASHBOARD+ADD_USER_INFO.ADD_USER)}} />
                </div>
                <Card className='mt-3'>
                    {
                        getEmployeesDetails && getEmployeesDetails.length > 0 && getEmployeesDetails.map((user: any, index: number) => {
                            return (
                                <>
                                    <UserItem item={user} />
                                    {index !== getEmployeesDetails.length - 1 && <Divider />}
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