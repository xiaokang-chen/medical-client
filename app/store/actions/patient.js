import network from '../../plugin/network';
import Toast from 'react-native-root-toast';

export const patientLoading = () => ({
  type: 'PATIENT_LOADING',
});

export const patientFailed = (errmess) => ({
  type: 'PATIENT_FAILED',
  payload: errmess,
});

export const addPatient = (sectionList) => ({
  type: 'ADD_PATIENT',
  payload: sectionList,
});

// export const deletePatient = (id) => ({
//     type: 'DELETE_PATIENT',
//     payload: _deletePatient(id)
// });

//更新患者信息
export const patientInfoUpdate = (data = {}) => {
  return network('user/info/patientRefresh', 'POST', data);
};

//医生添加患者
export const connectPatient = (data = {}) => {
  return network('patient/connect', 'POST', data);
};

//医生删除患者
export const disconnectPatient = (data = {}) => (dispatch) => {
  return network('patient/disconnect', 'POST', data);
};

//修改用户主诊断
export const changeMainDiagnoseByDoctor = (patientInfo, diagnose, ws) => (
  dispatch,
) => {
  const data = {
    id: patientInfo.id,
    diagnose: diagnose,
  };
  return network('/change/patient/diagnose', 'POST', data).then((res) => {
    if (res.code === 20000) {
      dispatch({
        type: 'FIX_ITEM_OF_INFO',
        payload: {patientInfo, type: 'diagnose', value: diagnose},
      });
      ws.send(
        JSON.stringify({
          version: 1,
          commandId: 13,
          body: {
            to_shell_id: patientInfo.userId,
            Type: '3',
            content: diagnose,
          },
        }),
      );
    } else {
      Toast.show('更改失败', {position: 0});
    }
  });
};
