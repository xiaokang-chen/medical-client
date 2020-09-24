import {PixelRatio, StyleSheet} from 'react-native';
import {common} from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
  },
  content: {
    paddingBottom: common.screenHeight(40 / 812)['height'],
  },
  back: {
    height: 43,
    justifyContent: 'center',
    paddingLeft: 15,
    padding: 15,
  },
  form: {
    ...common.screenWidth(),
    paddingHorizontal: common.screenWidth(0.043)['width'],
    marginBottom: common.screenHeight(53 / 812)['height'],
  },
  textInput: {
    marginBottom: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#cccccc',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
  },
  avatar: {
    ...common.screenWidth(),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: common.screenHeight(44 / 812)['height'],
  },
  avatar_camero: {
    ...common.screenHeight(28),
    ...common.screenWidth(28),
    ...common.bgc('#000'),
    marginTop: common.screenWidth(-28 / 375)['width'],
    marginLeft: common.screenWidth(60 / 375)['width'],
    borderRadius: common.screenWidth(14 / 375)['width'],
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
  },
  avatar_img: {
    ...common.screenWidth(0.235),
    height: common.screenWidth(0.235)['width'],
    borderRadius: common.screenWidth(0.1175)['width'],
  },
  agreeImg: {
    height: 24,
    width: 24,
  },
});
