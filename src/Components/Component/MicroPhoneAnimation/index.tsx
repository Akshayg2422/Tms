import { icons } from '@Assets'
import { ImageIcon } from '@Components'
import './index.css';
import React from 'react'

function MicroPhoneAnimation() {
  return (
    <div>
      <div className='class="pulse-ring' style={{
          //   content: '',
          //   width:'100px',
          //   height:'100px',
          //    border:'5px solid red',
          //    borderRadius:'50%',
            
          // position:'absolute',
          //    top: '-5px',
          //    left: '-5px',
          //    animation:'infinite '
            // animation: pulsate infinite 1.5s;

      }}>
        <ImageIcon src={icons.microPhone}height={30}width={30}/>

      </div>


    </div>
  )
}

export {MicroPhoneAnimation}