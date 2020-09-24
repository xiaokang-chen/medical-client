import AsyncStorage from '@react-native-community/async-storage';

/**
 * 是否存在
 */
export const isPresence = async (name) => {
  if (!name) {
    return;
  }
  return await asyncRead(name);
};

//存数据
export const asyncSave = async (name, option) => {
  if (!name) {
    return;
  }
  if (option instanceof Array || option instanceof Object) {
    option = JSON.stringify(option);
  }
  return await AsyncStorage.setItem(name, option, (error, result) => {
    if (error) {
      return false;
    }
    return result;
  });
};

//读数据
export const asyncRead = async (name) => {
  if (!name) {
    return;
  }
  return await AsyncStorage.getItem(name, (error, result) => {
    if (error) {
      return false;
    }
    return result;
  });
};

//删数据
export const asyncDelete = async (name) => {
  if (!name) {
    return;
  }
  return await AsyncStorage.removeItem(name, (error) => {
    return !error;
  });
};
