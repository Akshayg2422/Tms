const SERVER ='http://192.168.8.5:8000' || 'http://43.204.204.165'



export const getPhoto = (photo: any) => {
  console.log('photo', photo);
  const ip = SERVER;
  return ip + photo;

}
