import React, { useState } from 'react'
import { DropDownProps } from './interfaces'
import Select2 from 'react-select2-wrapper';
import { Option, InputHeading } from '@Components'
import { FormGroup } from 'reactstrap'

function DropDown({ id, heading, defaultValue, disabled, value, placeHolder, data, onChange }: DropDownProps) {

    const [selected, setSelected] = useState<Option | undefined>(value);

    function proceedOnChange(e: any) {
        const selectedId = e.target.value

        if (onChange) {

            const selectedItemById = data?.find((option: Option) => {
                return option.id === selectedId
            })

            if (selectedItemById) {
                onChange(selectedItemById)
                setSelected(selectedItemById)
            }

        }

    }

    return (
        <FormGroup>
            <InputHeading heading={heading} id={id} />
            <Select2
                className={'form-control'}
                data-minimum-results-for-search={'Infinity'}
                data={data}
                value={selected && selected.id}
                options={
                    {
                        placeholder: placeHolder,
                        disabled: disabled
                    }
                }
                onChange={proceedOnChange}
            />
        </FormGroup>
    )
}

export { DropDown }