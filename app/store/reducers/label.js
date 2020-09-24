export const label = (
  state = {
    errMess: null,
    label: [],
  },
  action,
) => {
  switch (action.type) {
    case 'ADD_LABEL':
      return {
        ...state,
        errMess: null,
        label: action.payload,
      };
    case 'LABEL_LOADING':
      return {...state, errMess: null, label: []};
    case 'LABEL_FAILED':
      return {...state, errMess: action.payload, label: []};
    // 清空
    case 'CLEAN':
      return {...state, errMess: null, label: []};
    default:
      return state;
  }
};
