import {merge} from 'lodash';

// reducers/session_list.js
// 没有用
function add_session(state, action) {
  let {allIds, byId} = state;
  const {content, shellId} = action.payload;
  const data = JSON.parse(content);
  // console.log("在这里",data);
  const {avatarUrl, id, nickName, phone} = data;
  const {name} = data.userInfo;
  // console.log("在这里",byId, {avatarUrl, id, nickName,name});
  byId[shellId] = {
    avatarUrl,
    id,
    nickName,
    name,
    phone,
  };
  allIds = allIds.filter((item) => {
    return item !== shellId;
  });
  allIds.push(shellId);
  // console.log("在这里",byId, allIds);
  return merge({}, state, {
    allIds,
    byId,
  });
}

function delete_session(state, action) {
  let allIds = state.allIds;
  let topIds = state.topIds;
  // console.log("刪除對話框");
  // console.log(action.payload);
  // console.log(allIds);
  const index_allIds = allIds.indexOf(action.payload);
  if (index_allIds !== -1) allIds.splice(index_allIds, 1);

  const index_topIds = topIds.indexOf(action.payload);
  if (index_topIds !== -1) topIds.splice(index_topIds, 1);
  // console.log(allIds);
  return merge({}, state, {
    topIds: topIds,
    allIds: allIds,
  });
}

function add_topsession(state, action) {
  let topIds = Array.from(new Set(state.topIds));

  // console.log("置顶聊天框",topIds);
  const index = topIds.indexOf(action.payload);
  if (index !== -1) topIds.splice(index, 1);
  topIds.unshift(action.payload);

  let allIds = state.allIds;
  // console.log("删除常规聊天框",allIds);
  const allIds_index = allIds.indexOf(action.payload);
  if (allIds_index !== -1) allIds.splice(allIds_index, 1);

  return merge({}, state, {
    topIds: topIds,
    allIds: allIds,
  });
}

function delete_topsession(state, action) {
  let topIds = state.topIds;
  let allIds = state.allIds;
  const index = topIds.indexOf(action.payload);
  topIds.splice(index, 1);
  allIds.unshift(action.payload);

  return merge({}, state, {
    topIds: topIds,
    allIds: allIds,
  });
}

function top_session(state, action) {
  let allIds = Array.from(new Set(state.allIds));

  // console.log("置顶聊天框",allIds);
  const index = allIds.indexOf(action.payload);
  if (index !== -1) allIds.splice(index, 1);
  allIds.unshift(action.payload);
  return merge({}, state, {
    allIds: allIds,
  });
}

function session_webSocket(state, action) {
  return merge({}, state, {
    ws: action.payload,
  });
}

function addLocalSessionList(state, action) {
  // 浅合并
  return {...state, ...action.payload};
  // return merge({},state,action.payload)
}

export function sessionList(state = {}, action) {
  switch (action.type) {
    case 'ADD_LOCAL_SESSIONS_LIST':
      return addLocalSessionList(state, action);
    case 'ADD_SESSION':
      return add_session(state, action);
    case 'DETELE_SESSION':
      return delete_session(state, action);
    case 'TOP_SESSION':
      return top_session(state, action);
    case 'ADD_TOPSESSION':
      return add_topsession(state, action);
    case 'DELETE_TOPSESSION':
      return delete_topsession(state, action);
    case 'SESSIONS_WEBSOCKET':
      return session_webSocket(state, action);
    // 清空
    case 'CLEAN':
      return {allIds: [], topIds: [], byId: [], ws: null};
    default:
      return state;
  }
}

// export const sessionList = ( state = {
//     loading:false,
//     errMess:null,
//     info:{}
// },action) => {
//
//     // console.log("检测redux reducer", action);
//     // console.log("检测redux state", state);
//     switch (action.type) {
//         case 'ADD_LOCAL_SESSIONS_LIST':
//             return {...state, loading:false, errMess: null, info:action.payload};
//         // 清空
//         case 'CLEAN':
//             return {...state, loading:false, errMess: null, info:{} };
//         default:
//             return state;
//     }
// };
