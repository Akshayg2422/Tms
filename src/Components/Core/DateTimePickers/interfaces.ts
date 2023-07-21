export interface DatePickerProps {
    icon?: any;
    iconPosition?: "append" | "prepend";
    title?: string;
    onChange?: (currentDateString: string) => void;
    value?: any;
    defaultValue?: string;
    placeholder?: string;
    minDate?: any;
    disabledDate?: any
    additionalClass?: string
    maxDate?: string
    name?: string
    disabled?:boolean
  }