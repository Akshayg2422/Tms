import {SERVER, BUILD_TYPE, BUILD_TYPE_LIVE,BUILD_TYPE_LOCAL,BUILD_TYPE_STAGING} from '@Services'
import moment from 'moment'

export const getPhoto = (photo: any) => {
  return BUILD_TYPE === BUILD_TYPE_STAGING ? SERVER + photo :  photo;
}

export const handleEmailClick = (email:any)  => {
  return (
    window.open(`mailto:${email}`)
  )
}


export const getDataAndTime = (time: any) => {
  return moment(time).format('MMMM Do YYYY, h:mm a')
}
