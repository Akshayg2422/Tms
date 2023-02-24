/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react'
import { CompanyItemProps } from './interfaces'
import { H, Image, Badge } from '@Components'
import { icons } from '@Assets'
import { getPhoto } from '@Utils'


function CompanyItem({ item }: CompanyItemProps) {

    const { display_name, attachment_logo, address, phone, email } = item
    console.log(item,'iiiiiiiiiiiiiittttttttttttcccccccccccc')

    return (

        <div className=' row d-flex justify-content-center'>
            <div className='col col-sm-8'>


                <div className='row'>
                    <div className='col-auto'>
                        <Image variant={'rounded'} size={'xxl'} src={getPhoto(attachment_logo)} />
                    </div>
                    <div className='col-sm'>
                        <H tag={'h3'} className='mb-0' text={display_name} />
                        <p className='text-sm'>{address}</p>

                        <div className='row d-flex justify-content-between '>
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
            </div>
        </div>


    )
}

export { CompanyItem }