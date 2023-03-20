import { SERVER } from '@Services'
import moment from 'moment'

export const getPhoto = (photo: any) => SERVER === 'http://api.quantatms.in' ? photo : (SERVER + photo);

export const handleEmailClick = (email: any) => {
  return (
    window.open(`mailto:${email}`)
  )
}

export const getDataAndTime = (time: any) => {
  return moment(time).format('MMMM Do YYYY, h:mm a')
}
