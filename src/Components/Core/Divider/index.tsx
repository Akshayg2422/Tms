import React from 'react'
import { DividerProps } from './interfaces'

function Divider({ space = '5', ClassName }: DividerProps) {
    return (
        <hr className={`my-${space} ${ClassName}`}></hr>
    )
}
export { Divider }