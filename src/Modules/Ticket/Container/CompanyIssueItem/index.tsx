import { useSelector } from 'react-redux'
import {  H, Badge, Divider} from '@Components'
import { CompanyIssueItemProps } from './interface';
import { getStatusFromCode, handleEmailClick,getDataAndTime } from '@Utils'
import { translate } from '@I18n';
function CompanyIssueItem({ item ,divider}: CompanyIssueItemProps) {

    const { dashboardDetails } = useSelector((state: any) => state.AdminReducer)
    const { title, by_user, ticket_status, created_at, assigned_to } = item



    return (
        <div className='row d-flex justify-content-center' >
            <div className='col col-sm-9'>

                <div className='d-flex justify-content-between'>
                    <div>
                        <H tag={'h3'} className='text-capitalize' text={title} />
                        <div>
                            <div className='h4 mb-1'><i className="bi bi-person-circle  mr-1"></i>{by_user.name}</div>
                            <div>
                                <span className='mr-2'><Badge pill color={'info'} className='h4 text-uppercase text-muted pointer' text={'PHONE'} /> </span>
                                <Badge pill color={'success'} className='h4 text-uppercase text-muted pointer' onClick={() => { (handleEmailClick(by_user.email)) }} text={'Email'} />
                            </div>
                        </div>
                     
                    </div>
                    <div>
                        <div>
                            <h5 className="text-uppercase text-muted mb-0 card-title">    <i className="ni ni-email-83 mr-1 mb-0"></i> {getStatusFromCode(dashboardDetails, ticket_status)} </h5>
                            <h5 className='text-muted mb-0'>{getDataAndTime(created_at)}</h5>
                        </div>
                        <div className='mt-2' >
                            <small className='text-muted mb-0 text-sm'> {translate('common.assignedBy')}  </small>
                            <p className='h4'> {assigned_to?.name} </p>
                        </div>
                    </div>
                </div>

               

                {divider && <Divider />}
            </div>
        </div>

    )
}
export { CompanyIssueItem }