//处理登录请求----请求用户信息
import network from '../../plugin/network';
import Toast from 'react-native-root-toast';
import {asyncRead, asyncSave} from '../../plugin/asyncStorage';
import constance from '../../plugin/constance';

export const userLoading = (loading) => ({
  type: 'INFO_LOADING',
  payload: loading,
});

export const userFailed = (errmess) => ({
  type: 'INFO_FAILED',
  payload: errmess,
});

export const addUser = (info) => ({
  type: 'ADD_INFO',
  payload: info,
});

// 使用手机号+密码登录
export const getUserInfoByPassword = (phone, password) => (dispatch) => {
  dispatch(userLoading(true));
  const loginInfo = {
    phone: phone,
    password: password,
  };
  return network('user/login', 'post', loginInfo)
    .then((res) => {
      if (res.code === 20000) {
        dispatch(addUser(res.data));
      } else {
        dispatch(userLoading(false));
      }
    })
    .catch((error) => dispatch(userFailed(error.message)));
};

//忘记密码时确认
export const getUserIdByCaptcha = (data = {}) => {
  return network('user/loginByCaptcha', 'post', data);
};

// 使用手机号+验证码登录
export const getUserInfoByCaptcha = (phone, captcha) => (dispatch) => {
  dispatch(userLoading(true));
  const loginInfo = {
    phone: phone,
    code: captcha,
  };
  return network('user/loginByCaptcha', 'post', loginInfo)
    .then((res) => {
      if (res.code === 20000) {
        dispatch(addUser(res.data));
      } else {
        dispatch(userLoading(false));
      }
    })
    .catch((error) => dispatch(userFailed(error.message)));
};

// 注册
export const register = (data = {}) => {
  return network('user/register', 'POST', data);
};

//找回密码-账号及手机号验证
export const resetConfirm = (data = {}) => {
  return network('user/reset', 'POST', data);
};

//找回密码
export const reset = (data = {}) => {
  return network('user/reset/password', 'POST', data);
};

//修改头像
export const updateAvatar = (data = {}) => {
  return network('user/UploadPic', 'POST', data);
};

//修改用户信息（昵称）
export const updateUserInfo = (data = {}) => {
  // console.log("进来了：",data);
  return network('user/update', 'POST', data);
};

//通过access_token获取用户信息
export const loadUserInfo = () => (dispatch) => {
  return network('user/userInfo', 'GET')
    .then((res) => {
      if (res.code === 20000) {
        dispatch(addUser(res.data));
      }
    })
    .catch((error) => dispatch(userFailed(error.message)));
};

//获取手机验证码
export const getCaptcha = (data = {}) => {
  return network('user/getCaptcha', 'GET', data);
};

//患者修改用户主诊断
export const changeMainDiagnose = (patientId, diagnose, otherDiagnose) => (
  dispatch,
) => {
  const data = {
    id: patientId,
    diagnose: diagnose,
    otherDiagnose: otherDiagnose,
  };
  // console.log("DATA",data);
  return network('/change/patient/diagnose', 'POST', data).then(async (res) => {
    if (res.code === 20000) {
      dispatch({type: 'CHANGE_DIAGNOSE', diagnose});
      const userInfoStr = await asyncRead(constance.USER_INFO);
      const userInfo = JSON.parse(userInfoStr || '{}');
      // console.log("修改前",userInfo);
      userInfo.userInfo.diagnose = diagnose;
      userInfo.userInfo.otherDiagnose = otherDiagnose;
      // console.log("修改后",userInfo);
      await asyncSave(constance.USER_INFO, userInfo);

      Toast.show('更改成功', {position: 0});
    } else {
      Toast.show('更改失败', {position: 0});
    }
  });
};

//患者修改其他诊断
export const changeOtherDiagnose = (patientId, otherDiagnose) => (dispatch) => {
  const data = {
    id: patientId,
    otherDiagnose: otherDiagnose,
  };
  // console.log("DATA",data);
  return network('/change/patient/diagnose', 'POST', data).then(async (res) => {
    if (res.code === 20000) {
      dispatch({type: 'CHANGE_OTHER_DIAGNOSE', otherDiagnose});
      const userInfoStr = await asyncRead(constance.USER_INFO);
      const userInfo = JSON.parse(userInfoStr || '{}');
      userInfo.userInfo.otherDiagnose = otherDiagnose;
      await asyncSave(constance.USER_INFO, userInfo);

      Toast.show('更改成功', {position: 0});
    } else {
      Toast.show('更改失败', {position: 0});
    }
  });
};

//患者删除其他诊断
export const deleteOtherDiagnose = (patientId, otherDiagnose) => (dispatch) => {
  const data = {
    id: patientId,
    otherDiagnose: otherDiagnose,
  };
  // console.log("DATA",data)
  return network('/change/patient/diagnose', 'POST', data).then(async (res) => {
    if (res.code === 20000) {
      dispatch({type: 'CHANGE_OTHER_DIAGNOSE', otherDiagnose});
      const userInfoStr = await asyncRead(constance.USER_INFO);
      const userInfo = JSON.parse(userInfoStr || '{}');
      userInfo.userInfo.otherDiagnose = otherDiagnose;
      await asyncSave(constance.USER_INFO, userInfo);

      Toast.show('删除成功', {position: 0});
    } else {
      Toast.show('删除失败', {position: 0});
    }
  });
};
