const SERVER ='http://192.168.8.5:8001' || 'http://43.204.204.165'



export const getPhoto = (photo: any) => {

  const ip = SERVER;
  return ip + photo;

}
