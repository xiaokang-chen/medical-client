import {merge} from 'lodash';

export const questionnaire = (
  state = {
    errMess: null,
    questionnaire: [],
  },
  action,
) => {
  switch (action.type) {
    case 'ADD_QUESTIONNAIRE':
      return {
        ...state,
        errMess: null,
        questionnaire:
          action.restart === true
            ? action.payload
            : state.questionnaire.concat(action.payload),
      };
    case 'QUESTIONNAIRE_LOADING':
      return {...state, errMess: null, questionnaire: []};
    case 'QUESTIONNAIRE_FAILED':
      return {...state, errMess: action.payload, questionnaire: []};
    case 'DELETE_PAPER_BY_ID':
      for (let i in state.questionnaire) {
        if (state.questionnaire[i].id === action.id) {
          state.questionnaire.splice(i, 1);
          break;
        }
      }
      return merge({}, state, {});
    // 清空
    case 'CLEAN':
      return {...state, errMess: null, questionnaire: []};
    default:
      return state;
  }
};
