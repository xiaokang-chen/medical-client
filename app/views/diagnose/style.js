import {StyleSheet} from 'react-native';
import {common} from '../../styles';

export default StyleSheet.create({
  renderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 50,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 17,
    color: '#000',
    lineHeight: 20,
  },
  diagnose: {
    backgroundColor: '#fff',
    ...common.screenHeight(52 / 812),
    paddingLeft: 15,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    ...common.fontColorSize('#333333', 16),
  },
  right: {
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    ...common.fontColorSize('#C4C8CD', 20),
    marginLeft: 10,
  },
});
