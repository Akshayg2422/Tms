
import { useSelector } from 'react-redux'
import { Divider, H, Badge } from '@Components'
import { ReferenceIssueProps } from './interfaces';
import { getStatusFromCode,handleEmailClick,getDataAndTime } from '@Utils'
function ReferenceIssue({ item, divider }: ReferenceIssueProps) {
    const { dashboardDetails } = useSelector((state: any) => state.AdminReducer)
    const { issueReferenceDetails } = useSelector((state: any) => state.CompanyReducer);
    const { title, by_user, ticket_status, created_at, raised_by_company, assigned_to } = item

    return (
        <div className='row d-flex justify-content-center'>
            <div className='col col-sm-9'>
                <div className='d-flex justify-content-between'>
                    <div>
                        <H tag={'h3'} className='text-capitalize pl-1' text={title} />
                        <div className='h4 pl-1'>  <i className="bi bi-person-circle  "></i>  {by_user.name} </div>
                        <div>
                            <span className='mr-2'><Badge pill color={'info'} className='h4 text-uppercase text-muted pointer' text={'PHONE'} /> </span>
                            <Badge pill color={'success'} className='h4 text-uppercase text-muted pointer' onClick={() => { (handleEmailClick(by_user.email)) }} text={'Email'} />
                        </div>
                    </div>
                    <div>
                        <h5 className='text-uppercase text-muted mb-0 card-title'><i className="bi bi-calendar-week mr-1"></i>{getStatusFromCode(dashboardDetails, ticket_status)}</h5>
                        <h5 className=' text-muted m-0'> {getDataAndTime(created_at)}
                        </h5>
                        <div className='mt-2' >
                            <small className='text-muted mb-0 text-sm'> Assigned by </small>
                            <p className='h4'> {assigned_to?.name} </p>
                        </div>
                    </div>
                </div>
                {divider && <Divider />}
            </div>
        </div>

    )
}
export { ReferenceIssue }