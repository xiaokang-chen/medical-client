/**
 * 异步存储 key
 */
const ASYNC_STORAGE = {
  HEAD_URL_KEY: 'HEAD_URL_KEY', // 用户头像缓存信息，持久保存
  USER_INFO: 'USER_INFO', // 用户信息
  ANSWER: 'ANSWER', //问卷答案
  HISTORY_SEARCH: 'HISTORY_SEARCH', //历史搜索
};
//ip
export const ip = '182.92.190.235';

//服务器地址
export const baseUrl = 'http://' + ip + ':8082/';

//聊天服务器
export const chatUrl = 'ws://' + ip + ':19999/chat';

export default {
  ...ASYNC_STORAGE,
  //YMD: val => moment(val).format('YYYY-MM-DD'),
  //YMDHM: val => moment(val).format('YYYY-MM-DD HH:mm'),
  // WWW: 'http://192.168.31.66:8082/api/',
  // WWW: 'http://10.108.211.136:8082/api/',
  WWW: 'http://' + ip + ':8082/api/',
  DEV: 'http://127.0.0.1:6010/api/',
  SM_SM: 'https://sm.ms/api/',
  ACCESS_TOKEN: 'access_token',
  TIMEOUT: 10000,
  ERROR_TIPS: '请求失败',
  SESSIONS: 'MEADIA_SESSIONS',
  FRIENDS: 'FRIENDS',
  SESSIONS_LIST: 'MEDIA_SEESION_LIST',
};
