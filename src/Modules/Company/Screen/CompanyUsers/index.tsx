import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Card, Table, Button, CommonTable } from '@Components'
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

    const normalizedTableData = (data: any) => {
        return data.map((el: any) => {
            return {
                name: el.name,
                phone: el?.mobile_number,
                email: el?.email
            };
        });
    };

    return (
        <div>
            <div className='text-right mt--3'>
                <Button text={translate('common.addUser')} size={'sm'} onClick={() => { goTo(HOME_PATH.DASHBOARD + HOME_PATH.ADD_USER) }} />
            </div>
            <div className='mx--3 mt-3'>
                <CommonTable title='User' tableDataSet={employees} displayDataSet={normalizedTableData(employees)} />
            </div>
        </div>
    )
}
export { CompanyUsers }