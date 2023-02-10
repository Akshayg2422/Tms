
import React, { useEffect, useState } from 'react'
import { translate } from "@I18n";
import { companySelectedDetails, getAssociatedBranch } from "@Redux";
import { HomeContainer, Input, DropDown, H, Divider, Button, Radio} from '@Components'
import {
  GENDER_LIST,
  DESIGNATION_LIST,
 type
} from '@Utils';
import { useDispatch, useSelector } from 'react-redux'


import { useInput, useDropDown,useNavigation } from '@Hooks'



function IssueCreate() {
  
  const dispatch = useDispatch();
  const [typeSelect,setTypeSelect]=useState(type[0])
  const { associatedCompanies } = useSelector(
    (state: any) => state.AdminReducer
  );
  const { getEmployeeDetails} = useSelector((state: any) => state.CompanyReducer);
  const[companyDisplayName,setCompanyDisplayname]=useState()
  const[companyUser,setCompanyUser]=useState()


useEffect(()=>{

let companies: any = [];
let companyUser:any=[];

  associatedCompanies.data.forEach(({id, display_name}) => {

    companies = [...companies, {id, text:display_name, name: display_name}]
  
    
  });
  getEmployeeDetails.data.forEach(({id, name}) => {

    companyUser= [...companyUser, {id, text:name, name:name}]
  
    
  });

  setCompanyDisplayname(companies)
  setCompanyUser( companyUser)

},[])



  return (
    <div>
        <HomeContainer isCard title={translate('common.createTicket')!} >
            <div className='col-md-9 col-lg-7'>
                <Input heading={translate('auth.title')}  />
                <Input heading={translate('auth.description')}/>
                <Input type={'number'} heading={translate('auth.referenceNo')}   />
                <Radio
          selected={typeSelect}
            data={type}
            
            onRadioChange={(selected) => {
              if (selected) {
            
          setTypeSelect(selected)
              
              }
            }}
          />
          
              {typeSelect&&typeSelect?.id==='1'&&<DropDown heading={translate('common.company')} data={companyDisplayName} 
              onChange={()=>{ dispatch(companySelectedDetails(companyDisplayName));}}/>}

                <DropDown heading={translate('common.user')} data={companyUser} />

            </div>

            <div className='row justify-content-end'>
                <div className='col-md-6 col-lg-4  my-4'>
                    <Button
                        block text={translate('common.submit')}
                    />
                </div>
            </div>

        </HomeContainer>

    </div>
  )
}

export {IssueCreate}