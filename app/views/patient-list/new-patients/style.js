import {StyleSheet} from 'react-native';
import {common} from '../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    paddingHorizontal: 15,
  },
  item: {
    padding: 15,
  },
  itemText: {
    fontSize: 18,
    color: '#000',
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
});
