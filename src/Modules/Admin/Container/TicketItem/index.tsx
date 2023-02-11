import React from 'react'
import { TicketItemProps } from './interfaces'
import { H, Image, Badge } from '@Components'
import { icons } from '@Assets'
import { useDispatch } from 'react-redux'
import { setSelectedIssues } from '@Redux'
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes';
import { getPhoto } from '@Utils'
import { getStatusFromCode } from '@Utils'
import { useSelector } from 'react-redux'


function TicketItem({ item }: TicketItemProps) {
    const { dashboardDetails } = useSelector((state: any) => state.AdminReducer)
    const { title, by_user, raised_by_company, ticket_status } = item
    const { goTo } = useNavigation()
    const dispatch = useDispatch()

    return (

        <div className='row d-flex justify-content-center' onClick={() => {
            dispatch(setSelectedIssues(item))
            goTo(ROUTES.AUTH.ISSUE_DETAILS)
        }}>
            <div className='col col-sm-8'>
                <H tag={'h3'} className='text-capitalize' text={title} />
                <div className='row d-flex justify-content-between m-0'>
                    <h3 className="h4"> <span className='mr-1 ml-1'> <i className="bi bi-person-circle "></i> </span> <span> {by_user.name} </span></h3>
                    <h3 className="h4 mr-3 "> <span className='mr-1'><i className="bi bi-calendar-week"></i> </span> <span> {getStatusFromCode(dashboardDetails, ticket_status)} </span> </h3>
                </div>
                <div className='row d-flex  justify-content-between'>
                    <div className='col-lg-2 col-sm-0 col-3'>
                        <h4 className="text-uppercase text-muted"><Badge pill color={'primary'} text={'Phone'} /></h4>
                    </div>

                    <div className='col'>
                        <h4 className="text-uppercase text-muted"><Badge pill color={'success'} text={'Email'} /></h4>
                    </div>

                </div>
                <div className='row'>
                    <div className='col-9 pb-0 '>
                        <div>
                            <h2 className="h3">{raised_by_company.display_name}</h2>
                        </div>

                        <div className='col'>
                            <div className='row justify-content-start align-items-center'>
                                <h5 className="text-uppercase text-muted mb-0 ">{raised_by_company.sector}</h5>
                            </div>
                        </div>

                        <div className='row col-sm-8'>
                            <h5 className='h5 font-weight-normal'>{raised_by_company.address}</h5>
                        </div>
                    </div>
                    <span className='col-3 row justify-content-end m-0'>
                        <Image src={getPhoto(raised_by_company.attachment_logo)} variant={'rounded'} size={'xxl'} />
                    </span>
                </div>
                <div className='row d-flex justify-content-between mt--0'>
                    <div className='col-lg-2 col-sm-0 col-3 mb-0'>
                        <h4 className="text-uppercase text-muted "><Badge pill color={'primary'} text={'Phone'} /></h4>
                    </div>

                    <div className='col mb-0'>
                        <h4 className="text-uppercase text-muted"><Badge pill color={'success'} text={'Email'} /></h4>
                    </div>
                </div>

            </div>
        </div>

    )
}

export { TicketItem }