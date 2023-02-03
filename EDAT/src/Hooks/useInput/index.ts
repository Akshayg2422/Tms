import React, {useState} from "react";


const useInput = (initialValue : string) => {

    const [value, setValue] = useState(initialValue);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const onChangeValue = event.target.value
        const maxLength = event.target.maxLength
        if (maxLength !== -1) {
          if (maxLength >= onChangeValue.length) {
            setValue(onChangeValue.slice(0, maxLength));
          }
        } else {
          setValue(onChangeValue);
        }
    };

    const set = (value: string) =>{
      setValue(value)
    }

    return {
        value,
        onChange: handleChange,
        set
    } 
};

export { useInput };   

