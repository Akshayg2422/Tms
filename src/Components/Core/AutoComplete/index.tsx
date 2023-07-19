import React from 'react'
import Select2 from "react-select2-wrapper";
import { AutoCompleteProps } from './interfaces'
import { Form, FormGroup } from 'reactstrap'
import { Option, InputHeading } from '@Components'

function AutoComplete({ variant = 'default', data, id, heading, selected, className, onChange, inputType, placeHolder }: AutoCompleteProps) {

    const formatOption = (option: any) => {
        console.log(option, "oooooooooooo")


        let others = {} as any
        if (option?.title) {
            others = JSON.parse(option.title);
        }



        return $(`<div class="col">
        <div class="row ">
        <image class="${'avatar avatar-sm rounded-circle'}"  src="${others?.image}" alt="Option Image"   />
        <div class="ml-2">
        <span class="h5 mb--1">${option.text}</span>
        <div class="col">
        <div class="row">
        <small class="text-muted text-md">${others.department}</small>
        <small class="text-muted text-md mx-1">|</small>
        <small class="text-muted text-md">${others.designation}</small>
        </div>
       </div>
        </div>
        </div>
        </div>`);
    };

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
        <Form className='mb-3'>
            <InputHeading heading={heading} id={id} />
            <Select2
                key={Math.random() + ""}
                data={data}
                data-minimum-results-for-search={inputType}
                className={className}
                value={selected && selected.id}
                options={{
                    placeholder: placeHolder,
                    templateResult: variant !== 'custom' ? undefined : formatOption,
                }}
                onChange={proceedOnChange}

            />
        </Form>
    )

}

export { AutoComplete }