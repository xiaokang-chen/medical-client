import {Platform} from 'react-native';

import {asyncDelete} from '../plugin/asyncStorage';
import constance from '../plugin/constance';
import Toast from 'react-native-root-toast';

//系统
global.OS = Platform.OS;

// 登陆状态
global.signInStatus = false;

export default ({dispatch, getState}) => {
  global.signOut = () => {
    return new Promise((resolve) => {
      global.signInStatus = false;

      asyncDelete(constance.USER_INFO).then((res) => {});
      asyncDelete(constance.SESSIONS).then((res) => {});
      asyncDelete(constance.SESSIONS_LIST).then((res) => {});
      asyncDelete(constance.HISTORY_SEARCH).then((res) => {});
      asyncDelete(constance.FRIENDS).then((res) => {});
      dispatch({type: 'CLEAN'});
      Toast.show('退出成功', {position: 0});

      resolve();
    });
  };
};
