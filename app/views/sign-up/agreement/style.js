import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  back: {
    height: 43,
    justifyContent: 'center',
    paddingLeft: 15,
    padding: 15,
  },
  titleView: {
    padding: 15,
    paddingTop: 0,
    paddingBottom: 0,
  },

  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#292524',
    textAlign: 'center',
  },
});

const baseFontSize = 14;
const baseLineHeight = 18;

export const baseFontStyle = {
  fontSize: baseFontSize,
  lineHeight: baseLineHeight,
  color: 'black',
};

export const tagsStyle = {
  span: {},
  br: {height: 50},
  hr: {},
  h1: {
    lineHeight: baseLineHeight * 2,
    color: 'black',
  },
  h2: {
    lineHeight: baseLineHeight * 1.5,
    color: 'black',
  },
  h3: {
    lineHeight: baseLineHeight * 1.17,
    color: 'black',
  },
  h4: {
    lineHeight: baseLineHeight,
    color: 'black',
  },
  h5: {
    lineHeight: baseLineHeight * 0.83,
    color: 'black',
  },
  h6: {
    lineHeight: baseLineHeight * 0.67,
    color: 'black',
  },
};
