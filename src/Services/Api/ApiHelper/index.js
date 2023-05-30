import axios from 'axios';
import { USER_TOKEN } from '@Utils'
export const BUILD_TYPE_LIVE = 1;
export const BUILD_TYPE_LIVE_DEMO = 2;
export const BUILD_TYPE_STAGING = 3;
export const BUILD_TYPE_LOCAL = 4;

export const BUILD_TYPE = BUILD_TYPE_STAGING;
export const SERVER =
  BUILD_TYPE === BUILD_TYPE_LIVE
    ? 'https://tmsprimary.quantaedat.com'
    : BUILD_TYPE === BUILD_TYPE_LIVE_DEMO
      ? 'live_local'
      : BUILD_TYPE === BUILD_TYPE_LOCAL
        ? 'http://192.168.162.5:8001'
        : BUILD_TYPE === BUILD_TYPE_STAGING
          ? 'http://103.118.188.135:8003'
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

