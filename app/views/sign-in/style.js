import {PixelRatio, StyleSheet} from 'react-native';
import {common} from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
  },
  back: {
    height: 43,
    justifyContent: 'center',
    paddingLeft: 15,
    padding: 15,
  },
  upper: {
    paddingHorizontal: 5,
    paddingTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...common.screenWidth(),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: common.screenHeight(30 / 812).height,
    marginBottom: common.screenHeight(45 / 812).height,
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
  forgot_password: {
    textAlign: 'right',
    // marginTop: common.screenHeight(12 / 812)['height'],
    ...common.fontColorSize('#5E94FF', 14),
  },
  text_type: {
    ...common.fontColorSize('#5E94FF', 14),
  },
  third: {
    marginTop: common.screenHeight(115 / 812).height,
  },
  third_content: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  third_item: {
    justifyContent: 'center',
    marginHorizontal: common.screenWidth(80 / 812).width,
  },
  third_item_icon: {
    ...common.fontColorSize('#999999', 32),
    textAlign: 'center',
  },
  third_item_title: {
    ...common.fontColorSize('#999999', 12),
    marginTop: 8,
    textAlign: 'center',
  },
});
