import React from 'react'
import { ImageProps, ImageVariant } from './interfaces'
function ImageIcon({ variant = 'default', className, alt, size, ...rest }: ImageProps) {

    const styles={
        filter: 'invert(35%) sepia(100%) saturate(5908%) hue-rotate(245deg) brightness(73%) contrast(132%)'
    }

    function getVariantStyle(variant: ImageVariant) {
        let styles = ''
        switch (variant) {
            case 'default':
                styles = ''
                break;
            case 'avatar':
                styles = `avatar ${size && `avatar-${size}`}`
                break;
            case 'rounded':
                styles = `avatar ${size && `avatar-${size}`} rounded-circle`
                break;
        }
        return styles;
    }

  

    return (
        <img   style={styles} className={`${getVariantStyle(variant)} ${className}`} alt={alt} {...rest} ></img>
    )
}

export {ImageIcon}