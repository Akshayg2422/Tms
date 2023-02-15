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
    const { title, by_user, raised_by_company, ticket_status, created_at } = item
    const { goTo } = useNavigation()
    const dispatch = useDispatch()
    return (

        <div className='row d-flex justify-content-center' onClick={() => {
            dispatch(setSelectedIssues(item))
            goTo(ROUTES.AUTH.ISSUE_DETAILS)
        }}>

            <div className='col-lg-8 col-md-12 col-sm-12'>
                <div className='my-2'>
                    <H tag={'h3'} className='text-capitalize pl-1' text={title} />
                    <div className='row'>
                        <span className='col-lg-8 col-md-8 col-sm-0  col-6 '>  <h4 className=""> <span className='mr-1 ml-1'> <i className="bi bi-person-circle "></i> </span> <span> {by_user.name} </span></h4> </span>
                        <span className='col-lg-4  col-md-4 col-sm-0 col-6 ml--1'> <h4 className="  "> <span className='mr-1'><i className="bi bi-calendar-week"></i> </span> <span className=' '> {getStatusFromCode(dashboardDetails, ticket_status)} </span> </h4> </span>
                    </div>
                    <div className='row'>
                        <div className='col-lg-8 col-md-8 col-sm-0  col-6  row '>
                            <span className='col-lg-4 col-md-4 col-sm-0 col-6'>  <h4 className="text-uppercase text-muted"><Badge pill color={'primary'} text={'Phone'} /></h4> </span>
                            <span className='col-lg-4 col-md-4 col-sm-0 col-6'> <h4 className="text-uppercase text-muted"><Badge pill color={'success'} text={'Email'} onClick={() => {(handleEmailClick(by_user.email))}} /></h4> </span>
                        </div>

                        <div className='col-lg-4 col-md-4 col-sm-0  col-6 '>
                            <h5 className=' text-muted pl-4 '>{moment(created_at).format('DD-MM-YYYY HH:mm')}</h5>
                        </div>

                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-lg-8 col-md-8 col-sm-0 col-6'>
                        <div>
                            <h2 className="h3">{raised_by_company.display_name}</h2>
                        </div>

                        <div className='col'>
                            <div className='row justify-content-start align-items-center'>
                                <h5 className="text-uppercase text-muted mb-0 ">{raised_by_company.sector}</h5>
                            </div>
                        </div>

                        <div className='row col-sm-12'>
                            <h5 className='h5 font-weight-normal mb-0'>{raised_by_company.address}</h5>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-0 col-6 row justify-content-start m-0 pr-lg-4 pr-sm-0    '>
                        <Image src={getPhoto(raised_by_company.attachment_logo)} variant={'rounded'} size={'xxl'} />
                    </div>
                </div>
                <div className='row mt-lg--3'>
                    <span className='col-lg-2 col-md-2 col-sm-0 col-2'>  <h4 className="text-uppercase text-muted"><Badge pill color={'primary'} text={'Phone'} /></h4> </span>

                    <span className='col-lg-3 col-md-4 ml-lg-4 ml-md-3 ml-sm-0 ml-3  col-sm-0 col-4 '> <h4 className="text-uppercase text-muted"><Badge pill color={'success'} text={'Email'} /></h4> </span>
                </div>

            </div>
        </div>

    )
}

export { TicketItem }