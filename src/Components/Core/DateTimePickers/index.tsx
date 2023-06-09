import { InputHeading } from '@Components';
import moment, { isMoment, Moment } from 'moment';
import ReactDatetime from "react-datetime";
import { FormGroup } from 'reactstrap';
import { DateTimePickersProps } from './interfaces';


function DateTimePickers({ id, heading, placeholder, type = 'date', onChange, disableFuture = 'all', ...rest }: DateTimePickersProps) {

  const beforeCurrentDate = moment().add(1,'day');
  console.log(beforeCurrentDate ,"beforeCurrentDate ")
  const AfterCurrentDate = moment().subtract(1, 'day')
  console.log( AfterCurrentDate," AfterCurrentDate==>")
  const disableDt = disableFuture === 'after'
    ? (current: any) => current.isAfter(AfterCurrentDate, 'day')
    : disableFuture === 'before'? (current: any) => current.isBefore(beforeCurrentDate, 'day'):(current: any) => current;

    console.log(disableDt,"===>")

  return (
    <FormGroup>
      {heading && <InputHeading id={id} heading={heading} />}

      <ReactDatetime
        {...rest}
        inputProps={
          {
            placeholder: placeholder,
            onKeyDown: (e) => { e.preventDefault() },
          }
        }
         closeOnSelect={true}
         dateFormat={type !== 'time' && 'D MMM YYYY'}
          timeFormat={type !== 'date' && 'h:mm A'}
        onChange={
          (date: Moment | string) => {
            if (onChange)
              if (isMoment(date))
                onChange(type === 'time' ? date.format('LT') : type === 'both' ? date.format() : date.format('YYYY-MM-DD'))
              else
                onChange(date)
          }
        }
        isValidDate={disableDt}
      />
    </FormGroup >
  )
}

export { DateTimePickers };
export type { DateTimePickersProps };
