import {merge} from 'lodash';

export const userRelated = (
  state = {
    loading: false,
    errMess: null,
    info: {},
  },
  action,
) => {
  switch (action.type) {
    case 'ADD_INFO':
      return {...state, loading: false, errMess: null, info: action.payload};
    case 'INFO_LOADING':
      return {...state, loading: action.payload, errMess: null, info: {}};
    case 'INFO_FAILED':
      return {...state, loading: false, errMess: action.payload, info: {}};
    case 'CHANGE_DIAGNOSE':
      let {otherDiagnose} = state.info.userInfo;
      for (let i in otherDiagnose) {
        if (action.diagnose === otherDiagnose[i]) {
          otherDiagnose.splice(i, 1);
          break;
        }
      }
      state.info.userInfo.diagnose = action.diagnose;
      return merge({}, state, {});
    case 'CHANGE_OTHER_DIAGNOSE':
      state.info.userInfo.otherDiagnose = action.otherDiagnose;
      return merge({}, state, {});
    // 清空
    case 'CLEAN':
      return {...state, loading: false, errMess: null, info: {}};
    default:
      return state;
  }
};
