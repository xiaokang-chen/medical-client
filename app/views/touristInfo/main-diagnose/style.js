import {StyleSheet} from 'react-native';

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
  back: {
    height: 43,
    justifyContent: 'center',
    paddingLeft: 15,
    padding: 15,
  },
});
