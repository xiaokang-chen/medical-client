import axios from 'axios';
import constance from './constance';
import {asyncRead} from './asyncStorage';
import Toast from 'react-native-root-toast';

const DEFAULT_OPTIONS = {
  // baseURL: global.__DEV__ ? constance.DEV : constance.WWW,
  baseURL: constance.WWW,
  timeout: constance.TIMEOUT,
  headers: {'Content-Type': 'application/json;charset=UTF-8'},
};

const instance = axios.create(DEFAULT_OPTIONS);

instance.interceptors.request.use(
  async (config) => {
    const userInfoStr = await asyncRead(constance.USER_INFO);
    const userInfo = JSON.parse(userInfoStr || '{}');
    const {access_token, refresh_token} = userInfo;
    if (access_token && refresh_token)
      config.headers = {access_token, refresh_token};
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default function (url, method, queryParams = {}) {
  const option = {
    method,
    url: url,
  };
  if (method.toUpperCase() === 'GET') {
    option.params = queryParams;
  } else {
    option.data = queryParams;
  }
  return new Promise((resolve, reject) => {
    instance(option)
      .then((res) => {
        const {data} = res || {};
        resolve(data);
      })
      .catch((err) => {
        // console.log("请求出错", option);
        Toast.show(constance.ERROR_TIPS, {position: 0});
        reject(err);
      });
  });
}
