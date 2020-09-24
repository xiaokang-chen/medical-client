//获取所有的医生专业（科室）
import network from '../../plugin/network';

export const majorFailed = (errmess) => ({
  type: 'MAJOR_FAILED',
  payload: errmess,
});

export const addMajor = (major) => ({
  type: 'ADD_MAJOR',
  payload: major,
});

export const getMajor = () => (dispatch) => {
  return network('doctor/getMajors', 'GET')
    .then((res) => dispatch(addMajor(res.data)))
    .catch((error) => dispatch(majorFailed(error.message)));
};
