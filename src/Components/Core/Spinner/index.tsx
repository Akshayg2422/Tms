import React from 'react'
import { SpinnerProps } from './interfaces'
import { Spinner as RsSpinner } from 'reactstrap'

function Spinner({ color = 'primary' }: SpinnerProps) {
    return (
        <div className='d-flex h-100 w-100 align-items-center justify-content-center' style={{ zIndex: 1 }}>
            <RsSpinner color={color}>
                Loading...
            </RsSpinner>
        </div>
    )
}

export { Spinner }