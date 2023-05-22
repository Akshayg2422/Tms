export interface DropZoneImageProps {
    onSelect: (image: any) => void;
    variant?: "ICON" | 'BUTTON'
    text?: string
    icon?: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
    imageVariant?:any,
    imagePicker?:boolean,
    noOfFilePickers?:number,
    editImagePicker?:boolean,
    defaultValue?:any,
}