import React, { useState } from 'react'
import { CheckboxProps } from './interfaces'
import { FormGroup } from 'reactstrap'

function Checkbox({ id, text, defaultChecked, variant = 'primary', onCheckChange,checked, ...rest }: CheckboxProps) {


    // function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    //     console.log('hggik',e);
        
    //     if (onCheckChange) {
    //         const checkStatus = e.target.checked
    //         setChecked(checkStatus)
    //         onCheckChange(checkStatus)
    //     }
    // }

    return (
        <FormGroup>
            <div className={`custom-control custom-checkbox custom-checkbox-${variant} mb-3`}>
                <input
                    {...rest}
                    id={id}
                    checked={checked}
                    className={'custom-control-input'}
                    type={'checkbox'}
                    onChange={onCheckChange}
                />
                <label
                    className={'custom-control-label'}
                    htmlFor={id}>
                    {
                        text
                    }
                </label>
            </div>
        </FormGroup >
    )
}

export { Checkbox };
export type { CheckboxProps };