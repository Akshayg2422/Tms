import React from 'react'
import { Badge, Card } from '@Components'
import { UserItemProps } from './interface'
function  UserItem({ item }: UserItemProps) {
     const { name, phone, email } = item

    return (
        <>
            <div className='row justify-content-center m-0'>
            <div className='col-lg-12 col-md-12 col-sm-7'>
                 <h3 className='text-uppercase'> {name} </h3>
                <div className='row d-flex justify-content-between'>
                    <div className='col'>
                    <h6 className='text-uppercase text-muted mb-0'>PHONE</h6>
                    <h5>{phone}</h5>
                    </div>
                    <div className=''>
                    <Badge pill color={'primary'} text={'Call'} />
                    </div>
                </div>
                <div className=' row d-flex justify-content-between'>
                <div className='col'>
                    <h6 className='text-uppercase text-muted mb-0'>Email</h6>
                    <h5>{email}</h5>
                    </div>
                    <div className=''>
                    <Badge pill color={'success'} text={'Email'} />
                    </div>
                </div>
            </div>
            </div>

        </>


    )
}

export { UserItem }