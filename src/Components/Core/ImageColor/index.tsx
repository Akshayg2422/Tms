import React from 'react'
import { icons } from "@Assets";
import {Image}from '@Components'

function ImageColor() {

    const styleDefaultC1 = {
      filter: 'invert(34%) sepia(22%) saturate(1938%) hue-rotate(210deg) brightness(89%) contrast(82%)'
    };

    const styleDefault = {
      filter: 'invert(34%) sepia(62%) saturate(1138%) hue-rotate(210deg) brightness(89%) contrast(82%)'
    };

    // getFilter("#f5365c")

    const companyCode = "A001"
    const getStyleDefault = () =>{
      if (companyCode == "A001")
      {
        return styleDefaultC1
      }

      return styleDefault

    }

  return (
    <div>
      
        <Image style={getStyleDefault()} src={icons.addFill} />
        
    </div>
  )
}

export { ImageColor}