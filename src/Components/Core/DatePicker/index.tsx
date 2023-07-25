import React, { useRef } from 'react'
import {DatePickerProps}from'./interfaces'
import Flatpickr from "react-flatpickr";
import { Image } from '@Components';
function DatePicker({
    icon,
    iconPosition,
    onChange,
    value,
    placeholder,
    minDate,
    disabledDate,
    additionalClass,
    maxDate,
    name,
    ...props
  }: DatePickerProps) {

    const handleChange = (
        dates: Date[],
        currentDateString: string,
        self: any,
        data?: any
      ) => {
        if (onChange) {
          onChange(currentDateString);
        }
      };

      const datePickerRef = useRef<any>(null);


  const openCalendar = () => {
    if (datePickerRef.current) {
      datePickerRef.current.flatpickr.open();
    }
  }
    


  return (
    <div className={`form-group ${additionalClass}`}>
    <div className="input-group" >
      {icon && iconPosition === "prepend" && (
        <div className="input-group-prepend" onClick={() => openCalendar()} style={{ cursor: 'pointer' }}>
          <span className="input-group-text">
          <span className="input-group-text"><Image src={icon.Calendar} /></span>
          </span>
        </div>
      )}
      <Flatpickr
        ref={datePickerRef}
        onChange={handleChange}
        options={{
          ...maxDate && { maxDate: maxDate }, ...disabledDate && { disable: disabledDate }, ...minDate && { minDate: minDate }
        }}
        className="form-control bg-white pl-2"
        value={value}
        name={name}
        placeholder={placeholder}
      />
      {icon && iconPosition === "append" && (
        <div className="input-group-append pe-auto" onClick={() => openCalendar()} style={{ cursor: 'pointer' }}>
          <span className="input-group-text">
          <span className="input-group-text"><Image src={icon.Calendar} /></span>
          </span>
        </div>
      )}
    </div>
  </div>

  )
}

export { DatePicker}