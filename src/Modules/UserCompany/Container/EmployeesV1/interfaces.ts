export interface GroupEmployeesProps {
    selection?: 'single' | 'multiple' | 'none';
    onSelected?: (selected: any) => void,
    defaultSelected?: any,
    selectedCode?: any,
}