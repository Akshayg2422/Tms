import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTickets } from '@Redux';
import { CommonTable, NoDataFound } from '@Components';
import { setIsSync } from '@Redux'
import { getStatusFromCode } from '@Utils';
import { t } from 'i18n-js';
function CompanyIssues() {

  const dispatch = useDispatch();
  const { tickets } = useSelector((state: any) => state.CompanyReducer);
  const { companyDetailsSelected } = useSelector((state: any) => state.AdminReducer);
  const { isSync } = useSelector((state: any) => state.AppReducer);
  const { dashboardDetails } = useSelector((state: any) => state.AdminReducer)

  

  useEffect(() => {
    const params = { branch_id: companyDetailsSelected.branch_id }
    
    dispatch(getTickets({
      params,
      onSuccess: () => () => {
        dispatch(setIsSync({
          ...isSync, issues: false
        }))

      },
      onError: () => () => { }
    }))
  }, []);


  const normalizedTableData = (data: any) => {
    if (data && data.length > 0)
      return data.map((el: any) => {
        return {
          issue: el.title,
          "raised by": el?.by_user.name,
          status: getStatusFromCode(dashboardDetails, el.ticket_status),
          "assigned to": el?.assigned_to?.name,
          phone: el.by_user?.phone,
          email: el.by_user?.email
        };
      });
  };

  return (
    <div className='my-3'>
    {tickets&&tickets.length>0?<CommonTable title={'Issue'} displayDataSet={normalizedTableData(tickets)} />: <NoDataFound/>}
    </div>

  )
}
export { CompanyIssues }