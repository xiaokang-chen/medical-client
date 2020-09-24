import {StyleSheet, PixelRatio, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 2 / PixelRatio.get(),
    borderColor: '#e9edf0',
  },
  back: {
    height: 43,
    justifyContent: 'center',
    paddingLeft: 15,
    padding: 15,
  },
  center: {
    flex: 1,
    height: 43,
    maxWidth: width * 0.5,
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
