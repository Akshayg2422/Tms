import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { HomeContainer, H, Badge, } from '@Components'
import { ReferenceIssueItemProps } from './interfaces';
import { getStatusFromCode } from '@Utils'
import moment from 'moment'
function ReferenceIssueItem({ item }: ReferenceIssueItemProps) {

    const { dashboardDetails } = useSelector((state: any) => state.AdminReducer)
    const { title, by_user, ticket_status, created_at, assigned_to,raised_by_company } = item
    return (
            <div className='row d-flex justify-content-center'>
                <div className='col-lg-8'> <H tag={'h3'} className='text-capitalize pl-1' text={title} /></div>
                <div className='col-lg-5 col-md-7 col-sm-0 col-7' >
                    <div className=''>
                  
                        <div className='h4 pl-1'>  <i className="bi bi-person-circle "></i>  {by_user.name} </div>
                        <div className='h3 text-uppercase px-1'>
                            
                      {raised_by_company.display_name}
                        </div>

                    </div>
                </div>
                <div className='col-lg-3 col-md-5 col-sm-0 col-5' >
                    <div className=''>
                        <span className='py-2'><i className="bi bi-calendar-week mr-1"></i>{getStatusFromCode(dashboardDetails, ticket_status)}  </span>
                       
                    </div>
                </div>
            </div>

    )
}
export { ReferenceIssueItem}