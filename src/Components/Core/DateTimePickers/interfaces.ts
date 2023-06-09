import { InputHeadingProps } from '@Components'
import { DatetimepickerProps as DefaultProps } from 'react-datetime'


export interface DateTimePickersProps extends InputHeadingProps, DefaultProps {
    type?: 'date' | 'time' | 'both';
    placeholder?: string,
    format?:string;
    disableFuture?:'before' | 'after' | 'all'
}