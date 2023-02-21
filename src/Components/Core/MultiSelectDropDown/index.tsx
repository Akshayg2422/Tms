import React, { useState } from 'react'
import { MultiSelectProps } from './interfaces'
import { Multiselect } from 'multiselect-react-dropdown';


const MultiSelectDropDown = ({ options, onSelect, onRemove, selectedValues, displayValue, singleSelect, disable, showArrow, avoidHighlightFirstOption, showCheckbox, placeholder, style, }: MultiSelectProps) => {

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
        <Multiselect
            className=''
            options={options}
            selectedValues={selectedOptions}
            onSelect={handleSelect}
            onRemove={handleRemove}
            displayValue={displayValue}
            singleSelect={singleSelect}
        />
    )
}

export { MultiSelectDropDown } 