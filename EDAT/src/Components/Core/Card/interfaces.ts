import React from "react";
import { RsCardProps, Color } from '@Components'
export interface CardProps extends RsCardProps {
    title?: string;
    children: React.ReactNode
    color?: Color
    taskCompletionRatio?: string
    isCardBody?: boolean
    footerChildren?:React.ReactNode;
    onAddClick?: () => void;
    isHeaderChildren?: React.ReactNode
    buttonText?: string
    Class?:string
    isLoading?: boolean;
    completionRatioText?: string;
    isSearch?: boolean
}