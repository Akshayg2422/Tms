import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, CommonTable, Image, MenuBar, Dropzone, Modal } from '@Components'
import { getEmployees, addUpdateEmployeePhoto } from '@Redux'
import { useModal, useNavigation } from '@Hooks'
import { HOME_PATH } from '@Routes'
import { translate } from "@I18n";
import { getPhoto, } from "@Utils";
import { icons } from '@Assets'


function CompanyUsers() {

  const { goTo } = useNavigation()
  const dispatch = useDispatch()

  const { employees, selectedCompany } = useSelector((state: any) => state.UserCompanyReducer);

  useEffect(() => {
    getCompanyEmployeesApi()
  }, []);

  function getCompanyEmployeesApi() {

    const params = { branch_id: selectedCompany.branch_id };
    dispatch(getEmployees({
      params,
      onSuccess: (response) => () => {
      
      },
      onError: () => () => { }
    }));
  }

  const normalizedTableData = (data: any) => {
    return data?.map((el: any) => {
      return {
        profile: 
        <div className='row '>
          <div className='col-auto '>{el?.profile_image ?<Image variant={'rounded'} src={getPhoto(el?.profile_image)}/>:<Image variant={'rounded'} src={icons.profilePick}/>}</div>
         <div className='col mt--3 '> <div className='row h5 mb-0 '>{ el.name}</div>
          <div className=' row ' >{el?.department?.name} <div className='px-1'>/</div>  {el?.designation?.name}</div>
          </div>
          </div>,
        phone: el?.mobile_number,
        email: el?.email,
    
      };
    });
  };

  return (
    <div>
      <div className='text-right mt--3'>
        <Button text={translate('common.addUser')} size={'sm'} onClick={() => { goTo(HOME_PATH.ADD_USER) }} />
      </div>
      <div className='mx--3 mt-3'>
        <CommonTable card title='User' tableDataSet={employees} displayDataSet={normalizedTableData(employees?.data)} />
      </div>

    
    </div>
  )
}
export { CompanyUsers }