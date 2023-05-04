export interface EmployeesProps {
    otherParams?: object;
    selection?: 'single' | 'multiple' | 'none';
    onSelected?: (selected: any) => void

}