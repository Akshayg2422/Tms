
import { DateTimePickerProps } from './interfaces';
import ReactDatetime from "react-datetime";
import { FormGroup } from 'reactstrap';
import { InputHeading } from '@Components'
import { Moment, isMoment } from 'moment'
import { useEffect, useState } from 'react';
import moment from 'moment';


function DateTimePicker({ id, heading, placeholder, type = 'both', format = "", onChange, disableFuture = 'after', ...rest }: DateTimePickerProps) {
    // const [viewMode, setViewMode] = useState<any>('days')
    const beforeCurrentDate = moment().add(1, 'day');
    const AfterCurrentDate = moment().subtract(1, 'day')
    const disableDt = disableFuture === 'after'
        ? (current: any) => current.isAfter(AfterCurrentDate, 'day')
        : disableFuture === 'before' ? (current: any) => current.isBefore(beforeCurrentDate, 'day') : disableFuture === 'weekend' ? (current: any) => current.day() !== 0 && current.day() !== 6 : disableFuture === 'afterWeekend' ?
            (current: any) => current.day() !== 0 && current.day() !== 6 && current.isAfter(AfterCurrentDate, 'day') : (current: any) => current;

    return ( 
        <FormGroup className='bootstrap-datetimepicker-widget' >
            {heading && <InputHeading id={id} heading={heading} />}

            <ReactDatetime
            className=' '

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
                isValidDate={disableDt}
            />
        </FormGroup >
    )
}

export { DateTimePicker };
export type { DateTimePickerProps };