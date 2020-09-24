import {getPinYinFirstCharacter} from '../../plugin/first-character';
import {asyncRead} from '../../plugin/asyncStorage';
import constance from '../../plugin/constance';

const parseList = async function (patientsList, tagDoctor) {
  // tag : true 医生
  // 构造 sectionList
  //按照昵称首字母分类
  patientsList = patientsList || [];
  let sections_tmp = {};
  for (const item of patientsList) {
    let nickName = item.userInfo ? item.userInfo.nickName : '';
    let firstChar = getPinYinFirstCharacter(nickName, '', true);
    if (!sections_tmp.hasOwnProperty(firstChar)) sections_tmp[firstChar] = [];
    sections_tmp[firstChar].push(item);
  }
  let sectionList = [];
  // console.log("检测数据++++++++++++++++++++++++", sections_tmp);
  for (let item in sections_tmp) {
    sectionList.push({
      key: item,
      data: sections_tmp[item],
    });
  }
  //按照首字母排序
  let compare = function (prop) {
    return function (obj1, obj2) {
      let val1 = obj1[prop];
      let val2 = obj2[prop];
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    };
  };
  sectionList.sort(compare('key'));

  // console.log("Section++++", sectionList);

  // 构造 DoctorSessionList
  let DoctorSessionList = [];
  for (const item of patientsList) {
    let tmp = item.userInfo;
    tmp.name = item.name;
    DoctorSessionList.push(tmp);
  }
  // console.log("医生列表", patientsList, DoctorSessionList);

  const sessionList = JSON.parse(
    (await asyncRead(constance.SESSIONS_LIST)) || '{}',
  );

  let byId = {};
  let allIds = [];

  for (let item of DoctorSessionList) {
    byId[item.id] = item;
    allIds.push(item.id.toString());
  }

  const SessionList = {
    byId: byId,
    allIds: tagDoctor && sessionList.allIds ? sessionList.allIds : allIds, // 列表展示,
    topIds: sessionList.topIds || [],
  };

  // 构造 聊天记录 sessions_new
  let sessions_new = JSON.parse((await asyncRead(constance.SESSIONS)) || '{}');

  for (const item of DoctorSessionList) {
    if (sessions_new.hasOwnProperty(item.id)) continue;
    sessions_new[item.id.toString()] = {
      currentMessageId: 0,
      messages: [],
      badge: 0,
      isLoadingEarlier: false,
      loadEarlier: true,
    };
  }
  return {sectionList, SessionList, sessions_new};
};

// 医生删除病人后的补丁
// 计算出 通讯录列表 sectionList, 对话列表 SessionList,  聊天记录 sessions_new
const parseListForDelete = async function (patientsList, delete_id) {
  // console.log("查看数据", patientsList, await asyncRead(constance.SESSIONS_LIST), await asyncRead(constance.SESSIONS))
  // 构造 sectionList
  //按照昵称首字母分类
  patientsList = patientsList || [];
  let sections_tmp = {};
  for (const item of patientsList) {
    let nickName = item.userInfo ? item.userInfo.nickName : '';
    let firstChar = getPinYinFirstCharacter(nickName, '', true);
    if (!sections_tmp.hasOwnProperty(firstChar)) sections_tmp[firstChar] = [];
    sections_tmp[firstChar].push(item);
  }
  let sectionList = [];
  for (let item in sections_tmp) {
    sectionList.push({
      key: item,
      data: sections_tmp[item],
    });
  }
  //按照首字母排序
  let compare = function (prop) {
    return function (obj1, obj2) {
      let val1 = obj1[prop];
      let val2 = obj2[prop];
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    };
  };
  sectionList.sort(compare('key'));

  // 构造 DoctorSessionList
  let DoctorSessionList = [];
  for (const item of patientsList) {
    let tmp = item.userInfo;
    tmp.name = item.name;
    DoctorSessionList.push(tmp);
  }

  const sessionList = JSON.parse(
    (await asyncRead(constance.SESSIONS_LIST)) || '{}',
  );

  // console.log("聊天列表", patientsList, DoctorSessionList, sessionList);

  let byId = {};
  let allIds = [];
  let topIds = sessionList.topIds || [];

  for (let item of DoctorSessionList) {
    byId[item.id] = item;
    allIds.push(item.id.toString());
  }

  topIds.splice(topIds.indexOf(delete_id), 1);

  const SessionList = {
    byId: byId,
    allIds: allIds, // 列表展示,
    topIds: topIds,
  };

  // 构造 聊天记录 sessions_new
  let sessions_new = JSON.parse((await asyncRead(constance.SESSIONS)) || '{}');

  for (const item of DoctorSessionList) {
    if (sessions_new.hasOwnProperty(item.id)) continue;
    sessions_new[item.id.toString()] = {
      currentMessageId: 0,
      messages: [],
      badge: 0,
      isLoadingEarlier: false,
      loadEarlier: true,
    };
  }
  return {sectionList, SessionList, sessions_new};
};

export {parseList, parseListForDelete};
