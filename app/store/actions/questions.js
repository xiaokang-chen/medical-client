import network from '../../plugin/network';

export const questionsLoading = () => ({
  type: 'QUESTIONS_LOADING',
});

export const questionsFailed = (errmess) => ({
  type: 'QUESTIONS_FAILED',
  payload: errmess,
});

export const addQuestions = (question) => ({
  type: 'ADD_QUESTIONS',
  payload: question,
});

//获取问卷详情
export const fetchQuestions = ({userId, questionnaireId}) => (dispatch) => {
  dispatch(questionsLoading());

  return network('user/questionnaire', 'post', {
    userId,
    paperId: questionnaireId,
  })
    .then((question) => dispatch(addQuestions(question.data.questions)))
    .catch((error) => dispatch(questionsFailed(error.message)));
};

//提交问卷答案
export const postQuestionDetail = (data = {}) => {
  return network('user/questionnaire/commit', 'POST', data);
};
