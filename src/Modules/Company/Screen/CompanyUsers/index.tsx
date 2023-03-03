import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Card, Divider, Button } from '@Components'
import { UserItem } from '@Modules'
import { getEmployees } from '@Redux'
import { useNavigation } from '@Hooks'
import { HOME_PATH } from '@Routes'
import { translate } from "@I18n";
function CompanyUsers() {

    const { goTo } = useNavigation()
    const dispatch = useDispatch()
    const { employees } = useSelector((state: any) => state.CompanyReducer);


    const { companyDetailsSelected } = useSelector(
        (state: any) => state.AdminReducer
    );



    useEffect(() => {
        const params = { branch_id: companyDetailsSelected.branch_id };
        dispatch(getEmployees({
            params,
            onSuccess: () => () => { },
            onError: () => () => { }
        }));
    }, []);

    return (
        <div>
            <div className='text-right mt--3'>
                <Button text={translate('common.addUser')} size={'sm'} onClick={() => { goTo(HOME_PATH.DASHBOARD + HOME_PATH.ADD_USER) }} />
            </div>
            <Card className='mt-3 py-2'>
                {
                    employees && employees.length > 0 && employees.map((user: any, index: number) => {
                        return (
                            <>
                                <UserItem item={user} />
                                {index !== employees.length - 1 && <Divider space={'4'} />}
                            </>
                        )
                    })

                }
            </Card>
        </div>
    )
}
export { CompanyUsers }