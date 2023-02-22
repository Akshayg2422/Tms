export interface MultiSelectProps {
    options: { key: string, value: string }[];
    onSelect: (selectedList: any) => void;
    onRemove: (selectedList: any) => void;
    displayValue:string;
    selectedValues?: any;
    singleSelect?: boolean;
    showCheckbox?: boolean;
    placeholder?: string;
    style?: object;
    disable?:boolean;
    showArrow?:boolean;
    avoidHighlightFirstOption?:boolean;
}