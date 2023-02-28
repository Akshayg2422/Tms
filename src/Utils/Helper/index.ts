import {SERVER, BUILD_TYPE, BUILD_TYPE_LIVE,BUILD_TYPE_LOCAL} from '@Services'

export const getPhoto = (photo: any) => {
  return BUILD_TYPE === BUILD_TYPE_LIVE ? photo:  SERVER + photo;
}

export const handleEmailClick = (email:any)  => {
  return (
    window.open(`mailto:${email}`)
  )
}
