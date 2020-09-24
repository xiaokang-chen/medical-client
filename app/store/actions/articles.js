import network from '../../plugin/network';

// export const articleLoading = () => ({
//     type: 'ARTICLES_LOADING'
// });

export const articleFailed = (errmess) => ({
  type: 'ARTICLES_FAILED',
  payload: errmess,
});

export const addArticle = (article, restart) => ({
  type: 'ADD_ARTICLES',
  payload: article,
  restart: restart,
});

//获取文章列表
export const fetchArticle = (pageSize, pageNum, restart = false) => (
  dispatch,
) => {
  // dispatch(articleLoading());
  //分页
  const data = {
    pageSize: pageSize,
    pageNum: pageNum,
  };
  return (
    network('user/article/list', 'post', data)
      // return network('article/getArticleList', 'post', data)
      .then((article) => dispatch(addArticle(article.data, restart)))
      .catch((error) => dispatch(articleFailed(error.message)))
  );
};

//获取文章详情
export const fetchArticleDetail = (data = {}) => {
  return network('user/article/detail', 'POST', data);
};
