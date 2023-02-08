import axios from 'axios';
import {USER_TOKEN} from '@Utils'
const BUILD_TYPE_LIVE = 1;
const BUILD_TYPE_LIVE_DEMO = 2;
const BUILD_TYPE_STAGING = 3;
const BUILD_TYPE_LOCAL = 4;

const BUILD_TYPE =  BUILD_TYPE_LOCAL;
const SERVER =
  BUILD_TYPE === BUILD_TYPE_LIVE
    ? 'https://api.zenyq.com'
    : BUILD_TYPE === BUILD_TYPE_LIVE_DEMO
    ? 'live_local'
    :BUILD_TYPE===BUILD_TYPE_LOCAL
   ?'http://192.168.8.5:8000'
    : BUILD_TYPE === BUILD_TYPE_STAGING
    ? 'http://43.204.204.165'
    :BUILD_TYPE ===BUILD_TYPE_LOCAL
    ?'http://192.168.8.5:8000/'
    :'http://localhost:8000/'


const axiosApi = axios.create({
  baseURL: SERVER,
});

axios.interceptors.request.use(function (config) {
  return config;
});

const getHeaders = async () => {
  try {
             
    const value =  localStorage.getItem(USER_TOKEN);  

    // console.log(JSON.stringify(value)+"+===Token");

    
    if (value) {
      return {Authorization: 'Token ' + value};
    } else {
      return {};
    }
  } catch {
    return {};
  }
};

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export async function get(url, config) {
  return await axiosApi
    .get(url, {
      ...config,
      headers: await getHeaders(),
    })
    .then(response => response.data);
}

export async function post(url, data, config) {
  let headers = {...(await getHeaders())};

  return await axiosApi
    .post(url, data, {
      ...config,
      headers: headers,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export async function postHeader(url, data, config) {
  let headers = {...(await getHeaders())};
  return await axiosApi
    .post(url, data, {
      ...config,
      headers: headers,
    })
    .then(response => {
      return response;
    });
}
