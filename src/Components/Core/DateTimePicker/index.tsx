import React, { useState } from 'react';
import { DateTimePickerProps } from './interfaces';
import Datetime from 'react-datetime';
import { FormGroup } from 'reactstrap';
import { InputHeading } from '@Components'
import { Moment, isMoment } from 'moment'
import "react-datetime/css/react-datetime.css";

function DateTimePicker({ id, heading, placeholder, type = 'date', format = "", onChange, ...rest }: DateTimePickerProps) {
    const [selectedDate, setSelectedDate] = useState<Moment | string | null>(null);
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

    const handleDateChange = (date: Moment | string) => {
        setSelectedDate(date);
        setShowTimePicker(type !== 'date');
        if (onChange) {
            if (isMoment(date)) {
                onChange(date.format(format).toString())
            } else {
                onChange(date)
            }
        }
    }

    const handleTimeChange = (time: Moment | string) => {
        if (onChange) {
            if (isMoment(selectedDate) && isMoment(time)) {
                const dateTime = selectedDate.clone().set({
                    hours: time.hours(),
                    minutes: time.minutes(),
                    seconds: time.seconds(),
                });
                onChange(dateTime.format(format).toString());
            }
        }
    }

    return (
        <FormGroup>
            {heading && <InputHeading id={id} heading={heading} />}
            <Datetime
                {...rest}
                inputProps={{
                    placeholder: placeholder
                }}
                value={selectedDate || undefined}
                dateFormat={type !== 'time' && 'D MMM YYYY'}
                timeFormat={type !== 'date' && 'h:mm A'}
                onChange={handleDateChange}
            /> 
            {showTimePicker && ( 
                <Datetime
                    input={false}
                    dateFormat={false}
                    timeFormat="h:mm A"
                    onChange={handleTimeChange}
                />
            )}
        </FormGroup>
    )
}

export { DateTimePicker };
export type { DateTimePickerProps };
