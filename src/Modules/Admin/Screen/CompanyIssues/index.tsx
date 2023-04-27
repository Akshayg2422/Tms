import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTickets } from '@Redux';
import { CommonTable, NoDataFound } from '@Components';
import { getStatusFromCode } from '@Utils';

function CompanyIssues() {

  const dispatch = useDispatch();
  const { tickets } = useSelector((state: any) => state.CompanyReducer);
  const { selectedCompany, dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);

  useEffect(() => {
    getCompanyTasksApi()
  }, []);


  function getCompanyTasksApi() {
    const params = { branch_id: selectedCompany.branch_id }
    dispatch(getTickets({
      params,
      onSuccess: () => () => {
      },
      onError: () => () => { }
    }))
  }

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
      {tickets && tickets.length > 0 ? <CommonTable card title={'Issue'} displayDataSet={normalizedTableData(tickets)} /> : <NoDataFound />}
    </div>

  )
}
export { CompanyIssues }