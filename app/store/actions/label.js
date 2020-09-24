import network from '../../plugin/network';
import Toast from 'react-native-root-toast';

export const labelFailed = (errmess) => ({
  type: 'LABEL_FAILED',
  payload: errmess,
});

export const addLabel = (label) => ({
  type: 'ADD_LABEL',
  payload: label,
});

// 获取所有标签
export const fetchLabel = () => (dispatch) => {
  return network('label/getList', 'get')
    .then((label) => dispatch(addLabel(label.data)))
    .catch((error) => dispatch(labelFailed(error.message)));
};

// 删除标签
export const deleteLabel = (labelId) => (dispatch) => {
  const data = {
    labelId: labelId,
  };
  return network('label/deleteLabel', 'post', data)
    .then(Toast.show('删除成功', {position: 0}))
    .catch((error) => dispatch(labelFailed(error.message)));
};

// 新建标签
export const addLabels = (labelName, patients) => (dispatch) => {
  const data = {
    labelName: labelName,
    patients: patients,
  };
  return network('label/addLabel', 'post', data)
    .then(Toast.show('保存成功', {position: 0}))
    .catch((error) => dispatch(labelFailed(error.message)));
};

// 修改标签(在原有的基础上新增或减少患者)
export const updateLabel = (labelId, labelName, patients) => (dispatch) => {
  const data = {
    labelId: labelId,
    labelName: labelName,
    patients: patients,
  };
  return network('label/updateLabel', 'post', data)
    .then(Toast.show('更新成功', {position: 0}))
    .catch((error) => dispatch(labelFailed(error.message)));
};
