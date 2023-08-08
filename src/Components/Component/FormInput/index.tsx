import { Input } from '@Components'
import React from 'react'
import { Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import{FormInputProps}from './interfaces'

function FormInput({placeholder,type,icons}:FormInputProps) {
    return (
        <div>
<Form>
            <FormGroup>

                <InputGroup className="input-group-merge input-group-alternative" >
                    <InputGroupAddon addonType="prepend" style={{  borderRight:'0px'}}>
                        <InputGroupText className='form-control-sm' style={{
                            backgroundColor: '#1f2251',
                            // border: '1px solid white',
                            borderRight:'0px',
                            borderTop:'1px solid white'
                          }}
                          >
                            <i className={icons} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        placeholder={placeholder}
                        type={type}
                        size={'sm'}
                        style={{
                            backgroundColor: '#1f2251',
                            // border: '1px solid white',
                            borderTop:'1px solid white',
                            borderLeft:'0px'
                          }}
                    // onFocus={() => setFocusedEmail(true)}
                    // onBlur={() => setFocusedEmail(false)}
                    />
                </InputGroup>
            </FormGroup>
            </Form>
        </div>
    )
}

export { FormInput }