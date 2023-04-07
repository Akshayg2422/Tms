import React, { useState } from 'react'
import { DropDownProps } from './interfaces'
import Select2 from 'react-select2-wrapper';
import { Option, InputHeading } from '@Components'
import { FormGroup } from 'reactstrap'
import { icons } from '@Assets'


function DropDown({ id, heading, defaultValue, disabled, value, placeHolder, selected, data, onChange, className = 'form-control' }: DropDownProps) {

    // const [selected, setSelected] = useState<Option | undefined>(value);


    function proceedOnChange(e: any) {
        const selectedId = e.target.value
        if (onChange) {
            const selectedItemById = data?.find((option: Option) => {
                return option.id == selectedId
            })
            if (selectedItemById) {
                onChange(selectedItemById)
                // setSelected(selectedItemById)
            }
        }

    }

    const colourStylesRow = {
        dropdownIndicator: styles => ({
            ...styles,
            color: '#FFAE12',
        }),
        option: (styles, { data }) => {
            return {
                ...styles,
                backgroundColor: data.color
            };
        }
    };

    const IconOption = (props: any) => {
        return (
            <div {...props.innerProps}>
                <span>{props.data.icon}</span>
                <span>{props.children}</span>
            </div>
        );
    };

    return (
        <FormGroup>
            <InputHeading heading={heading} id={id} />
            <Select2
                className={className}
                data-minimum-results-for-search={'Infinity'}
                data={data}
                value={selected && selected.id}
                options={
                    {
                        placeholder: placeHolder,
                        disabled: disabled,
                        allowArrow: true,
                        formatOptionLabel: ({ text }) => (
                            <div>
                                {icons}
                                {text}
                            </div>
                        ),
                        components: {
                            Option: IconOption
                        },
                    }}
                onChange={proceedOnChange}
            >
            </Select2>
        </FormGroup>
    )
}

export { DropDown }

