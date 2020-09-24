export const majorList = (
  state = {
    loading: false,
    errMess: null,
    info: [],
  },
  action,
) => {
  switch (action.type) {
    case 'ADD_MAJOR':
      return {...state, loading: false, errMess: null, info: action.payload};
    case 'MAJOR_LOADING':
      return {...state, loading: true, errMess: null, info: []};
    case 'MAJOR_FAILED':
      return {...state, loading: false, errMess: action.payload, info: []};
    // 清空
    case 'CLEAN':
      return {...state, loading: false, errMess: null, info: []};
    default:
      return state;
  }
};
