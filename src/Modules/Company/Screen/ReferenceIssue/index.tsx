
import { useSelector } from 'react-redux'
import { H } from '@Components'
import { ReferenceIssueProps } from './interfaces';
import { getStatusFromCode } from '@Utils'
import moment from 'moment'
function ReferenceIssue({ item }: ReferenceIssueProps) {

    const { dashboardDetails } = useSelector((state: any) => state.AdminReducer)
    const { addReferenceDetails } = useSelector((state: any) => state.CompanyReducer);
    const { title, by_user, ticket_status, created_at, raised_by_company } = item

    return (
        <div className='row d-flex justify-content-center'>
            <div className='col-lg-5 col-md-7 col-sm-0 col-7' >
                <div className=''>
                    <H tag={'h3'} className='text-capitalize pl-1' text={title} />
                    <div className='h4 pl-1'>  <i className="bi bi-person-circle  "></i>  {by_user.name} </div>
                    <div className='h3 text-uppercase px-1'>

                        {raised_by_company.display_name}
                    </div>
                </div>
            </div>
            <div className='col-lg-3 col-md-5 col-sm-0 col-5' >
                <div className=''>
                    <span className='py-2'><i className="bi bi-calendar-week mr-1"></i>{getStatusFromCode(dashboardDetails, ticket_status)}</span>
                    <h5 className=' text-muted py-1  m-0'> {moment(created_at).format('DD-MM-YYYY HH:mm A')}
                    </h5>
                </div>
            </div>
        </div>

    )
}
export { ReferenceIssue }