export interface GroupEmployeesProps {
    otherParams?: object;
    selection?: 'single' | 'multiple' | 'none';
    onSelected?: (selected: any) => void,
    defaultSelect?:any,

}