import {merge} from 'lodash';
import {asyncSave} from '../../plugin/asyncStorage';
import constance from '../../plugin/constance';

/**
 * {
 *   apply_list:[
 *     {shellId, content}
 *     {}
 *   ],
 *   agree_list:[
 *     shellId,
 *   ]
 * }
 *
 * */
function apply(state, action) {
  // action.payload 是 {shellId, content}
  let {apply_list} = state;

  apply_list = apply_list.filter((item) => {
    return item.shellId !== action.payload.shellId;
  });

  action.payload.status = 'apply';

  apply_list.push(action.payload);
  const newState = merge({}, state, {
    apply_list,
  });
  asyncSave(constance.FRIENDS, JSON.stringify(newState));
  return newState;
}

function agree(state, action) {
  let {apply_list} = state;
  const apply_list_new = apply_list.map((item) => {
    if (item.shellId === action.payload) {
      item.status = 'agree';
    }

    return item;
  });

  return merge({}, state, {apply_list: apply_list_new});
}

function refuse(state, action) {
  let {apply_list} = state;
  const apply_list_new = apply_list.map((item) => {
    if (item.shellId === action.payload) {
      item.status = 'refuse';
    }
    return item;
  });

  return merge({}, state, {apply_list: apply_list_new});
}

function update(state, action) {
  // console.log("dsfjhsakhasd", merge({}, action.payload), action.payload);
  return merge({}, action.payload);
}

function deleteItem(state, action) {
  const deleteId = action.payload;
  const {apply_list} = state;
  for (const i in apply_list) {
    if (apply_list.hasOwnProperty(i))
      if (apply_list[i].shellId === deleteId) {
        apply_list.splice(i, 1);
        break;
      }
  }
  return merge({}, state, apply_list);
}

export function friends(state = {}, action) {
  switch (action.type) {
    case 'UPDATE':
      return update(state, action);
    case 'APPLY':
      return apply(state, action);
    case 'AGREE':
      return agree(state, action);
    case 'REFUSE':
      return refuse(state, action);
    case 'DELETE':
      return deleteItem(state, action);
    // 清空
    case 'CLEAN':
      return {allIds: [], topIds: [], byId: [], ws: null};
    default:
      return state;
  }
}
