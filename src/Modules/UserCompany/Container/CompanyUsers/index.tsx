import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, CommonTable, Image, MenuBar, Dropzone, Modal, SearchInput } from '@Components'
import { getEmployees, addUpdateEmployeePhoto } from '@Redux'
import { useInput, useModal, useNavigation } from '@Hooks'
import { HOME_PATH } from '@Routes'
import { translate } from "@I18n";
import { getPhoto, paginationHandler, } from "@Utils";
import { icons } from '@Assets'


function CompanyUsers() {

  const { goTo } = useNavigation()
  const dispatch = useDispatch()
  const search = useInput("");

  const { employees, selectedCompany ,employeesNumOfPages,employeesCurrentPages} = useSelector((state: any) => state.UserCompanyReducer);

  useEffect(() => {
    getCompanyEmployeesApi(employeesCurrentPages,search?.value)
  }, [search.value]);
  console.log(search.value,"pppppp")
  function getCompanyEmployeesApi(page_number: number,q_many:string = '') {

    const params = { branch_id: selectedCompany.branch_id ,
      page_number,
      q_many,
      
    };
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
        <CommonTable card title={<div className='row'><div className='h3 '>{'Users'}</div>
         <div className='col-4 text-right '>
         <SearchInput onSearch={search.set
            //  getCompanyEmployeesApi(employeesCurrentPages,search)
         } 
         defaultValue={search.value}/>
     </div> 
     </div>}
        isPagination
        tableDataSet={employees} 
        displayDataSet={normalizedTableData(employees)} 
        noOfPage={ employeesNumOfPages}
        currentPage={employeesCurrentPages}
        paginationNumberClick={(currentPage) => {
          getCompanyEmployeesApi(paginationHandler("current", currentPage));
      }}
      previousClick={() => {
          getCompanyEmployeesApi(paginationHandler("prev", employeesCurrentPages))
      }
      }
      nextClick={() => {
          getCompanyEmployeesApi(paginationHandler("next", employeesCurrentPages));
      }
      }
        
        />
      </div>

    
    </div>
  )
}
export { CompanyUsers }