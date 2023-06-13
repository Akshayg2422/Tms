import React from 'react'
import { LoadingButtonProps } from './interfaces'
import { Spinner } from '@Components'

function LoadingButton({ text, loading, onClick, color = 'primary', size = 'md' }: LoadingButtonProps) {

  return (
    <button onClick={onClick} className={`btn btn-${color} btn-${size}`}>
      {
        loading ? <Spinner /> : text
      }
    </button>
  )
}
export { LoadingButton }
