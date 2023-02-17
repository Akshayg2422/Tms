import React from 'react'
import { TicketItemProps } from './interfaces'
import { H, Image, Badge } from '@Components'
import { useDispatch } from 'react-redux'
import { setSelectedIssues } from '@Redux'
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes';
import { getPhoto } from '@Utils'
import { getStatusFromCode,handleEmailClick } from '@Utils'
import { useSelector } from 'react-redux'
import moment from 'moment'


function TicketItem({ item }: TicketItemProps) {
    const { dashboardDetails } = useSelector((state: any) => state.AdminReducer)
    const { title, by_user, raised_by_company, ticket_status, created_at, assigned_to } = item
    const { goTo } = useNavigation()
    const dispatch = useDispatch()

    return (

       
        <div className='row d-flex justify-content-center' onClick={() => {
            dispatch(setSelectedIssues(item))
            goTo(ROUTES.AUTH.ISSUE_DETAILS)
        }}>

            <div className='col-lg-5 col-md-7 col-sm-0 col-7' >
                <div className=''>
                    <H tag={'h3'} className='text-capitalize pl-1' text={title} />
                    <div className='h4 pl-1'>  <i className="bi bi-person-circle "></i>  {by_user.name} </div>
                   <div className=''>
                    <span className='mr-2'>  <Badge pill color={'primary'} className=' h4 text-uppercase text-muted ' style={{ cursor: "pointer" }} text={'Phone'} /> </span>
                    <span className=''> <Badge pill color={'success'} className='h4 text-uppercase text-muted ' style={{ cursor: "pointer" }} onClick={() => {(handleEmailClick(by_user.email))}} text={'Email'} /></span>
                   </div>

                </div>
                <div className='mt-4'>
                    <h2 className="h3 text-uppercase">{raised_by_company.display_name}</h2>
                    <h5 className='h5 font-weight-normal'>{raised_by_company.address}</h5>

                    <div className='m-0'>
                        <span className='mr-2'>  <Badge pill color={'primary'} className=' h4 text-uppercase text-muted ' style={{ cursor: "pointer" }} text={'Phone'} /> </span>
                        <span className=''> <Badge pill color={'success'} className='h4 text-uppercase text-muted ' style={{ cursor: "pointer" }} onClick={() => {(handleEmailClick(by_user.email))}} text={'Email'} /></span>
                    </div>
                </div>

            </div>
            <div className='col-lg-3 col-md-5 col-sm-0 col-5' >
                <div className='mt-4'>
                    <span className='py-2'><i className="bi bi-calendar-week"></i> {getStatusFromCode(dashboardDetails, ticket_status)} </span>
                    <h5 className=' text-muted py-1  m-0'>{moment(created_at).format('DD-MM-YYYY HH:mm A')}</h5>
                   <div className='row m-0'>
                     <small className='text-muted  m-0 text-sm'> assigned by </small>
                    <p className='h4  m-0 pl-2'> {assigned_to?.name} </p>
                    </div>
                </div>

                <div className='mt-3'>
                    <Image src={getPhoto(raised_by_company.attachment_logo)} variant={'rounded'} size={'xxl'} />
                </div>
            </div>
        </div>
    )
}

export { TicketItem }