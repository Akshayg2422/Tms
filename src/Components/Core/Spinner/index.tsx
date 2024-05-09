import React from 'react'
import { SpinnerProps } from './interfaces'
import { Spinner as RsSpinner } from 'reactstrap'

function Spinner({ color = 'black' }: SpinnerProps) {
    return (
        <div className='d-flex col justify-content-center align-items-center'>
            <RsSpinner color={color} size={'sm'} >
                Loading...
            </RsSpinner>
        </div>
    )
}

export { Spinner }