import {merge} from 'lodash';

function updateSession(state, action) {
  return action.payload;
}

// 新消息 > 老消息
// 全部倒序
function add_messages(state, action) {
  // console.log(state);
  // console.log("action.session_id",action.session_id);
  let {messages, badge} = state[action.session_id];
  let new_messages = action.payload;
  // 排序
  new_messages.sort((a, b) =>
    new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1,
  );

  if (
    messages.length === 0 ||
    new_messages.length === 1 ||
    new Date(new_messages[new_messages.length - 1].createdAt) >
      new Date(messages[0].createdAt)
  ) {
    // 新消息最小的id > 旧消息最大的id
    return merge({}, state, {
      [action.session_id]: {
        messages: [...new_messages.concat(messages)],
        currentMessageId: new_messages[0]._id, // 最大的id,
        badge: badge === -1 ? -1 : badge + new_messages.length,
      },
    });
  } else {
    // console.log("添加新信息出错");
    return state;
  }
}

function add_old_messages(state, action) {
  let {messages} = state[action.session_id];
  let action_messages = action.payload;
  // 去重，排序
  action_messages.sort((a, b) =>
    new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1,
  );
  let old_messages = [];
  const lastTime = new Date(messages[messages.length - 1].createdAt);
  for (const item of action_messages) {
    const currentItemTime = new Date(item.createdAt);
    if (lastTime > currentItemTime) old_messages.push(item);
  }
  // console.log("提取的時間", old_messages, action_messages, action_messages.length !== 0);
  return merge({}, state, {
    [action.session_id]: {
      messages: [...messages.concat(old_messages)],
      isLoadingEarlier: false,
      // 后台返回是否还有消息
      loadEarlier: action_messages.length !== 0,
    },
  });
  // let old_messages = action_messages;
  // console.log("add_old_messages", old_messages, messages);
  // 老消息的第一条 小于 原消息的最后一条
  // if(messages.length === 0 || new Date(old_messages[0].createdAt) <new Date(messages[messages.length - 1].createdAt)){
  //     return merge({}, state,
  //         {
  //             [action.session_id]: {
  //                 "messages": [...messages.concat(old_messages)],
  //                 "isLoadingEarlier":false,
  //             }
  //         }
  //     )
  // }
  // else{
  //     console.log("添加老信息出错");
  //     return merge({}, state,
  //         {
  //             [action.session_id]: {
  //                 "isLoadingEarlier":false,
  //             }
  //         }
  //     );
  // }
}

function isLoadingEarlier(state, action) {
  return merge({}, state, {
    [action.session_id]: {
      isLoadingEarlier: true,
    },
  });
}

function clean_badge(state, action) {
  return merge({}, state, {
    [action.session_id]: {
      badge: action.num,
    },
  });
}
export function session(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_SESSIONS':
      return updateSession(state, action);
    case 'ADD_MESSAGES':
      return add_messages(state, action);
    case 'ADD_OLD_MESSAGES':
      return add_old_messages(state, action);
    // case 'GET_16_MESSAGES':
    //   return get_16_messages(state, action);
    case 'LoadingHistoryEarlier':
      return isLoadingEarlier(state, action);
    case 'clean_badge':
      return clean_badge(state, action);
    // 清空
    case 'CLEAN':
      return {};
    default:
      return state;
  }
}
