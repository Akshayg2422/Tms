import React, { useState } from "react";
import { Option } from '@Components'

const useDropDown = (initialValue: any) => {

  const [value, setValue] = useState(initialValue);
  const handleChange = (option: Option) => {
    setValue(option);
  };

  return {
    value,
    onChange: handleChange
  }
};

export { useDropDown };