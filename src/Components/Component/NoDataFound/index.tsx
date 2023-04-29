import React from 'react'
import { NoDataFoundProps } from './interfaces'
import { Image, Button } from '@Components'
import { icons } from '@Assets'

function NoDataFound({ text = 'No Data Found', type = 'action', buttonText ,onClick}: NoDataFoundProps) {
    return (
        <>
            {type === 'text' && <div className="text-muted text-center" >{text}</div>}
            {type === 'action' &&
                <div className='d-flex justify-content-center align-items-center'>
                    <div>
                        <div className='text-center'>
                            <p className='mb-1'><u>{text}</u></p>
                            <Button size={'sm'} text={buttonText} onClick={onClick}/>
                        </div>
                    </div >

                </div>

            }
        </>
    );
}

export { NoDataFound }