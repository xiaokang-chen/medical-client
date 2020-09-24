export const questions = (
  state = {
    isLoading: false,
    errMess: null,
    questions: [],
  },
  action,
) => {
  switch (action.type) {
    case 'ADD_QUESTIONS':
      return {
        ...state,
        isLoading: false,
        errMess: null,
        questions: action.payload,
      };
    case 'QUESTIONS_LOADING':
      return {...state, isLoading: true, errMess: null, questions: []};
    case 'QUESTIONS_FAILED':
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        questions: [],
      };
    // 清空
    case 'CLEAN':
      return {...state, isLoading: false, errMess: null, questions: []};
    default:
      return state;
  }
};
