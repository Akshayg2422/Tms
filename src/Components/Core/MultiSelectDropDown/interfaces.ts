export interface MultiSelectProps {
    options?: { key: string, value: string }[];
    onSelect: (selectedList: any) => void;
    onRemove: (selectedList: any) => void;
    selectedValues?: any;
    singleSelect?: boolean;
    showCheckbox?: boolean;
    placeholder?: string;
    style?: object;
    disable?:boolean;
    displayValue?:string;
    showArrow?:boolean;
    avoidHighlightFirstOption?:boolean;
    className ?:string;
    heading?:string;
    id?:string;
}