import {merge} from 'lodash';
import {getPinYinFirstCharacter} from '../../plugin/first-character';

function fixItemOfInfo(state, action) {
  const {type, value, patientInfo} = action.payload;
  // console.log("测试", state, action, type, value, patientInfo);
  for (const i in state.info) {
    // console.log("查看 i", state.info[i].key , getPinYinFirstCharacter(patientInfo.userInfo.nickName).toUpperCase())
    if (
      state.info[i].key ===
      getPinYinFirstCharacter(patientInfo.userInfo.nickName, '', true)
    ) {
      const dataList = state.info[i].data;
      for (const j in dataList) {
        // console.log("查看 j", dataList[j].id, patientInfo.id)
        if (dataList[j].id === patientInfo.id) {
          state.info[i].data[j][type] = value;
          break;
        }
      }
      break;
    }
  }
  // console.log("测试2", state)
  return merge({}, state);
}

export const patientList = (
  state = {
    loading: false,
    errMess: null,
    info: [],
  },
  action,
) => {
  switch (action.type) {
    case 'ADD_PATIENT':
      return {...state, loading: false, errMess: null, info: action.payload};
    case 'PATIENT_LOADING':
      return {...state, loading: true, errMess: null, info: []};
    case 'PATIENT_FAILED':
      return {...state, loading: false, errMess: action.payload, info: []};
    case 'DELETE_PATIENT':
      return {...state, loading: false, errMess: null, info: action.payload};
    case 'FIX_ITEM_OF_INFO':
      // 医生修改主诊断
      return fixItemOfInfo(state, action);
    // 清空
    case 'CLEAN':
      return {...state, loading: false, errMess: null, info: []};
    default:
      return state;
  }
};

// //根据患者ID拿出Redux中患者List中对应信息
// export const getPatientById = (state, id) => {
//     return state.patientList.info[id]?state.patientList.info[id] : {}
// };
