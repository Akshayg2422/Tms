import React from 'react'
import { TicketItemProps } from './interfaces'
import { H,P, Image, Badge } from '@Components'
import { icons } from '@Assets'

function TicketItem({ item }: TicketItemProps) {

    const { title, by_user, raised_by_company, ticket_status
    } = item
    return (

        <div className='row d-flex justify-content-center'>
            <div className='col col-sm-8'>
                <H tag={'h3'} text={title} />
                <div className='row d-flex justify-content-between m-0'>
                    <h3 className="h4"> <span className='mr-1'> <i className="bi bi-person-circle "></i> </span> <span> {by_user.name} </span></h3>
                    <h3 className="h4 mr-3"> <span className='mr-1'><i className="bi bi-calendar-week"></i> </span> <span> Raised </span> </h3>
                </div>
                <div className='row d-flex  justify-content-between '>
                    <div className='col-2'>
                        <h4 className="text-uppercase text-muted "><Badge pill color={'primary'} text={'Phone'} /></h4>
                    </div>

                    <div className='col'>
                        <h4 className="text-uppercase text-muted "><Badge pill color={'success'} text={'Email'} /></h4>
                    </div>

                </div>
                <div className='row'>
                    <div className='col-9'>
                        <div>
                            <h2 className="h3">{raised_by_company.display_name}</h2>
                        </div>

                        <div className='col mt-2'>
                            <div className='row justify-content-start align-items-center'>
                                <h5 className="text-uppercase text-muted mb-0">{raised_by_company.sector}</h5>
                            </div>
                        </div>

                        <div className='row col-sm-8'>
                            <h6 className='heading-6'>{raised_by_company.address}</h6>
                        </div>
                    </div>
                    <span className='col-3 row justify-content-end m-0'>
                         <Image src={raised_by_company.logo} variant={'rounded'} size={'xxl'}/>
                    </span>
                </div>
                <div className='row d-flex justify-content-between mt--2'>
                            <div className='col-2'>
                                <h4 className="text-uppercase text-muted "><Badge pill color={'primary'} text={'Phone'} /></h4>
                            </div>

                            <div className='col'>
                                <h4 className="text-uppercase text-muted"><Badge pill color={'success'} text={'Email'} /></h4>
                            </div>
                        </div>

            </div>
        </div>

    )
}

export { TicketItem }