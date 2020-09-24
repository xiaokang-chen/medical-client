import {StyleSheet, PixelRatio, Platform} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail: {
    padding: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    flex: 2,
  },
  topicItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#efefef',
  },
  authorName: {
    color: '#292524',
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 12,
  },
  itemHead: {
    padding: 15,
    paddingRight: 15,
    flexDirection: 'row',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#e8e8e8',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    marginRight: 10,
    marginTop: Platform.OS === 'android' ? 0 : -1,
  },
  comment: {
    width: 50,
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
  },
  like: {
    width: 50,
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
  },
  follow: {
    flex: 1,
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
  },

  titleView: {
    padding: 15,
    paddingTop: 0,
    paddingBottom: 0,
    // alignItems:'center',
    // justifyContent:'center'
    // borderBottomWidth: 1,
    // borderColor: '#efefef',
  },

  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#292524',
  },

  headerRight: {
    flexDirection: 'row',
  },

  headerAction: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },

  topicButton: {
    backgroundColor: '#efefef',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 40,
  },

  bottomBar: {
    height: 45,
    paddingLeft: 15,
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: '#e8e8e8',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...ifIphoneX({
      height: 60,
      paddingBottom: 15,
    }),
  },
});

const baseFontSize = 18;
const baseLineHeight = 30;

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
