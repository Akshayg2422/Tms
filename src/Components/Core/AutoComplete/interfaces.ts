

import { Option, InputHeadingProps } from '@Components'

export interface AutoCompleteProps extends InputHeadingProps {
    variant?: 'default' | 'custom'
    data?: any
    placeHolder?: string;
    defaultValue?: Option;
    onChange?: (item: Option) => void;
    multiple?: string;
    value?: Option;
    disabled?: boolean;
    selected?: Option;
    className?: string;
    inputType?:string;
}