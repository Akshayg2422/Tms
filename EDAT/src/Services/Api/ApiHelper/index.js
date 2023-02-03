import axios from 'axios';
import {USER_TOKEN} from '@Utils'
const BUILD_TYPE_LIVE = 1;
const BUILD_TYPE_LIVE_DEMO = 2;
const BUILD_TYPE_STAGING = 3;
const BUILD_TYPE_LOCAL = 4;

const BUILD_TYPE = BUILD_TYPE_LIVE;


export const SERVER =
  BUILD_TYPE === BUILD_TYPE_LIVE
    ? 'https://edatapi.quantaone.in'
    : BUILD_TYPE === BUILD_TYPE_LIVE_DEMO
    ? 'live_local'
    : BUILD_TYPE === BUILD_TYPE_STAGING
    ? 'http://13.126.173.181'
    : 'http://192.168.43.239:8001';

const axiosApi = axios.create({
  baseURL: SERVER,
});

axios.interceptors.request.use(function (config) {
  return config;
});

const getHeaders = async () => {
  try {
             
    const value =  localStorage.getItem(USER_TOKEN);

    console.log(JSON.stringify(value)+"+===Token");

    if (value) {
      return {Authorization: 'Token ' + value};
    } else {
      return {};
    }
  } catch(e) {
    console.log(e+"======");
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
