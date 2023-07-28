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
    ClassName?: string
    maxDate?: string
    name?: string
    disabled?:boolean
    formate?:'date-time'|'date'|'time'
    format?:string,
    disableFuture?:any,
    heading?:string,
    id?:any
  }