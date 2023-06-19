
import { TextInputProps } from './interfaces'
import {  FormGroup } from 'reactstrap'
import { InputHeading } from '@Components'
import { placeholder } from 'i18n-js'

function TextAreaInput({id,heading,value,onChange,className="form-control form-control-sm" ,placeholder}:TextInputProps)  {
    return (
        <FormGroup>
            <InputHeading heading={heading} id={id} />
            <textarea 
            style={{height:'140px'}}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}

        />
        </FormGroup>
    )
}

export {TextAreaInput}


   