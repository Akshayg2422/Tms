import React, { useState } from 'react'
import { ModalProps } from './interfaces'
import {
  Modal as RsModal
} from 'reactstrap';


function Modal({ visible, children, title, size = 'md', ...rest }: ModalProps) {

  const [show, setShow] = useState(visible);

  return (
    <RsModal className={`modal-dialog-centered modal-${size}`} isOpen={show} {...rest}>
      <div className={'modal-header'}>
        {
          title && <h6 className={'modal-title'}>
            {
              title
            }
          </h6>
        }
        <button
          aria-label={'Close'}
          className={'close'}
          data-dismiss={'modal'}
          type={'button'}
          onClick={() => { setShow(!show) }}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className='modal-body'>
        {
          children
        }
      </div>
    </RsModal>

  )
}

export { Modal }