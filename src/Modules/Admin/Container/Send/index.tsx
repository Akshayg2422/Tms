import React, { useEffect } from 'react'
import { Input } from '@Components'
import { SendProps } from './interfaces'

function Send({ onClick, value, onChange }: SendProps) {
    return (
        <div className='row fixed-bottom'>
            <div className='col-lg-3'></div>
            <div className='col-lg-7 col-sm-0 col-auto'>
                <Input className={'rounded-pill bg-gradient-white'} type='text' value={value} placeholder={'Type Here'} onChange={onChange} />
            </div>
            <div className={'col mb-4'}>
                <div className={'icon icon-shape bg-gradient-info text-white rounded-circle shadow'} onClick={onClick}><i className="ni ni-send"></i></div>
            </div>
        </div>
    )
}

export { Send }