import network from '../../plugin/network';
import Toast from 'react-native-root-toast';

// export const questionnaireLoading = () => ({
//     type: 'QUESTIONNAIRE_LOADING'
// });

export const questionnaireFailed = (errmess) => ({
  type: 'QUESTIONNAIRE_FAILED',
  payload: errmess,
});

export const addQuestionnaire = (questionnaire, restart) => ({
  type: 'ADD_QUESTIONNAIRE',
  payload: questionnaire ? questionnaire : [],
  restart: restart,
});

//获取问卷列表
export const fetchQuestionnaire = (
  userId,
  pageSize,
  pageNum,
  restart = false,
) => (dispatch) => {
  // dispatch(questionnaireLoading());
  //分页
  const data = {
    userId: userId,
    pageSize: pageSize,
    pageNum: pageNum,
  };
  return network('user/paper/lists', 'post', data)
    .then((questionnaire) =>
      dispatch(addQuestionnaire(questionnaire.data, restart)),
    )
    .catch((error) => dispatch(questionnaireFailed(error.message)));
};

//删除特定问卷
export const deletePaper = (id) => (dispatch) => {
  const data = {
    id: id,
  };
  return network('user/questionnaire/delete', 'post', data)
    .then(() => dispatch({type: 'DELETE_PAPER_BY_ID', id}))
    .catch((error) => dispatch(questionnaireFailed(error.message)));
};

//医生推送问卷给患者
export const pushQuestionnaire = (patientIdArray, paperIdArray) => (
  dispatch,
) => {
  const data = {
    patientIdArray: patientIdArray,
    paperIdArray: paperIdArray,
  };
  // console.log("data",data);
  return network('publishToPatient', 'post', data).then((res) => {
    if (res.code === 20000) {
      Toast.show('推送成功', {position: 0});
    } else {
      Toast.show('推送失败', {position: 0});
    }
  });
};
