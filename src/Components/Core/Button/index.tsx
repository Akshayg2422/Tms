import React from 'react';
import { Button as RSButton } from 'reactstrap';
import { ButtonProps } from './interfaces';
import { Image, ImageIcon, Spinner } from '@Components'

function Button({
  loading, text, color = 'primary', variant = 'default', size = 'md', height = 15, width = 15, icon, onEnter, onClick, ...rest
}: ButtonProps) {

  return (
    <>
      {variant === 'default' && <RSButton type={'button'} size={size} color={color} {...rest} onClick={loading ? undefined : (e) => {

        if (onClick) {
          onClick(e)
        }

      }} >
        {

          loading && <Spinner />
        }
        {!loading && text}

      </RSButton>}

      {(variant === 'icon' || variant === 'icon-with-text') &&
        <RSButton type={'button'} size={size} className={'btn-icon'} color={color} {...rest} onClick={onClick}>
          {

            loading && <Spinner />
          }
          {!loading && <>
            {
              <span className={`btn-inner--icon ${variant === 'icon-with-text' && 'mr-1'}`}>
                <i className='ni ni-atom' />
              </span>
            }
            {
              variant === 'icon-with-text' &&
              <span className={'btn-inner--text'}>{text}</span>
            }
          </>
          }
        </RSButton>
      }

      {variant === 'icon-rounded' &&
        <RSButton type={'button'} size={size} className={'btn-icon-only rounded-circle d-flex align-items-center justify-content-center'} color={color} onClick={onClick}  {...rest} >
          <ImageIcon src={icon} height={height} width={width} />
        </RSButton>
      }
    </>
  )
}
export { Button };
