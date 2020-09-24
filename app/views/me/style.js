import {PixelRatio, StyleSheet} from 'react-native';
import {common} from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },

  icon: {width: 21, height: 21},

  /** _renderAvatar **/
  avatar: {
    flexDirection: 'row',
    // margin: 24,
    backgroundColor: '#fff',
    padding: 24,
  },
  avatar_img: {
    ...common.screenWidth(0.171),
    height: common.screenWidth(0.171).width,
    borderRadius: 8,
  },
  phone: {
    ...common.screenWidth(0.5),
    ...common.fontColorSize('#989898', 14),
    marginTop: 8,
    textAlign: 'left',
  },
  nick_name: {
    ...common.screenWidth(0.5),
    ...common.fontColorSize('#2C2C2C', 20),
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'left',
  },
  /** _renderOperateBar **/
  operate: {
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  operate_item: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  operator_custom_item: {
    height: 40,
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  operate_title: {
    ...common.fontColorSize('#3C3C3C', 16),
    marginLeft: 9,
  },
  operate_custom_title: {
    ...common.fontColorSize('#3C3C3C', 14),
    marginLeft: 5,
    marginTop: 5,
  },
  gap: {
    height: 6,
    // backgroundColor:'#efefef'
  },
  bar_title: {
    fontSize: 18,
    color: '#000',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#f0f0f0',
    paddingBottom: 5,
  },
});
