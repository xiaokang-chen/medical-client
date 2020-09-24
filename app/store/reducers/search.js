export const search = (
  state = {
    search: new Set([]),
  },
  action,
) => {
  switch (action.type) {
    case 'ADD_SEARCH':
      return {...state, search: state.search.add(action.payload)};
    //清空
    case 'CLEAN_SEARCH':
      return {...state, search: new Set([])};
    //全局退出清空
    case 'CLEAN':
      return {...state, search: new Set([])};
    default:
      return state;
  }
};
