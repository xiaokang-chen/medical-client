import {PixelRatio, Platform, StatusBar, StyleSheet} from 'react-native';
import {common} from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
  },
  title: {
    ...common.screenWidth(),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: common.screenHeight(60 / 812).height,
    marginBottom: common.screenHeight(45 / 812).height,
  },
  back: {
    height: 43,
    justifyContent: 'center',
    paddingLeft: 15,
    padding: 15,
  },
  form: {
    ...common.screenWidth(),
    paddingHorizontal: common.screenWidth(0.043).width,
    marginBottom: 60,
  },
  textInput: {
    marginBottom: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#cccccc',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
  },
});
