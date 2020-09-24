export const addLocalSessionList = (sessions) => ({
  type: 'ADD_LOCAL_SESSIONS_LIST',
  payload: sessions,
});

// 添加session
export function add_session(session) {
  return {
    type: 'ADD_SESSION',
    payload: session,
  };
}
// 刪除session
export function delete_session(chat_id) {
  return {
    type: 'DETELE_SESSION',
    payload: chat_id,
  };
}

// 將session放在頂部
export function top_session(chat_id) {
  return {
    type: 'TOP_SESSION',
    payload: chat_id,
  };
}
export function session_webSocket(ws) {
  return {
    type: 'SESSIONS_WEBSOCKET',
    payload: ws,
  };
}
// 添加置頂
export function add_topsession(chat_id) {
  return {
    type: 'ADD_TOPSESSION',
    payload: chat_id,
  };
}

// 刪除置頂session
export function delete_topsession(chat_id) {
  return {
    type: 'DELETE_TOPSESSION',
    payload: chat_id,
  };
}
