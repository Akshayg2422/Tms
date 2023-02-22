import React, { useState } from 'react'
import { MultiSelectProps } from './interfaces'
import { Multiselect } from 'multiselect-react-dropdown';
import { FormGroup } from 'reactstrap';
import { InputHeading } from '@Components';


const MultiSelectDropDown = ({ options, onSelect, onRemove, selectedValues, displayValue, singleSelect, disable, showArrow, avoidHighlightFirstOption, showCheckbox, placeholder, style,heading,id }: MultiSelectProps) => {

    const [selectedOptions, setSelectedOptions] = useState(selectedValues)

    const handleSelect = (selectedOptions: any) => {
        setSelectedOptions(selectedOptions)
        onSelect(selectedOptions)
    }

    const handleRemove = (selectedOptions: any) => {
        setSelectedOptions(selectedOptions)
        onRemove(selectedOptions)
    }

    return (
        <FormGroup>
            <InputHeading heading={heading} id={id} />
        <Multiselect
            options={options}
            selectedValues={selectedOptions}
            onSelect={handleSelect}
            onRemove={handleRemove}
            displayValue={displayValue}
            singleSelect={singleSelect}
        />
        </FormGroup>
    )
}

export { MultiSelectDropDown } 