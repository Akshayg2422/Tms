import React from 'react';
import { Button as RSButton } from 'reactstrap';
import { ButtonProps } from './interfaces';

function Button({
  text, color = 'primary', variant = 'default', size = 'sm', ...rest
}: ButtonProps) {
  return (
    <>
      {variant === 'default' && <RSButton type={'button'} size={size} color={color} {...rest}>{text}</RSButton>}

      {(variant === 'icon' || variant === 'icon-with-text') &&
        <RSButton type={'button'} size={size} className={'btn-icon'} color={color} {...rest} >
          {
            <span className={`btn-inner--icon ${variant === 'icon-with-text' && 'mr-1'}`}>
              <i className='ni ni-active-40' />
            </span>
          }
          {
            variant === 'icon-with-text' &&
            <span className={'btn-inner--text'}>{text}</span>
          }
        </RSButton>
      }

      {variant === 'icon-rounded' &&
        <RSButton type={'button'} size={size} className={'btn-icon-only rounded-circle'} color={color} {...rest} >
          <span className={'btn-inner--icon'}>
            <i className='ni ni-atom' />
          </span>
        </RSButton>
      }
    </>
  )
}
export { Button };
