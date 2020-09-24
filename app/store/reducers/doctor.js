import {merge} from 'lodash';

export const doctorList = (
  state = {
    loading: false,
    errMess: null,
    info: [],
  },
  action,
) => {
  switch (action.type) {
    case 'ADD_DOCTOR':
      return {...state, loading: false, errMess: null, info: action.payload};
    case 'DOCTOR_LOADING':
      return {...state, loading: true, errMess: null, info: []};
    case 'DOCTOR_FAILED':
      return {...state, loading: false, errMess: action.payload, info: []};
    // 清空
    case 'CLEAN':
      return {...state, loading: false, errMess: null, info: []};
    default:
      return state;
  }
};
