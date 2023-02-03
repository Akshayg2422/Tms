import React, { forwardRef } from 'react'
import { InputHeadingProps } from './interfaces'
const InputHeading = forwardRef(({ heading, id,color ,Class}: InputHeadingProps, ref) => {
    return (
        <>
            {heading && <label htmlFor={id} className={`form-control-label ${Class} ${color}`}>{heading}</label>}
        </>
    )
})

export { InputHeading }
export type { InputHeadingProps }
