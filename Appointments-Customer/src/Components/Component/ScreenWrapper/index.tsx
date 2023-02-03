import React from 'react'
import { ScreenWrapperProps } from './interfaces'
function ScreenWrapper({ children }: ScreenWrapperProps) {
    return (
        <div className={'main-content'}>
            {children}
        </div>
    )
}

export { ScreenWrapper }