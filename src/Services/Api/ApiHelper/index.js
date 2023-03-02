import axios from 'axios';
import { USER_TOKEN } from '@Utils'
export const BUILD_TYPE_LIVE = 1;
export const BUILD_TYPE_LIVE_DEMO = 2;
export const BUILD_TYPE_STAGING = 3;
export const BUILD_TYPE_LOCAL = 4;

export const BUILD_TYPE = BUILD_TYPE_LOCAL;
export const SERVER =
  BUILD_TYPE === BUILD_TYPE_LIVE
    ? 'http://api.quantatms.in'
    : BUILD_TYPE === BUILD_TYPE_LIVE_DEMO
      ? 'live_local'
      : BUILD_TYPE === BUILD_TYPE_LOCAL
        ? 'http://192.168.176.5:8000'
        : BUILD_TYPE === BUILD_TYPE_STAGING
          ? 'http://43.204.204.165'
          : BUILD_TYPE === BUILD_TYPE_LOCAL
            ? 'http://192.168.176.5:8001'
            : 'http://localhost:8000'


const axiosApi = axios.create({
  baseURL: SERVER,
});

axios.interceptors.request.use(function (config) {
  return config;
});

const getHeaders = async () => {
  try {

    const value = await localStorage.getItem(USER_TOKEN);
    //  const value = '0d1adf71aa0c0c290cd4c4d28bcc00f68a9eb5b3'
    // console.log(JSON.stringify(value) + "+===Token");


    if (value) {
      return { Authorization: 'Token ' + value };
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
  let headers = { ...(await getHeaders()) };

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
  let headers = { ...(await getHeaders()) };
  return await axiosApi
    .post(url, data, {
      ...config,
      headers: headers,
    })
    .then(response => {
      return response;
    });
}

