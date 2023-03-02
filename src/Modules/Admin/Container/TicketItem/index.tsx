import React from 'react'
import { TicketItemProps } from './interfaces'
import { H, Image, Badge, Divider } from '@Components'
import { useDispatch } from 'react-redux'
import { setSelectedIssues } from '@Redux'
import { useNavigation } from '@Hooks'
import { TAB_ISSUE_ATTACH_DETAILS, HOME_PATH, ROUTES } from '@Routes';
import { getPhoto } from '@Utils'
import { getStatusFromCode, handleEmailClick } from '@Utils'
import { useSelector } from 'react-redux'
import moment from 'moment'


function TicketItem({ item, divider }: TicketItemProps) {
    const { dashboardDetails } = useSelector((state: any) => state.AdminReducer)
    const { title, by_user, raised_by_company, ticket_status, created_at, assigned_to } = item
    const { goTo } = useNavigation()
    const dispatch = useDispatch()

    return (

        <div className='row d-flex justify-content-center' onClick={() => {
            dispatch(setSelectedIssues(item))
            goTo(HOME_PATH.DASHBOARD + HOME_PATH.ISSUE_DETAILS)
        }}>

            <div className='col col-sm-9'>

                <div className='d-flex justify-content-between'>
                    <div>
                        <H tag={'h3'} className='text-capitalize' text={title} />
                        <div>
                            <div className='h4 pl-1'><i className="bi bi-person-circle  mr-1"></i>{by_user.name}</div>
                            <div>
                                <span className='mr-2'><Badge pill color={'info'} className='h4 text-uppercase text-muted pointer' text={'PHONE'} /> </span>
                                <Badge pill color={'success'} className='h4 text-uppercase text-muted pointer' onClick={() => { (handleEmailClick(by_user.email)) }} text={'Email'} />
                            </div>
                        </div>
                     
                    </div>
                    <div>
                        <div>
                            <h5 className="text-uppercase text-muted mb-0 card-title">    <i className="ni ni-email-83 mr-1 mb-0"></i> {getStatusFromCode(dashboardDetails, ticket_status)} </h5>
                            <h5 className='text-muted mb-0'>{moment(created_at).format('MMMM Do YYYY, h:mm a')}</h5>
                        </div>
                        <div className='mt-2' >
                            <small className='text-muted mb-0 text-sm'> Assigned by </small>
                            <p className='h4'> {assigned_to?.name} </p>
                        </div>
                    </div>
                </div>

                <div className='d-flex justify-content-between mt-4'>
                    <div>
                        <div>
                            <h2 className="h3 text-uppercase mb-0">{raised_by_company.display_name}</h2>
                            <h5 className='h5 font-weight-normal'>{raised_by_company.address}</h5>
                        </div>
                        <div className='m-0 mt-2'>
                            <span className='mr-2'>  <Badge pill color={'info'} className=' h4 text-uppercase text-muted pointer' text={'Phone'} /> </span>
                            <span className=''> <Badge pill color={'success'} className='h4 text-uppercase text-muted pointer' onClick={() => { (handleEmailClick(by_user.email)) }} text={'Email'} /></span>
                        </div>
                    </div>
                    <div>
                        <Image src={getPhoto(raised_by_company.attachment_logo)} variant={'rounded'} size={'xxl'} />
                    </div>
                </div>

                {divider && <Divider />}
            </div>
        </div>
    )
}

export { TicketItem }