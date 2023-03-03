/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react'
import { CompanyItemProps } from './interfaces'
import { H, Image, Badge, Divider } from '@Components'
import { getPhoto } from '@Utils'
import { translate } from '@I18n'


function CompanyItem({ item , showDivider}: CompanyItemProps) {

    const { display_name, attachment_logo, address, phone, email } = item
   
    return (

        <div className='row d-flex justify-content-center'>
            <div className='col col-sm-9'>
                <div className='row'>
                    <div className='col-auto'>
                        <Image variant={'rounded'} size={'xxl'} src={getPhoto(attachment_logo)} />
                    </div>
                    <div className='col-sm'>
                        <H tag={'h3'} className='mb-0' text={display_name} />
                        <p className='text-sm'>{address}</p>

                        <div className='row d-flex justify-content-between'>
                            <div className='col-9'>
                                <h6 className="text-uppercase text-muted mb-0"> {translate('common.phone')} </h6>
                                <h5>{phone}</h5>
                            </div>
                            <div className='col text-right'>
                                <Badge pill color={'info'} text={'Call'} />
                            </div>
                        </div>

                        <div className='row d-flex justify-content-between'>
                            <div className='col-9'>
                                <h6 className="text-uppercase text-muted mb-0"> {translate('common.email')} </h6>
                                <h5>{email}</h5>
                            </div>
                            <div className='col text-right'>
                                <Badge pill color={'success'} text={'Email'} />
                            </div>
                        </div>

                    </div>
                </div>
               { showDivider &&  <Divider />}
            </div>
        </div>


    )
}

export { CompanyItem }