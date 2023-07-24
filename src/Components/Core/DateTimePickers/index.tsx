import React from 'react';
import Flatpickr from "react-flatpickr";
import { DatePickerProps } from './interfaces';
import { InputHeading ,Image} from '@Components';


function DateRangePickers({title, icon, iconPosition, ...props}: DatePickerProps) {
  return (
    <div className="form-group">
      {title && <InputHeading heading={title} />}
      <div className="input-group mt-2">
        {iconPosition === 'prepend' && <div className="input-group-prepend">
          <span className="input-group-text"><Image src={icon.Calendar} /></span>
        </div>}
        <Flatpickr
          onChange={() => { }}
          className="form-control bg-white pl-2"
          options={{mode: 'range'}}
        />
        {iconPosition === 'append' && <div className="input-group-append">
          <span className="input-group-text"><Image src={icon.Calendar}/></span>
        </div>}

      </div>
    </div >

  )

}


export {DateRangePickers};
