import { ReactEventHandler } from "react"

export interface RegisterBusinessProps {
    businessName:string
    businessAddress:string
    businessPinCode:number
    contactNumber:number
    onChange:(Event:ReactEventHandler<HTMLInputElement>) => void
}