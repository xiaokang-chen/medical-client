export const articles = (
  state = {
    errMess: null,
    articles: [],
  },
  action,
) => {
  switch (action.type) {
    case 'ADD_ARTICLES':
      return {
        ...state,
        errMess: null,
        articles:
          action.restart === true
            ? action.payload
            : state.articles.concat(action.payload),
      };
    case 'ARTICLES_LOADING':
      return {...state, errMess: null, articles: []};
    case 'ARTICLES_FAILED':
      return {...state, errMess: action.payload, articles: []};
    // 清空
    case 'CLEAN':
      return {...state, errMess: null, articles: []};
    default:
      return state;
  }
};
