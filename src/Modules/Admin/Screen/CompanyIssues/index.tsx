import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTickets } from '@Redux';
import { HomeContainer,NoDataFound ,Table} from '@Components';
import {setIsSync} from '@Redux'
import { getStatusFromCode } from '@Utils';
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
    return data.map((el: any) => {
      return {
        issue: el.title,
        "raised by": el?.by_user.name,
        status: getStatusFromCode(dashboardDetails, el.ticket_status),
        "assigned to": el?.assigned_to.name,
        phone: el.by_user?.phone,
        email: el.by_user?.email
      };
    });
  };

    return (
        <HomeContainer isCard>
               {
                    tickets && tickets?.data?.length > 0 ? < Table displayDataSet={normalizedTableData(tickets?.data)} /> : <NoDataFound/>
                }
        </HomeContainer>

    )
}
export { CompanyIssues }