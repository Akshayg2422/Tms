
import { DateTimePickerProps } from './interfaces';
import ReactDatetime from "react-datetime";
import { FormGroup } from 'reactstrap';
import { InputHeading } from '@Components'
import { Moment, isMoment } from 'moment'
import { log } from 'console';
import { useEffect, useState } from 'react';


function DateTimePicker({ id, heading, placeholder, type = 'both', format = "", onChange, ...rest }: DateTimePickerProps) {


    const [viewMode, setViewMode] = useState<any>('days')

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
                dateFormat={type !== 'time' && 'DD MMM YYYY'}
                timeFormat={type !== 'date' && 'hh:mm A'}

                // onNavigate={(viewMode) => {
                //     console.log(viewMode);
                // }}
                onChange={
                    (date: Moment | string) => {
                        setViewMode('time')
                        if (onChange) {
                            if (isMoment(date)) {
                                onChange(date.format(format).toString())
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