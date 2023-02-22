import React, { useState } from 'react'
import { MultiSelectProps } from './interfaces'
import { Multiselect } from 'multiselect-react-dropdown';

const MultiSelectDropDown = ({
    options,
    onSelect,
    onRemove,
    selectedValues,
    displayValue,
    singleSelect,
    disable,
    showArrow,
    avoidHighlightFirstOption,
    showCheckbox,
    placeholder,
    style,
}: MultiSelectProps) => {

    const [selectedOptions, setSelectedOptions] = useState([])

    const handleSelect = (selectedOptions: any) => {
        setSelectedOptions(selectedOptions)
        onSelect(selectedOptions)
    }

    const handleRemove = (selectedOptions: any) => {
        setSelectedOptions(selectedOptions)
        onRemove(selectedOptions)
    }

    const styles = {

        searchBox: {
            borderColor: '#dee2e6',
        },
        inputField: {
            margin: '5px',
            border: 'dee2e6',
        },
        optionContainer: {
            borderColor: '#dee2e6',
        },
        option: {
            backgroundColor: '#fff',
            color: '#333',
            fontSize: '14px',
        },
        chips: {
            background: '#fcc9e0',
            color: 'white'
        },
    };

    return (
        <Multiselect
            style={styles}
            options={options}
            selectedValues={selectedOptions}
            onSelect={handleSelect}
            onRemove={handleRemove}
            displayValue={displayValue}
            avoidHighlightFirstOption={true}
        />
    )
}

export { MultiSelectDropDown } 