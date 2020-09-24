export const update_session = (sessions) => ({
  type: 'UPDATE_SESSIONS',
  payload: sessions,
});

export function add_messages(messages = [], session_id) {
  if (session_id) {
    return {
      type: 'ADD_MESSAGES',
      payload: messages,
      session_id: session_id,
    };
  } else {
    //console.log("没有对话id")
  }
}

export function add_old_messages(messages = [], session_id) {
  if (session_id) {
    return {
      type: 'ADD_OLD_MESSAGES',
      payload: messages,
      session_id: session_id,
    };
  } else {
    // console.log("没有对话id")
  }
}

export function isLoadingEarlier(session_id) {
  return {
    type: 'LoadingHistoryEarlier',
    session_id: session_id,
  };
}

export function clean_badge(session_id, num) {
  return {
    type: 'clean_badge',
    session_id: session_id,
    num: num,
  };
}
