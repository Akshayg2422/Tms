import { Color } from '@Components'

export interface LoadingButtonProps {
    text?:string|null|undefined
    loading?:boolean
    onClick?: () => void 
    color?: Color
    size?: 'sm' | 'md' | 'lg'
    

    

}