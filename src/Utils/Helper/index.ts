import {SERVER} from '@Services'

export const getPhoto = (photo: any) => {

  const ip = SERVER;
  return ip + photo;

}

export const handleEmailClick = (emails:any)  => {
  return (
    window.open(`mailto:${emails}`)
  )
}
