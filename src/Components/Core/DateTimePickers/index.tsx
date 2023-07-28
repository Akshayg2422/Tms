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
  ...props}: DatePickerProps) {



  const handleChange = (
    dates: Date[],
    currentDateString: string,
    self: any,
    data?: any
  ) => {
    console.log(currentDateString,"currentDateString===>")
    // if (onChange) {

    //   onChange(currentDateString);
      
    // }

    
  };

  const datePickerRef = useRef<any>(null);

  const openCalendar = () => {
    if (datePickerRef.current) {
      datePickerRef.current.flatpickr.open();
    }
  }

  return (

    <div className={`form-group ${ ClassName}`}>
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
                console.log(date,"ddddddddddddddd")

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
          // dateFormat: " h:i K",
          timeFormat:'h:i K',

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
    // <div className="form-group">
    //   {title && <InputHeading heading={title} />}
    //   <div className="input-group mt-2">
    //     {iconPosition === 'prepend' && <div className="input-group-prepend">
    //       <span className="input-group-text"><Image src={icon.Calendar} /></span>
    //     </div>}
    //     <Flatpickr
    //       onChange={() => { }}
    //       className="form-control bg-white pl-2"
    //       options={{mode: 'range'}}
    //     />
    //     {iconPosition === 'append' && <div className="input-group-append">
    //       <span className="input-group-text"><Image src={icon.Calendar}/></span>
    //     </div>}

    //   </div>
    // </div >

  )

}


export {DatePickers};
