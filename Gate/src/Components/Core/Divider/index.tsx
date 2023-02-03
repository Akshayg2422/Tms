import React from 'react'
import { DividerProps } from './interfaces'

function Divider({ space = '4',opacity,hidden,space1,border,space3}: DividerProps) {
    return (
        <hr className={`my-${space} mt-${space1} mx-sm-${space3} ${hidden}`} style={{opacity:`${opacity}`,
    borderWidth:`${border}`}}></hr>
    )
}
export { Divider }