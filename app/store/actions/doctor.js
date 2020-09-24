import network from '../../plugin/network';

export const doctorFailed = (errmess) => ({
  type: 'DOCTOR_FAILED',
  payload: errmess,
});

export const addDoctor = (doctor) => ({
  type: 'ADD_DOCTOR',
  payload: doctor,
});

//更新医生信息
export const doctorInfoUpdate = (data = {}) => {
  return network('user/info/doctorRefresh', 'POST', data);
};

//根据major获取医生
export const getDoctorByMajor = (data = {}) => {
  return network('doctor/search/major', 'POST', data);
};

//关注医生（添加自己的主治医生）-------dispatch不能删除！
export const starDoctor = (data = {}) => (dispatch) => {
  return network('doctor/connect', 'POST', data);
};

//取消关注医生（删除自己的主治医生）
export const unstarDoctor = (data = {}) => (dispatch) => {
  return network('doctor/disconnect', 'POST', data);
};

//获取医生列表
export const getDoctorList = () => (dispatch) => {
  return network('patient/connectedDoctor', 'POST')
    .then((res) => {
      let doctor = res.data ? res.data : [];
      dispatch(addDoctor(doctor));
    })
    .catch((error) => dispatch(doctorFailed(error.message)));
};
