import React, { useEffect, useState } from 'react'
import { DropDownProps } from './interfaces'
import Select2 from 'react-select2-wrapper';
import { Option, InputHeading } from '@Components'
import { FormGroup } from 'reactstrap'

function DropDown({ id, heading, disabled, placeHolder, selected, data, onChange, className = 'form-control' }: DropDownProps) {




    function proceedOnChange(e: any) {
       

        const selectedId = e.target.value
        if (onChange) {
            const selectedItemById = data?.find((option: Option) => {
                return option.id == selectedId
            })
            if (selectedItemById) {
                onChange(selectedItemById)
            }
        }

    }


    return (
        <FormGroup >
            <InputHeading heading={heading} id={id} />
            <Select2
                key={Math.random() + ""}
                // style={{ height: 10, width: 10, borderRadius: 5, margin: "5px", background: 'green' }}
                className={className}
                data-minimum-results-for-search={'Infinity'}
                data={data}
                value={selected && selected.id}
                options={
                    {
                        placeholder: placeHolder,
                        disabled: disabled,
                        allowArrow: true,
                    }
                }
                onChange={proceedOnChange}
            >
            </Select2>
        </FormGroup >
    )
}

export { DropDown }