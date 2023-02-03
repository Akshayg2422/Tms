import React from 'react'
import { ModalProps as RsModalProps } from 'reactstrap'

export interface ModalProps extends RsModalProps {
    children?: React.ReactNode;
    title?: string;
    subTitle?:string;
    size?: 'lg' | 'sm' | 'xl' | 'md';
    onClose ?: ()=> void,
    isHeaderChildren?: React.ReactNode;
    height?: string;
    isModalLoading?:boolean;
    titleClassname?:string
} 