import {StyleSheet} from 'react-native';
import {common} from '../../../styles';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  back: {
    height: 43,
    justifyContent: 'center',
    paddingLeft: 15,
    padding: 15,
  },
  diagnose: {
    backgroundColor: '#fff',
    ...common.screenHeight(52 / 812),
    // ...common.screenWidth(360 / 375),
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

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
