import GraphemeSplitter from 'grapheme-splitter';

export function deleteLastChar(str) {
  const splitter = new GraphemeSplitter();
  let graphemes = splitter.splitGraphemes(str); //将含有表情的字符串分割成数组
  graphemes.pop(); //删除数组中最后一个元素
  return graphemes.join(''); //将数组还原成字符串
}

export function isCompleteInformation(userInfo) {
  userInfo = userInfo || {};
  const {
    birth,
    education,
    height,
    marriage,
    name,
    sex,
    weight,
    diagnose,
  } = userInfo;
  const importantInformation = {
    birth,
    education,
    height,
    marriage,
    name,
    sex,
    weight,
    diagnose,
  };
  for (const i in importantInformation) {
    if (!importantInformation[i]) {
      return true;
    }
  }
  return false;
}
