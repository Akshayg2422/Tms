import React from 'react'
import { DateTimePickerProps } from './interfaces';
import ReactDatetime from "react-datetime";
import { FormGroup } from 'reactstrap';
import { InputHeading } from '@Components'
import { Moment, isMoment } from 'moment'

function DateTimePicker({ id, heading, placeholder, type = 'date', onChange, ...rest }: DateTimePickerProps) {
    return (
        <FormGroup>
            {heading && <InputHeading id={id} heading={heading} />}

            <ReactDatetime
                {...rest}

                inputProps={
                    {
                        placeholder: placeholder
                    }
                }
                timeFormat={type !== 'date' && true}
                dateFormat={type !== 'time' && true}
                onChange={
                    (date: Moment | string) => {
                        if (onChange) {
                            if (isMoment(date)) {
                                onChange(date.format().toString())
                            }
                            else {
                                onChange(date)
                            }
                        }
                    }
                }
            />
        </FormGroup >
    )
}

export { DateTimePicker };
export type { DateTimePickerProps };