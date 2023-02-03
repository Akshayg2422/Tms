import React from 'react'
import { CompanyItemProps } from './interfaces'
import { H, Image, Badge } from '@Components'
import { icons } from '@Assets'

function CompanyItem({ item }: CompanyItemProps) {

    const { display_name, logo, address, phone , email} = item

    console.log(logo + '=====');

    return (

        <div className='row d-flex justify-content-center'>
            <div className='col col-sm-8'>


                <div className='row'>
                    <div className='col-auto'>
                        <Image variant={'rounded'} size={'xxl'} src={'https://picsum.photos/200/300'} />
                    </div>
                    <div className='col-sm'>
                        <H tag={'h3'} className='mb-0' text={display_name} />
                        <p className='text-sm'>{address}</p>

                        <div className='row d-flex justify-content-between'>
                            <div className='col'>
                                <h6 className="text-uppercase text-muted mb-0">PHONE</h6>
                                <h5>{phone}</h5>
                            </div>
                            <div className='text-center'>
                                <Badge pill color={'primary'} text={'Call'} />
                            </div>
                        </div>


                        <div className='row d-flex justify-content-between'>
                            <div className='col'>
                                <h6 className="text-uppercase text-muted mb-0">E-MAIL</h6>
                                <h5>{email}</h5>
                            </div>
                            <div className='text-center'>
                                <Badge pill color={'success'} text={'Email'} />
                            </div>
                        </div>


                    </div>
                </div>

                {/*
                 <H tag={'h3'} text={display_name} /> */}
                {/* <div>
                    <h6 className="text-uppercase text-muted mb-0">RAISED BY</h6>
                    <h2 className="h3">{by_user.name}</h2>
                </div>
                <div className='row d-flex justify-content-between'>
                    <div className='col'>
                        <h6 className="text-uppercase text-muted mb-0">PHONE</h6>
                        <h5>{by_user.phone}</h5>
                    </div>

                    <div className='col'>
                        <h6 className="text-uppercase text-muted mb-0">E-MAIL</h6>
                        <h5>{by_user.email}</h5>
                    </div>

                </div>
                <div>
                    <h6 className="text-uppercase text-muted mb-0 mt-2">Company Details</h6>
                    <h2 className="h3">{raised_by_company.display_name}</h2>
                </div>

                <div className='row d-flex justify-content-between'>
                    <div className='col'>
                        <h6 className="text-uppercase text-muted mb-0">PHONE</h6>
                        <h5>{raised_by_company.phone}</h5>
                    </div>

                    <div className='col'>
                        <h6 className="text-uppercase text-muted mb-0">E-MAIL</h6>
                        <h5>{raised_by_company.email}</h5>
                    </div>

                </div>

                <div className='col mt-2 ml--1'>
                    <div className='row justify-content-start align-items-center'>
                        <Image src={icons.location} height={22} width={22} />
                        <h6 className="text-uppercase text-muted mb-0">{raised_by_company.sector}</h6>
                    </div>                    
                </div>

                <div className='row col-sm-8'>
                    <h6 className='heading-6'>{raised_by_company.address}</h6>
                </div> */}
            </div>
        </div>

    )
}

export { CompanyItem }