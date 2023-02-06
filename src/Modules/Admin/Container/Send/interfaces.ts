import { ReactEventHandler } from "react"
export interface SendProps {
    onClick: () => void;
    value: any;
    onChange:(event:React.ChangeEvent<HTMLInputElement>) => void
}