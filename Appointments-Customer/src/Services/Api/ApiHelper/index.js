import axios from 'axios';

const BUILD_TYPE_LIVE = 1;
const BUILD_TYPE_LIVE_DEMO = 2;
const BUILD_TYPE_STAGING = 3;
const BUILD_TYPE_LOCAL = 4;

const BUILD_TYPE = BUILD_TYPE_STAGING;

const SERVER =
  BUILD_TYPE === BUILD_TYPE_LIVE
    ? 'https://api.zenyq.com'
    : BUILD_TYPE === BUILD_TYPE_LIVE_DEMO
    ? 'live_local'
    : BUILD_TYPE === BUILD_TYPE_STAGING
    ? 'http://192.168.43.130:8001'
    : // 'http://192.168.128.176:8001'
      'local_ip_here';

const axiosApi = axios.create({
  baseURL: SERVER,
});

axios.interceptors.request.use(function (config) {
  return config;
});

const getHeaders = async () => {
  try {
    const value = '1acae257a4cbae05f5ea9183e0d2737394172b44';
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
