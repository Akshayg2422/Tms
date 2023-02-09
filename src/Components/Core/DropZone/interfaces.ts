export interface DropZoneProps {
    onSelect: (image: any) => void;
    variant?: "ICON" | 'BUTTON'
    text?: string
    icon?: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}