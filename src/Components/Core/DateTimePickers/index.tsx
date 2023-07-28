import {useRef,useState} from 'react';
import Flatpickr from "react-flatpickr";
import { DatePickerProps } from './interfaces';
import { InputHeading ,Image} from '@Components';
import { Moment, isMoment } from 'moment';




function DatePickers({  icon,
  iconPosition,
  onChange,
  value,
  placeholder,
  minDate,
  disabledDate,
  ClassName,
  maxDate,
  name,
  formate='date-time',
  format='',
  heading,
  id,
  ...props}: DatePickerProps) {

  const datePickerRef = useRef<any>(null);

  const openCalendar = () => {
    if (datePickerRef.current) {
    
      datePickerRef.current.flatpickr.open();
    }
  }

  // const dateObject = moment(value, '[ddd] MMM DD YYYY HH:mm:ss [GMT]ZZ (z)');
  //       const convertedDateString = dateObject.format('YYYY-MM-DDTHH:mm:ssZ');

  return (

    <div className={`form-group ${ ClassName}`}>
         {heading && <InputHeading id={id} heading={heading} />}
    <div className="input-group" >
      {icon && iconPosition === "prepend" && (
        <div className="input-group-prepend" onClick={() => openCalendar()} style={{ cursor: 'pointer' }}>
          <span className="input-group-text">
            <Image src={icon} />
          </span>
        </div>
      )}

      <Flatpickr
        ref={datePickerRef}
        
      
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

        options={{
          // dateFormat: "j F Y h:i K",
          altInput: true,
          altFormat: "j F Y h:i K",
          dateFormat: "Y-m-d ",
          ...formate==='time' && { enableTime: true },
          ...formate==='time' && { noCalendar: true },
          ...formate ==='date' && {...maxDate && { maxDate: maxDate }, ...disabledDate && { disable: disabledDate }, ...minDate && { minDate: minDate }} ,
          ...formate==='date-time' && { enableTime: true },
          ...formate ==='date-time' && {...maxDate && { maxDate: maxDate }, ...disabledDate && { disable: disabledDate }, ...minDate && { minDate: minDate }} ,

        }}
        className="form-control bg-white pl-2 "
        value={value}
        name={name}
        placeholder={placeholder}

      />
      {icon && iconPosition === "append" && (
        <div className="input-group-append pe-auto" onClick={() => openCalendar()} style={{ cursor: 'pointer' }}>
          <span className="input-group-text">
            <Image src={icon} />
          </span>
        </div>
      )}
    </div>
  </div>
  )

}

{/* <DatePickers
ClassName='pt-1'
placeholder={"Select ETA"}
minDate={TODAY}
onChange={handleEtaChange}

/> */}


export {DatePickers};
