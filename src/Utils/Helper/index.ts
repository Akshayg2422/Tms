import {SERVER} from '@Services'

export const getPhoto = (photo: any) => {

  const ip = SERVER;
  return ip + photo;

}

export const handleEmailClick = (email:any)  => {
  return (
    window.open(`mailto:${email}`)
  )
}
