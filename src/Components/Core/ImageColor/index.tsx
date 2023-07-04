import React from 'react'
import { icons } from "@Assets";
import {Image}from '@Components'

function ImageColor() {
    const style={
      filter:' invert(34%) sepia(62%) saturate(1138%) hue-rotate(210deg) brightness(89%) contrast(82%);'
    }

  return (
    <div>
        <Image style={style} src={icons.addFill} />
    </div>
  )
}

export { ImageColor}